import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Shield, AlertTriangle, Eye, Ban, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface MessageFlag {
  id: string;
  user_id: string;
  violation_type: string;
  flagged_content: string;
  ai_confidence: number;
  created_at: string;
  profiles?: {
    full_name: string;
    email: string;
  };
  strike_count?: number;
  is_suspended?: boolean;
}

export default function AdminMessageModeration() {
  const [flags, setFlags] = useState<MessageFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFlag, setSelectedFlag] = useState<MessageFlag | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchFlags();
  }, []);

  const fetchFlags = async () => {
    try {
      setLoading(true);
      const { data: flagsData, error } = await supabase
        .from("message_flags")
        .select(`
          *,
          profiles:user_id (full_name, email)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Get user strikes for each flag
      const enrichedFlags = await Promise.all(
        (flagsData || []).map(async (flag) => {
          const { data: strikes } = await supabase
            .from("user_strikes")
            .select("strike_count, is_suspended")
            .eq("user_id", flag.user_id)
            .single();

          return {
            ...flag,
            strike_count: strikes?.strike_count || 0,
            is_suspended: strikes?.is_suspended || false,
          };
        })
      );

      setFlags(enrichedFlags);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "No se pudieron cargar las infracciones: " + error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getViolationColor = (type: string) => {
    switch (type) {
      case "email":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "phone":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "social_media":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "payment_link":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "external_link":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      default:
        return "";
    }
  };

  const getViolationLabel = (type: string) => {
    const labels: Record<string, string> = {
      email: "Email",
      phone: "Teléfono",
      social_media: "Redes Sociales",
      payment_link: "Enlace de Pago",
      external_link: "Enlace Externo",
    };
    return labels[type] || type;
  };

  const handleUnsuspend = async (userId: string) => {
    try {
      const { error } = await supabase
        .from("user_strikes")
        .update({
          is_suspended: false,
          suspension_until: null,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId);

      if (error) throw error;

      toast({
        title: "Usuario reactivado",
        description: "La suspensión ha sido levantada exitosamente.",
      });

      fetchFlags();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "No se pudo reactivar el usuario: " + error.message,
        variant: "destructive",
      });
    }
  };

  const stats = {
    total: flags.length,
    last24h: flags.filter(
      (f) =>
        new Date(f.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000)
    ).length,
    suspendedUsers: [
      ...new Set(
        flags
          .filter((f) => f.is_suspended)
          .map((f) => f.user_id)
      ),
    ].length,
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="container py-8 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-4xl font-bold flex items-center gap-3">
                <Shield className="h-10 w-10 text-primary" />
                Moderación de Mensajes
              </h1>
              <p className="text-muted-foreground text-lg">
                Sistema de seguridad y detección de infracciones
              </p>
            </div>
            <Button onClick={fetchFlags} variant="outline">
              Actualizar
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Infracciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Últimas 24h
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-500">
                  {stats.last24h}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Usuarios Suspendidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-500">
                  {stats.suspendedUsers}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Flags Table */}
          <Card>
            <CardHeader>
              <CardTitle>Registro de Infracciones</CardTitle>
              <CardDescription>
                Mensajes bloqueados por el sistema de moderación IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <AlertTriangle className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : flags.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No hay infracciones registradas</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Usuario</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Contenido Flagged</TableHead>
                      <TableHead>Confianza</TableHead>
                      <TableHead>Strikes</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {flags.map((flag) => (
                      <TableRow key={flag.id} className="hover:bg-accent/50">
                        <TableCell>
                          <div className="text-sm">
                            {format(new Date(flag.created_at), "dd/MM/yyyy HH:mm")}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{flag.profiles?.full_name}</p>
                            <p className="text-xs text-muted-foreground">
                              {flag.profiles?.email}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getViolationColor(flag.violation_type)}>
                            {getViolationLabel(flag.violation_type)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm max-w-xs truncate">
                            {flag.flagged_content}
                          </p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{
                                  width: `${(flag.ai_confidence || 0) * 100}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm">
                              {((flag.ai_confidence || 0) * 100).toFixed(0)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">
                              {flag.strike_count || 0}
                            </span>
                            {flag.is_suspended && (
                              <Badge variant="destructive">
                                <Ban className="h-3 w-3 mr-1" />
                                Suspendido
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedFlag(flag);
                                setDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {flag.is_suspended && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUnsuspend(flag.user_id)}
                              >
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles de la Infracción</DialogTitle>
            <DialogDescription>
              Información completa del mensaje bloqueado
            </DialogDescription>
          </DialogHeader>
          {selectedFlag && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Usuario</p>
                  <p className="font-medium">{selectedFlag.profiles?.full_name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedFlag.profiles?.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Fecha</p>
                  <p>
                    {format(
                      new Date(selectedFlag.created_at),
                      "PPP 'a las' HH:mm"
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Tipo de Violación
                  </p>
                  <Badge className={getViolationColor(selectedFlag.violation_type)}>
                    {getViolationLabel(selectedFlag.violation_type)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Confianza IA
                  </p>
                  <p className="font-semibold">
                    {((selectedFlag.ai_confidence || 0) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Contenido Detectado
                </p>
                <Card className="bg-destructive/10 border-destructive/20">
                  <CardContent className="pt-4">
                    <p className="text-sm font-mono">
                      {selectedFlag.flagged_content}
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Estado del Usuario
                </p>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Advertencias</p>
                    <p className="text-2xl font-bold">
                      {selectedFlag.strike_count || 0}
                    </p>
                  </div>
                  {selectedFlag.is_suspended && (
                    <Badge variant="destructive" className="h-fit">
                      <Ban className="h-4 w-4 mr-2" />
                      Cuenta Suspendida
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
