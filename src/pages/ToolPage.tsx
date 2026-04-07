import { useParams, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { CommandPalette } from "@/components/CommandPalette";
import { ThemeToggle } from "@/components/ThemeToggle";
import { tools } from "@/lib/tools";
import { useSEO } from "@/hooks/useSEO";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { lazy, Suspense, useEffect } from "react";

// Lazy-load every tool component
const JsonFormatter = lazy(() => import("@/components/tools/JsonFormatter").then(m => ({ default: m.JsonFormatter })));
const DiffChecker = lazy(() => import("@/components/tools/DiffChecker").then(m => ({ default: m.DiffChecker })));
const JwtDecoder = lazy(() => import("@/components/tools/JwtDecoder").then(m => ({ default: m.JwtDecoder })));
const Base64Tool = lazy(() => import("@/components/tools/Base64Tool").then(m => ({ default: m.Base64Tool })));
const CaseConverter = lazy(() => import("@/components/tools/CaseConverter").then(m => ({ default: m.CaseConverter })));
const CronParser = lazy(() => import("@/components/tools/CronParser").then(m => ({ default: m.CronParser })));
const PasswordGenerator = lazy(() => import("@/components/tools/PasswordGenerator").then(m => ({ default: m.PasswordGenerator })));
const RemoveDuplicates = lazy(() => import("@/components/tools/RemoveDuplicates").then(m => ({ default: m.RemoveDuplicates })));
const SortText = lazy(() => import("@/components/tools/SortText").then(m => ({ default: m.SortText })));
const WordCounter = lazy(() => import("@/components/tools/WordCounter").then(m => ({ default: m.WordCounter })));
const ReverseText = lazy(() => import("@/components/tools/ReverseText").then(m => ({ default: m.ReverseText })));
const RemoveSpaces = lazy(() => import("@/components/tools/RemoveSpaces").then(m => ({ default: m.RemoveSpaces })));
const ExtractEmailsUrls = lazy(() => import("@/components/tools/ExtractEmailsUrls").then(m => ({ default: m.ExtractEmailsUrls })));
const TextToSlug = lazy(() => import("@/components/tools/TextToSlug").then(m => ({ default: m.TextToSlug })));
const FindReplace = lazy(() => import("@/components/tools/FindReplace").then(m => ({ default: m.FindReplace })));
const UrlEncoder = lazy(() => import("@/components/tools/UrlEncoder").then(m => ({ default: m.UrlEncoder })));
const HtmlEncoder = lazy(() => import("@/components/tools/HtmlEncoder").then(m => ({ default: m.HtmlEncoder })));
const JsonEscape = lazy(() => import("@/components/tools/JsonEscape").then(m => ({ default: m.JsonEscape })));
const BinaryText = lazy(() => import("@/components/tools/BinaryText").then(m => ({ default: m.BinaryText })));
const HexText = lazy(() => import("@/components/tools/HexText").then(m => ({ default: m.HexText })));
const UnicodeConverter = lazy(() => import("@/components/tools/UnicodeConverter").then(m => ({ default: m.UnicodeConverter })));
const JsonXml = lazy(() => import("@/components/tools/JsonXml").then(m => ({ default: m.JsonXml })));
const YamlJson = lazy(() => import("@/components/tools/YamlJson").then(m => ({ default: m.YamlJson })));
const SqlFormatter = lazy(() => import("@/components/tools/SqlFormatter").then(m => ({ default: m.SqlFormatter })));
const RegexTester = lazy(() => import("@/components/tools/RegexTester").then(m => ({ default: m.RegexTester })));
const UuidGenerator = lazy(() => import("@/components/tools/UuidGenerator").then(m => ({ default: m.UuidGenerator })));
const CodeMinifier = lazy(() => import("@/components/tools/CodeMinifier").then(m => ({ default: m.CodeMinifier })));
const HttpHeaders = lazy(() => import("@/components/tools/HttpHeaders").then(m => ({ default: m.HttpHeaders })));
const ApiTester = lazy(() => import("@/components/tools/ApiTester").then(m => ({ default: m.ApiTester })));

const toolComponents: Record<string, React.LazyExoticComponent<React.FC>> = {
  "json-formatter": JsonFormatter,
  "diff-checker": DiffChecker,
  "jwt-decoder": JwtDecoder,
  "base64": Base64Tool,
  "case-converter": CaseConverter,
  "cron-parser": CronParser,
  "password-generator": PasswordGenerator,
  "remove-duplicates": RemoveDuplicates,
  "sort-text": SortText,
  "word-counter": WordCounter,
  "reverse-text": ReverseText,
  "remove-spaces": RemoveSpaces,
  "extract-emails-urls": ExtractEmailsUrls,
  "text-to-slug": TextToSlug,
  "find-replace": FindReplace,
  "url-encoder": UrlEncoder,
  "html-encoder": HtmlEncoder,
  "json-escape": JsonEscape,
  "binary-text": BinaryText,
  "hex-text": HexText,
  "unicode-converter": UnicodeConverter,
  "json-xml": JsonXml,
  "yaml-json": YamlJson,
  "sql-formatter": SqlFormatter,
  "regex-tester": RegexTester,
  "uuid-generator": UuidGenerator,
  "code-minifier": CodeMinifier,
  "http-headers": HttpHeaders,
  "api-tester": ApiTester,
};

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

  const ActiveComponent = toolComponents[currentToolId];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar activeTool={currentToolId} onSelectTool={handleSelectTool} />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center justify-between border-b border-border px-4 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex items-center gap-2 text-muted-foreground"
                onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }))}
              >
                <Search className="h-3.5 w-3.5" />
                <span className="text-xs">Search tools...</span>
                <kbd className="ml-2 text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
              </Button>
            </div>
            <ThemeToggle />
          </header>
          <main className="flex-1 p-4 lg:p-6 max-w-6xl">
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
