import { useState } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { Braces } from "lucide-react";
import { Button } from "@/components/ui/button";

export function JsonEscape() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"escape" | "unescape">("escape");

  let output = "";
  if (input) {
    try {
      output = mode === "escape" ? JSON.stringify(input) : JSON.parse(input);
    } catch {
      output = "Invalid input";
    }
  }

  return (
    <div>
      <ToolHeader title="JSON Escape / Unescape" description="Escape or unescape JSON strings" icon={Braces} onClear={() => setInput("")} onCopy={() => navigator.clipboard.writeText(output)} />
      <div className="flex gap-2 mb-4">
        <Button variant={mode === "escape" ? "default" : "outline"} size="sm" onClick={() => { setMode("escape"); setInput(""); }}>Escape</Button>
        <Button variant={mode === "unescape" ? "default" : "outline"} size="sm" onClick={() => { setMode("unescape"); setInput(""); }}>Unescape</Button>
      </div>
      <div className="split-view">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Input</label>
          <textarea className="tool-input min-h-[300px]" value={input} onChange={e => setInput(e.target.value)} placeholder={mode === "escape" ? "Enter text to escape..." : 'Enter escaped JSON string (with quotes)...'} spellCheck={false} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Output</label>
          <div className="tool-output min-h-[300px] whitespace-pre-wrap break-all">{output || "Output will appear here..."}</div>
        </div>
      </div>
    </div>
  );
}
