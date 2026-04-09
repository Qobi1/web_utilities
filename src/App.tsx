import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { lazy, Suspense } from "react";
import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";

const Index = lazy(() => import("./pages/Index"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const ToolPage = lazy(() => import("./pages/ToolPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

function RouteLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-6 w-6 border-2 border-muted-foreground border-t-foreground rounded-full animate-spin" />
    </div>
  );
}

function AnalyticsListener() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname + location.search + location.hash);
  }, [location.pathname, location.search, location.hash]);
  return null;
}

const App = () => (
  <ThemeProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnalyticsListener />
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/:toolId" element={<ToolPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
