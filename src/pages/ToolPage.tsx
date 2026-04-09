import { useParams, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { CommandPalette } from "@/components/CommandPalette";
import { ThemeToggle } from "@/components/ThemeToggle";
import { tools } from "@/lib/tools";
import { useSEO } from "@/hooks/useSEO";
import { toolLoaders } from "@/lib/toolLoaders";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { lazy, Suspense, useEffect, useMemo } from "react";

function ToolLoader() {
  return (
    <div className="flex items-center justify-center h-40">
      <div className="h-6 w-6 border-2 border-muted-foreground border-t-foreground rounded-full animate-spin" />
    </div>
  );
}

export default function ToolPage() {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  const currentToolId = toolId || "json-formatter";
  const tool = tools.find(t => t.id === currentToolId);

  useSEO(tool);

  useEffect(() => {
    if (tool) localStorage.setItem("devutils-active-tool", tool.id);
  }, [tool]);

  const handleSelectTool = (id: string) => {
    const t = tools.find(t => t.id === id);
    if (t) navigate(t.path);
  };

  const ActiveComponent = useMemo(() => {
    const loader = toolLoaders[currentToolId];
    return loader ? lazy(loader) : null;
  }, [currentToolId]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar activeTool={currentToolId} onSelectTool={handleSelectTool} />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center justify-between border-b border-border px-4 bg-card/50 backdrop-blur-sm sticky top-0 z-10" role="banner">
            <div className="flex items-center gap-2">
              <SidebarTrigger aria-label="Toggle sidebar" />
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex items-center gap-2 text-muted-foreground min-h-[36px]"
                onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }))}
                aria-label="Search tools (Cmd+K)"
              >
                <Search className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="text-xs">Search tools...</span>
                <kbd className="ml-2 text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono" aria-hidden="true">⌘K</kbd>
              </Button>
            </div>
            <ThemeToggle />
          </header>
          <main className="flex-1 p-4 lg:p-6 max-w-6xl" role="main">
            {ActiveComponent ? (
              <Suspense fallback={<ToolLoader />}>
                <ActiveComponent />
              </Suspense>
            ) : (
              <div className="text-muted-foreground">Tool not found</div>
            )}
          </main>
        </div>
      </div>
      <CommandPalette onSelect={handleSelectTool} />
    </SidebarProvider>
  );
}
