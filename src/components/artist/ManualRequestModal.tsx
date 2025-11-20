import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

interface ManualRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  artistId: string;
  artistName: string;
  requestType: 'recurrent' | 'fixed';
}

const ManualRequestModal = ({ 
  open, 
  onOpenChange, 
  artistId, 
  artistName, 
  requestType 
}: ManualRequestModalProps) => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const requestTypeLabel = requestType === 'recurrent' ? 'Gig Recurrente (Residencia)' : 'Contrato Fijo';
  const Icon = requestType === 'recurrent' ? Calendar : FileText;

  const handleSubmit = async () => {
    if (!user) {
      toast.error('Debes iniciar sesión para enviar una solicitud');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('manual_requests')
        .insert({
          client_id: user.id,
          artist_id: artistId,
          request_type: requestType,
          message: message.trim() || null,
          status: 'pending',
        });

      if (error) throw error;

      toast.success('¡Solicitud enviada! Nos pondremos en contacto contigo pronto.');
      setMessage('');
      onOpenChange(false);
    } catch (error) {
      console.error('Error sending request:', error);
      toast.error('Error al enviar la solicitud. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle>Solicitud de Contratación Manual</DialogTitle>
              <DialogDescription className="mt-1">
                {requestTypeLabel} con {artistName}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium">ℹ️ Proceso de Contratación</p>
            <p className="text-sm text-muted-foreground">
              Este tipo de contratación se gestiona de forma personalizada para garantizar 
              que todas las condiciones se ajusten a tus necesidades específicas.
            </p>
            <p className="text-sm text-muted-foreground">
              Un asesor de ArtUne te contactará dentro de las próximas 24-48 horas para 
              coordinar los detalles del {requestType === 'recurrent' ? 'gig recurrente' : 'contrato'}.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              Mensaje Inicial (Opcional)
            </Label>
            <Textarea
              id="message"
              placeholder="Cuéntanos más sobre tu proyecto, fechas tentativas, o cualquier requerimiento especial..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Esto ayudará a nuestro equipo a preparar mejor tu propuesta
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Confirmar Solicitud'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManualRequestModal;