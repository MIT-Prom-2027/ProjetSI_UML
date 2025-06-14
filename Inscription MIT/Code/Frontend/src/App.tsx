import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Registration from "./pages/Registration";
import ThankYou from "./pages/ThankYou";
import Dashboard from "./pages/admin/Dashboard";
import StudentDetail from "./pages/admin/StudentDetail";
import NotFound from "./pages/NotFound";
import { RegistrationProvider, useRegistration } from "./context/RegistrationContext";
import Step3SetDates from "./pages/admin/admin-inscription/Step3SetDates";
import Step2UploadFiles from "./pages/admin/admin-inscription/Step2UploadFiles";
import Step1CreateYear from "./pages/admin/admin-inscription/Step1CreateYear";
import StartRegistration from "./pages/admin/admin-inscription/StartRegistration";
import AdminLayout from "./components/AdminLayout";
import React from "react";
import Error from "./pages/Error";
import UpdateRegistration from "./pages/Update_registration";

const queryClient = new QueryClient();

const AdminPageWrapper = ({ children }: { children: React.ReactNode }) => {
  const { setUserRole } = useRegistration();

  React.useEffect(() => {
    setUserRole("admin");
  }, [setUserRole]);

  return <AdminLayout>{children}</AdminLayout>;
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <RegistrationProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/inscription" element={<Registration />} />
            <Route path="/inscription/:id" element={<UpdateRegistration />} />            
            <Route path="/UML_Incription" element={<Registration />} />
            <Route path="/merci" element={<ThankYou />} />
            <Route path="/erreur" element={<Error />} />            
            <Route path="/admin" element={<Dashboard />} />
            {/* <Route path="/admin/student/:id" element={<StudentDetail />} /> */}
            <Route path="/admin" element={<Dashboard />} />
            <Route
              path="/admin-inscription/start-registration"
              element={
                <AdminPageWrapper>
                  <StartRegistration />
                </AdminPageWrapper>
              }
            />
            <Route
              path="/admin/step1"
              element={
                <AdminPageWrapper>
                  <Step1CreateYear />
                </AdminPageWrapper>
              }
            />
            <Route
              path="/admin/step2"
              element={
                <AdminPageWrapper>
                  <Step2UploadFiles />
                </AdminPageWrapper>
              }
            />
            <Route
              path="/admin/step3"
              element={
                <AdminPageWrapper>
                  <Step3SetDates />
                </AdminPageWrapper>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </RegistrationProvider>    
  </QueryClientProvider>
);

export default App;
