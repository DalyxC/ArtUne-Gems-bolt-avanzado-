import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Filter, Eye, FileText, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

type RequestStatus = "pending" | "approved" | "rejected" | "completed" | "in_progress";

interface ManualRequest {
  id: string;
  client_id: string;
  artist_id: string;
  request_type: "recurrent" | "fixed";
  message: string | null;
  status: string | null;
  created_at: string | null;
  artist_name?: string;
  client_name?: string;
}

export default function AdminManualRequests() {
  const [requests, setRequests] = useState<ManualRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<ManualRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedRequest, setSelectedRequest] = useState<ManualRequest | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [requests, searchTerm, statusFilter, typeFilter]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("manual_requests")
        .select(`
          *,
          artist:profiles!manual_requests_artist_id_fkey(full_name),
          client:profiles!manual_requests_client_id_fkey(full_name)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const formattedData = data.map((req: any) => ({
        ...req,
        artist_name: req.artist?.full_name || "Usuario desconocido",
        client_name: req.client?.full_name || "Usuario desconocido",
      }));

      setRequests(formattedData);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "No se pudieron cargar las solicitudes: " + error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterRequests = () => {
    let filtered = [...requests];

    if (searchTerm) {
      filtered = filtered.filter(
        (req) =>
          req.artist_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((req) => req.status === statusFilter);
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((req) => req.request_type === typeFilter);
    }

    setFilteredRequests(filtered);
  };

  const updateRequestStatus = async (requestId: string, newStatus: RequestStatus) => {
    try {
      const { error } = await supabase
        .from("manual_requests")
        .update({ status: newStatus })
        .eq("id", requestId);

      if (error) throw error;

      toast({
        title: "Estado actualizado",
        description: `La solicitud ha sido marcada como ${getStatusLabel(newStatus)}`,
      });

      fetchRequests();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado: " + error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "approved":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "in_progress":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "completed":
        return "bg-primary/10 text-primary border-primary/20";
      case "rejected":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "";
    }
  };

  const getStatusLabel = (status: string | null) => {
    switch (status) {
      case "approved":
        return "Aprobada";
      case "pending":
        return "Pendiente";
      case "in_progress":
        return "En Progreso";
      case "completed":
        return "Completada";
      case "rejected":
        return "Rechazada";
      default:
        return status || "Desconocido";
    }
  };

  const getTypeLabel = (type: string) => {
    return type === "recurrent" ? "Gig Recurrente" : "Contrato Fijo";
  };

  const getTypeColor = (type: string) => {
    return type === "recurrent"
      ? "bg-coral/10 text-coral border-coral/20"
      : "bg-primary/10 text-primary border-primary/20";
  };

  const statusCounts = {
    all: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    approved: requests.filter((r) => r.status === "approved").length,
    in_progress: requests.filter((r) => r.status === "in_progress").length,
    completed: requests.filter((r) => r.status === "completed").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
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
                <FileText className="h-10 w-10 text-primary" />
                Solicitudes Manuales
              </h1>
              <p className="text-muted-foreground text-lg">
                Gestiona solicitudes de Gigs Recurrentes y Contratos Fijos
              </p>
            </div>
            <Button onClick={fetchRequests} variant="outline">
              Actualizar
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{statusCounts.all}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pendientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-500">{statusCounts.pending}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Aprobadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">{statusCounts.approved}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  En Progreso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-500">{statusCounts.in_progress}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Completadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{statusCounts.completed}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Rechazadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-500">{statusCounts.rejected}</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Buscar y Filtrar</CardTitle>
              <CardDescription>Encuentra solicitudes por ID, cliente, artista, estado o tipo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar solicitudes..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="approved">Aprobada</SelectItem>
                    <SelectItem value="in_progress">En Progreso</SelectItem>
                    <SelectItem value="completed">Completada</SelectItem>
                    <SelectItem value="rejected">Rechazada</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="recurrent">Gig Recurrente</SelectItem>
                    <SelectItem value="fixed">Contrato Fijo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Requests Table */}
          <Card>
            <CardHeader>
              <CardTitle>Todas las Solicitudes ({filteredRequests.length})</CardTitle>
              <CardDescription>Registros completos de solicitudes manuales</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <Clock className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredRequests.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No se encontraron solicitudes</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Artista</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id} className="hover:bg-accent/50">
                        <TableCell>
                          <div className="text-sm">
                            {request.created_at
                              ? format(new Date(request.created_at), "dd/MM/yyyy HH:mm")
                              : "N/A"}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{request.client_name}</TableCell>
                        <TableCell className="font-medium">{request.artist_name}</TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(request.request_type)}>
                            {getTypeLabel(request.request_type)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(request.status)}>
                            {getStatusLabel(request.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedRequest(request);
                                setDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {request.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateRequestStatus(request.id, "approved")}
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateRequestStatus(request.id, "rejected")}
                                >
                                  <XCircle className="h-4 w-4 text-red-500" />
                                </Button>
                              </>
                            )}
                            {request.status === "approved" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateRequestStatus(request.id, "in_progress")}
                              >
                                <Clock className="h-4 w-4 text-blue-500" />
                              </Button>
                            )}
                            {request.status === "in_progress" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateRequestStatus(request.id, "completed")}
                              >
                                <CheckCircle className="h-4 w-4 text-primary" />
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
            <DialogTitle>Detalles de la Solicitud</DialogTitle>
            <DialogDescription>Información completa de la solicitud manual</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ID de Solicitud</p>
                  <p className="font-mono text-sm">{selectedRequest.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Fecha de Creación</p>
                  <p>
                    {selectedRequest.created_at
                      ? format(new Date(selectedRequest.created_at), "dd/MM/yyyy HH:mm")
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cliente</p>
                  <p className="font-medium">{selectedRequest.client_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Artista</p>
                  <p className="font-medium">{selectedRequest.artist_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tipo de Solicitud</p>
                  <Badge className={getTypeColor(selectedRequest.request_type)}>
                    {getTypeLabel(selectedRequest.request_type)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estado</p>
                  <Badge className={getStatusColor(selectedRequest.status)}>
                    {getStatusLabel(selectedRequest.status)}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Mensaje del Cliente</p>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm whitespace-pre-wrap">
                      {selectedRequest.message || "Sin mensaje"}
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="flex gap-2 pt-4">
                {selectedRequest.status === "pending" && (
                  <>
                    <Button
                      className="flex-1"
                      onClick={() => {
                        updateRequestStatus(selectedRequest.id, "approved");
                        setDialogOpen(false);
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Aprobar
                    </Button>
                    <Button
                      className="flex-1"
                      variant="destructive"
                      onClick={() => {
                        updateRequestStatus(selectedRequest.id, "rejected");
                        setDialogOpen(false);
                      }}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Rechazar
                    </Button>
                  </>
                )}
                {selectedRequest.status === "approved" && (
                  <Button
                    className="flex-1"
                    onClick={() => {
                      updateRequestStatus(selectedRequest.id, "in_progress");
                      setDialogOpen(false);
                    }}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Marcar En Progreso
                  </Button>
                )}
                {selectedRequest.status === "in_progress" && (
                  <Button
                    className="flex-1"
                    onClick={() => {
                      updateRequestStatus(selectedRequest.id, "completed");
                      setDialogOpen(false);
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Marcar Completada
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
