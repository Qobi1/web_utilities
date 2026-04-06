import { useState, useCallback } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { Braces, ChevronRight, ChevronDown } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

function syntaxHighlight(json: string): string {
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = "text-info"; // number
      if (/^"/.test(match)) {
        cls = /:$/.test(match) ? "text-foreground font-medium" : "text-success";
      } else if (/true|false/.test(match)) {
        cls = "text-warning";
      } else if (/null/.test(match)) {
        cls = "text-destructive";
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
}

function TreeNode({ name, value, depth = 0 }: { name?: string; value: any; depth?: number }) {
  const [open, setOpen] = useState(depth < 2);
  const isObject = value !== null && typeof value === "object";
  const isArray = Array.isArray(value);

  if (!isObject) {
    const display = typeof value === "string" ? `"${value}"` : String(value);
    const colorClass = typeof value === "string" ? "text-success" : typeof value === "number" ? "text-info" : typeof value === "boolean" ? "text-warning" : "text-destructive";
    return (
      <div className="flex items-center gap-1 py-0.5" style={{ paddingLeft: depth * 16 }}>
        {name && <span className="text-foreground font-medium">{name}: </span>}
        <span className={colorClass}>{display}</span>
      </div>
    );
  }

  const entries = isArray ? value.map((v: any, i: number) => [String(i), v]) : Object.entries(value);

  return (
    <div style={{ paddingLeft: depth * 16 }}>
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1 py-0.5 hover:bg-accent/50 rounded px-1 w-full text-left">
        {open ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
        {name && <span className="text-foreground font-medium">{name}</span>}
        <span className="text-muted-foreground text-xs">{isArray ? `[${entries.length}]` : `{${entries.length}}`}</span>
      </button>
      {open && entries.map(([k, v]: [string, any]) => <TreeNode key={k} name={k} value={v} depth={depth + 1} />)}
    </div>
  );
}

export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [parsed, setParsed] = useState<any>(null);
  const [error, setError] = useState("");

  const format = useCallback((val: string) => {
    setInput(val);
    if (!val.trim()) { setOutput(""); setParsed(null); setError(""); return; }
    try {
      const obj = JSON.parse(val);
      setOutput(JSON.stringify(obj, null, 2));
      setParsed(obj);
      setError("");
    } catch (e: any) {
      setError(e.message);
      setOutput("");
      setParsed(null);
    }
  }, []);

  return (
    <div>
      <ToolHeader
        title="JSON Formatter"
        description="Format, validate, and explore JSON data"
        icon={Braces}
        onClear={() => { setInput(""); setOutput(""); setParsed(null); setError(""); }}
        onCopy={() => navigator.clipboard.writeText(output)}
      />
      <Tabs defaultValue="formatted" className="mb-4">
        <TabsList>
          <TabsTrigger value="formatted">Formatted</TabsTrigger>
          <TabsTrigger value="tree">Tree View</TabsTrigger>
        </TabsList>
        <div className="split-view mt-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Input</label>
            <textarea
              className="tool-input min-h-[400px]"
              value={input}
              onChange={e => format(e.target.value)}
              placeholder='Paste JSON here...'
              spellCheck={false}
            />
            {error && <p className="text-destructive text-xs mt-2">{error}</p>}
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Output</label>
            <TabsContent value="formatted" className="mt-0">
              <div
                className="tool-output min-h-[400px] whitespace-pre"
                dangerouslySetInnerHTML={{ __html: output ? syntaxHighlight(output) : '<span class="text-muted-foreground">Output will appear here...</span>' }}
              />
            </TabsContent>
            <TabsContent value="tree" className="mt-0">
              <div className="tool-output min-h-[400px] font-mono text-sm">
                {parsed ? <TreeNode value={parsed} /> : <span className="text-muted-foreground">Parse valid JSON to see tree view</span>}
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
