import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import BasicInfo from "./pages/BasicInfo";
import Preview from "./pages/Preview";
import Payment from "./pages/Payment";
import ConnectDomain from "./pages/ConnectDomain";
import StripeAccess from "./pages/StripeAccess";
import Launch from "./pages/Launch";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/onboarding/basic-info" element={<BasicInfo />} />
          <Route path="/onboarding/preview" element={<Preview />} />
          <Route path="/onboarding/payment" element={<Payment />} />
          <Route path="/onboarding/connect-domain" element={<ConnectDomain />} />
          <Route path="/onboarding/stripe-access" element={<StripeAccess />} />
          <Route path="/onboarding/launch" element={<Launch />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
