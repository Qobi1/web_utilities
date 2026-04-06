import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { CommandPalette } from "@/components/CommandPalette";
import { ThemeToggle } from "@/components/ThemeToggle";
import { JsonFormatter } from "@/components/tools/JsonFormatter";
import { DiffChecker } from "@/components/tools/DiffChecker";
import { JwtDecoder } from "@/components/tools/JwtDecoder";
import { Base64Tool } from "@/components/tools/Base64Tool";
import { CaseConverter } from "@/components/tools/CaseConverter";
import { CronParser } from "@/components/tools/CronParser";
import { PasswordGenerator } from "@/components/tools/PasswordGenerator";
import { tools } from "@/lib/tools";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const toolComponents: Record<string, React.FC> = {
  "json-formatter": JsonFormatter,
  "diff-checker": DiffChecker,
  "jwt-decoder": JwtDecoder,
  "base64": Base64Tool,
  "case-converter": CaseConverter,
  "cron-parser": CronParser,
  "password-generator": PasswordGenerator,
};

export default function Index() {
  const [activeTool, setActiveTool] = useState(() => {
    return localStorage.getItem("devutils-active-tool") || "json-formatter";
  });

  useEffect(() => {
    localStorage.setItem("devutils-active-tool", activeTool);
    const tool = tools.find(t => t.id === activeTool);
    if (tool) {
      document.title = tool.metaTitle;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", tool.metaDescription);
    }
  }, [activeTool]);

  const ActiveComponent = toolComponents[activeTool] || JsonFormatter;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar activeTool={activeTool} onSelectTool={setActiveTool} />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center justify-between border-b border-border px-4 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex items-center gap-2 text-muted-foreground"
                onClick={() => {
                  const e = new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true });
                  document.dispatchEvent(e);
                }}
              >
                <Search className="h-3.5 w-3.5" />
                <span className="text-xs">Search tools...</span>
                <kbd className="ml-2 text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
              </Button>
            </div>
            <ThemeToggle />
          </header>
          <main className="flex-1 p-4 lg:p-6 max-w-6xl">
            <ActiveComponent />
          </main>
        </div>
      </div>
      <CommandPalette onSelect={setActiveTool} />
    </SidebarProvider>
  );
}
