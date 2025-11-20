import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

interface ContractModalitiesStepProps {
  onComplete: () => void;
  onBack?: () => void;
}

const ContractModalitiesStep = ({ onComplete, onBack }: ContractModalitiesStepProps) => {
  const { user } = useAuth();
  const [isRecurrentAvailable, setIsRecurrentAvailable] = useState(false);
  const [acceptedRecurrentTerms, setAcceptedRecurrentTerms] = useState(false);
  const [isFixedContractAvailable, setIsFixedContractAvailable] = useState(false);
  const [acceptedFixedTerms, setAcceptedFixedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCurrentSettings();
  }, [user]);

  const loadCurrentSettings = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_recurrent_available, accepted_recurrent_terms, is_fixed_contract_available, accepted_fixed_terms')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setIsRecurrentAvailable(data.is_recurrent_available || false);
        setAcceptedRecurrentTerms(data.accepted_recurrent_terms || false);
        setIsFixedContractAvailable(data.is_fixed_contract_available || false);
        setAcceptedFixedTerms(data.accepted_fixed_terms || false);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    // Validation: if toggle is ON, checkbox must be checked
    if (isRecurrentAvailable && !acceptedRecurrentTerms) {
      toast.error('Debes aceptar los términos de Gigs Recurrentes');
      return;
    }

    if (isFixedContractAvailable && !acceptedFixedTerms) {
      toast.error('Debes aceptar los términos de Contrato Fijo');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          is_recurrent_available: isRecurrentAvailable,
          accepted_recurrent_terms: isRecurrentAvailable ? acceptedRecurrentTerms : false,
          is_fixed_contract_available: isFixedContractAvailable,
          accepted_fixed_terms: isFixedContractAvailable ? acceptedFixedTerms : false,
          terms_acceptance_timestamp: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success('Modalidades guardadas exitosamente');
      onComplete();
    } catch (error) {
      console.error('Error saving modalities:', error);
      toast.error('Error al guardar las modalidades');
    } finally {
      setLoading(false);
    }
  };

  const canProceed = 
    (!isRecurrentAvailable || acceptedRecurrentTerms) &&
    (!isFixedContractAvailable || acceptedFixedTerms);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          Define tus Modalidades de Contratación
        </h2>
        <p className="text-muted-foreground">
          Selecciona los tipos de servicios que ofrecerás en la plataforma
        </p>
      </div>

      {/* Single Booking - Always Active */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              <CardTitle>Booking Único</CardTitle>
            </div>
            <Badge variant="default" className="bg-primary">Activo</Badge>
          </div>
          <CardDescription>
            Tu modalidad principal de contratación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Los clientes pueden reservarte para eventos individuales con pago seguro a través de la plataforma. 
            Esta es la modalidad estándar y está siempre habilitada para todos los artistas.
          </p>
        </CardContent>
      </Card>

      {/* Recurring Gigs - Optional */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-foreground" />
              <CardTitle>Gigs Recurrentes (Residencias)</CardTitle>
            </div>
            <Switch
              checked={isRecurrentAvailable}
              onCheckedChange={(checked) => {
                setIsRecurrentAvailable(checked);
                if (!checked) setAcceptedRecurrentTerms(false);
              }}
            />
          </div>
          <CardDescription>
            Contratos semanales o mensuales en el mismo venue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Ideal para residencias en clubes, bares o restaurantes. Los clientes podrán solicitar 
            contratos recurrentes que se gestionan de forma personalizada.
          </p>

          {isRecurrentAvailable && (
            <div className="border border-border/50 rounded-lg p-4 space-y-3 bg-muted/30">
              <p className="text-sm font-medium">⚠️ Términos y Condiciones</p>
              <p className="text-sm text-muted-foreground">
                Entiendo que los Gigs Recurrentes se gestionan de forma semi-manual. El equipo de ArtUne 
                me contactará para finalizar los detalles del contrato. Los pagos y términos se coordinan 
                fuera del sistema de pago automático de la plataforma.
              </p>
              <div className="flex items-start gap-2 pt-2">
                <Checkbox
                  id="recurrent-terms"
                  checked={acceptedRecurrentTerms}
                  onCheckedChange={(checked) => setAcceptedRecurrentTerms(checked as boolean)}
                />
                <Label 
                  htmlFor="recurrent-terms" 
                  className="text-sm font-normal cursor-pointer leading-tight"
                >
                  Acepto los términos de Gigs Recurrentes
                </Label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Fixed Contract - Optional */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-foreground" />
              <CardTitle>Contrato Fijo</CardTitle>
            </div>
            <Switch
              checked={isFixedContractAvailable}
              onCheckedChange={(checked) => {
                setIsFixedContractAvailable(checked);
                if (!checked) setAcceptedFixedTerms(false);
              }}
            />
          </div>
          <CardDescription>
            Contratos a largo plazo con términos personalizados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Para proyectos especiales, eventos corporativos o colaboraciones a largo plazo. 
            Los clientes podrán solicitar propuestas personalizadas.
          </p>

          {isFixedContractAvailable && (
            <div className="border border-border/50 rounded-lg p-4 space-y-3 bg-muted/30">
              <p className="text-sm font-medium">⚠️ Términos y Condiciones</p>
              <p className="text-sm text-muted-foreground">
                Entiendo que los Contratos Fijos se gestionan manualmente fuera de la plataforma. 
                Un asesor de ArtUne facilitará la comunicación y coordinación de términos entre ambas partes. 
                Los pagos y condiciones se negocian directamente.
              </p>
              <div className="flex items-start gap-2 pt-2">
                <Checkbox
                  id="fixed-terms"
                  checked={acceptedFixedTerms}
                  onCheckedChange={(checked) => setAcceptedFixedTerms(checked as boolean)}
                />
                <Label 
                  htmlFor="fixed-terms" 
                  className="text-sm font-normal cursor-pointer leading-tight"
                >
                  Acepto los términos de Contrato Fijo
                </Label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6">
        {onBack && (
          <Button variant="outline" onClick={onBack} disabled={loading}>
            Volver
          </Button>
        )}
        <Button 
          onClick={handleSave} 
          disabled={!canProceed || loading}
          className="ml-auto"
        >
          {loading ? 'Guardando...' : 'Guardar y Continuar'}
        </Button>
      </div>
    </div>
  );
};

export default ContractModalitiesStep;