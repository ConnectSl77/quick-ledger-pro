
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./pages/DashboardLayout";
import VendorDashboardPage from "./pages/VendorDashboardPage";
import SupplierDashboardPage from "./pages/SupplierDashboardPage";

// Import supplier pages
import SupplierOrdersPage from "./pages/supplier/SupplierOrdersPage";
import SupplierInventoryPage from "./pages/supplier/SupplierInventoryPage";
import SupplierCustomersPage from "./pages/supplier/SupplierCustomersPage";
import SupplierPaymentsPage from "./pages/supplier/SupplierPaymentsPage";
import SupplierSettingsPage from "./pages/supplier/SupplierSettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AnimatePresence mode="wait">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            <Route path="/dashboard/:userType" element={<DashboardLayout />}>
              <Route index element={<VendorDashboardPage />} />
            </Route>
            
            <Route path="/dashboard/supplier" element={<DashboardLayout />}>
              <Route index element={<SupplierDashboardPage />} />
              <Route path="orders" element={<SupplierOrdersPage />} />
              <Route path="inventory" element={<SupplierInventoryPage />} />
              <Route path="customers" element={<SupplierCustomersPage />} />
              <Route path="payments" element={<SupplierPaymentsPage />} />
              <Route path="settings" element={<SupplierSettingsPage />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AnimatePresence>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
