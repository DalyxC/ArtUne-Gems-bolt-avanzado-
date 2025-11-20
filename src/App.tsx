import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import RoleSelection from "./pages/auth/RoleSelection";
import SignupArtist from "./pages/auth/SignupArtist";
import SignupClient from "./pages/auth/SignupClient";
import ArtistDashboard from "./pages/ArtistDashboard";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import JobBoard from "./pages/JobBoard";
import Analytics from "./pages/Analytics";
import Reviews from "./pages/Reviews";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import ClientDashboard from "./pages/ClientDashboard";
import ClientFindArtists from "./pages/ClientFindArtists";
import ClientBookings from "./pages/ClientBookings";
import ClientMessages from "./pages/ClientMessages";
import ClientPayments from "./pages/ClientPayments";
import ClientSettings from "./pages/ClientSettings";
import AdminDashboard from "./pages/AdminDashboard";
import AdminArtists from "./pages/AdminArtists";
import AdminClients from "./pages/AdminClients";
import AdminBookings from "./pages/AdminBookings";
import AdminPayments from "./pages/AdminPayments";
import AdminSettings from "./pages/AdminSettings";
import AdminReports from "./pages/AdminReports";
import AdminManualRequests from "./pages/AdminManualRequests";
import AdminMessageModeration from "./pages/AdminMessageModeration";
import ArtistPublicProfile from "./pages/ArtistPublicProfile";
import Artists from "./pages/Artists";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Auth Routes */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/role" element={<RoleSelection />} />
            <Route path="/auth/signup/artist" element={<SignupArtist />} />
            <Route path="/auth/signup/client" element={<SignupClient />} />
          {/* Public Routes */}
          <Route path="/artists" element={<Artists />} />
          <Route path="/artist/:id" element={<ArtistPublicProfile />} />
          {/* Artist Routes */}
          <Route path="/artist/dashboard" element={<ArtistDashboard />} />
          <Route path="/artist/bookings" element={<Bookings />} />
          <Route path="/artist/profile" element={<Profile />} />
          <Route path="/artist/messages" element={<Messages />} />
          <Route path="/artist/job-board" element={<JobBoard />} />
          <Route path="/artist/analytics" element={<Analytics />} />
          <Route path="/artist/reviews" element={<Reviews />} />
          <Route path="/artist/payments" element={<Payments />} />
          <Route path="/artist/settings" element={<Settings />} />
          {/* Client Routes */}
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/client/find-artists" element={<ClientFindArtists />} />
          <Route path="/client/bookings" element={<ClientBookings />} />
          <Route path="/client/messages" element={<ClientMessages />} />
          <Route path="/client/payments" element={<ClientPayments />} />
          <Route path="/client/settings" element={<ClientSettings />} />
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/artists" element={<AdminArtists />} />
            <Route path="/admin/clients" element={<AdminClients />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route path="/admin/manual-requests" element={<AdminManualRequests />} />
            <Route path="/admin/moderation" element={<AdminMessageModeration />} />
            <Route path="/admin/payments" element={<AdminPayments />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
