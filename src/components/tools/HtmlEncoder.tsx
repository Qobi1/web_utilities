import { useState } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { Code } from "lucide-react";
import { Button } from "@/components/ui/button";

const entities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const revEntities: Record<string, string> = Object.fromEntries(Object.entries(entities).map(([k, v]) => [v, k]));

function htmlEncode(s: string) { return s.replace(/[&<>"']/g, c => entities[c] || c); }
function htmlDecode(s: string) { return s.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, e => revEntities[e] || e); }

export function HtmlEncoder() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const output = input ? (mode === "encode" ? htmlEncode(input) : htmlDecode(input)) : "";

  return (
    <div>
      <ToolHeader title="HTML Encoder / Decoder" description="Encode or decode HTML entities" icon={Code} onClear={() => setInput("")} onCopy={() => navigator.clipboard.writeText(output)} />
      <div className="flex gap-2 mb-4">
        <Button variant={mode === "encode" ? "default" : "outline"} size="sm" onClick={() => { setMode("encode"); setInput(""); }}>Encode</Button>
        <Button variant={mode === "decode" ? "default" : "outline"} size="sm" onClick={() => { setMode("decode"); setInput(""); }}>Decode</Button>
      </div>
      <div className="split-view">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Input</label>
          <textarea className="tool-input min-h-[300px]" value={input} onChange={e => setInput(e.target.value)} placeholder={mode === "encode" ? "Enter HTML to encode..." : "Enter encoded HTML..."} spellCheck={false} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Output</label>
          <div className="tool-output min-h-[300px] whitespace-pre-wrap break-all">{output || "Output will appear here..."}</div>
        </div>
      </div>
    </div>
  );
}
