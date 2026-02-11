import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/auth/AuthGuard";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import ClinicDashboard from "./pages/ClinicDashboard";
import CalendarPage from "./pages/Agenda/CalendarPage";
import PatientDetails from "./pages/Patients/PatientDetails";
import InstaSmile from "./pages/Marketing/InstaSmile";
import AutomationSettings from "./pages/Settings/AutomationSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            
            {/* Super Admin Routes */}
            <Route path="/super-admin" element={<AuthGuard allowedRoles={['ADMIN_PLATAFORMA']}><SuperAdminDashboard /></AuthGuard>} />
            <Route path="/super-admin/*" element={<AuthGuard allowedRoles={['ADMIN_PLATAFORMA']}><SuperAdminDashboard /></AuthGuard>} />
            
            {/* Clinic Admin Routes */}
            <Route path="/clinica" element={<AuthGuard allowedRoles={['ADMIN_CLINICA']}><ClinicDashboard /></AuthGuard>} />
            <Route path="/clinica/agenda" element={<AuthGuard allowedRoles={['ADMIN_CLINICA']}><CalendarPage /></AuthGuard>} />
            <Route path="/clinica/pacientes/:id" element={<AuthGuard allowedRoles={['ADMIN_CLINICA']}><PatientDetails /></AuthGuard>} />
            <Route path="/clinica/pacientes" element={<AuthGuard allowedRoles={['ADMIN_CLINICA']}><ClinicDashboard /></AuthGuard>} />
            <Route path="/clinica/marketing" element={<AuthGuard allowedRoles={['ADMIN_CLINICA']}><InstaSmile /></AuthGuard>} />
            <Route path="/clinica/automacao" element={<AuthGuard allowedRoles={['ADMIN_CLINICA']}><AutomationSettings /></AuthGuard>} />
            <Route path="/clinica/*" element={<AuthGuard allowedRoles={['ADMIN_CLINICA']}><ClinicDashboard /></AuthGuard>} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
