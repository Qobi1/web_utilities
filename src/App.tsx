import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { lazy, Suspense } from "react";

const Index = lazy(() => import("./pages/Index"));
const ToolPage = lazy(() => import("./pages/ToolPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

function RouteLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-6 w-6 border-2 border-muted-foreground border-t-foreground rounded-full animate-spin" />
    </div>
  );
}

const App = () => (
  <ThemeProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/:toolId" element={<ToolPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
