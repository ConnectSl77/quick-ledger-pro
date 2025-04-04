import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import { SupabaseProvider, useSupabase } from './contexts/SupabaseContext';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import DashboardLayout from "./pages/DashboardLayout";
import VendorDashboardPage from "./pages/VendorDashboardPage";
import SupplierDashboardPage from "./pages/SupplierDashboardPage";

// Import supplier pages
import SupplierOrdersPage from "./pages/supplier/SupplierOrdersPage";
import SupplierInventoryPage from "./pages/supplier/SupplierInventoryPage";
import SupplierCustomersPage from "./pages/supplier/SupplierCustomersPage";
import SupplierPaymentsPage from "./pages/supplier/SupplierPaymentsPage";
import SupplierSettingsPage from "./pages/supplier/SupplierSettingsPage";
import VendorPage from '@/pages/supplier/VendorPage';

// Import vendor pages
import VendorInvoicesPage from "./pages/vendor/VendorInvoicesPage";
import VendorSalesPage from "./pages/vendor/VendorSalesPage";
import VendorInventoryPage from "./pages/vendor/VendorInventoryPage";
import VendorSuppliersPage from "./pages/vendor/VendorSuppliersPage";
import VendorPaymentsPage from "./pages/vendor/VendorPaymentsPage";
import VendorSettingsPage from "./pages/vendor/VendorSettingsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Protected Route component
const ProtectedRoute = ({ children, allowedUserType }: { children: React.ReactNode; allowedUserType: 'vendor' | 'supplier' }) => {
  const { user, userType } = useSupabase();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (userType !== allowedUserType) {
    return <Navigate to={`/dashboard/${userType}`} replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SupabaseProvider>
        <AnimatePresence mode="wait">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              
              <Route path="/dashboard/vendor" element={<DashboardLayout />}>
                <Route index element={
                  <ProtectedRoute allowedUserType="vendor">
                    <VendorDashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="invoices" element={
                  <ProtectedRoute allowedUserType="vendor">
                    <VendorInvoicesPage />
                  </ProtectedRoute>
                } />
                <Route path="sales" element={
                  <ProtectedRoute allowedUserType="vendor">
                    <VendorSalesPage />
                  </ProtectedRoute>
                } />
                <Route path="inventory" element={
                  <ProtectedRoute allowedUserType="vendor">
                    <VendorInventoryPage />
                  </ProtectedRoute>
                } />
                <Route path="suppliers" element={
                  <ProtectedRoute allowedUserType="vendor">
                    <VendorSuppliersPage />
                  </ProtectedRoute>
                } />
                <Route path="payments" element={
                  <ProtectedRoute allowedUserType="vendor">
                    <VendorPaymentsPage />
                  </ProtectedRoute>
                } />
                <Route path="settings" element={
                  <ProtectedRoute allowedUserType="vendor">
                    <VendorSettingsPage />
                  </ProtectedRoute>
                } />
              </Route>
              
              <Route path="/dashboard/supplier" element={<DashboardLayout />}>
                <Route index element={
                  <ProtectedRoute allowedUserType="supplier">
                    <SupplierDashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="orders" element={
                  <ProtectedRoute allowedUserType="supplier">
                    <SupplierOrdersPage />
                  </ProtectedRoute>
                } />
                <Route path="inventory" element={
                  <ProtectedRoute allowedUserType="supplier">
                    <SupplierInventoryPage />
                  </ProtectedRoute>
                } />
                <Route path="vendors" element={
                  <ProtectedRoute allowedUserType="supplier">
                    <VendorPage />
                  </ProtectedRoute>
                } />
                <Route path="customers" element={
                  <ProtectedRoute allowedUserType="supplier">
                    <SupplierCustomersPage />
                  </ProtectedRoute>
                } />
                <Route path="payments" element={
                  <ProtectedRoute allowedUserType="supplier">
                    <SupplierPaymentsPage />
                  </ProtectedRoute>
                } />
                <Route path="settings" element={
                  <ProtectedRoute allowedUserType="supplier">
                    <SupplierSettingsPage />
                  </ProtectedRoute>
                } />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AnimatePresence>
      </SupabaseProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
