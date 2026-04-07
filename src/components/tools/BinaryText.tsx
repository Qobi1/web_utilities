import { useState } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { Binary } from "lucide-react";
import { Button } from "@/components/ui/button";

function textToBin(s: string) {
  return Array.from(s).map(c => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
}
function binToText(s: string) {
  return s.trim().split(/\s+/).map(b => String.fromCharCode(parseInt(b, 2))).join("");
}

export function BinaryText() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"to-bin" | "to-text">("to-bin");

  let output = "";
  if (input) {
    try {
      output = mode === "to-bin" ? textToBin(input) : binToText(input);
    } catch {
      output = "Invalid input";
    }
  }

  return (
    <div>
      <ToolHeader title="Binary ↔ Text" description="Convert between binary and text" icon={Binary} onClear={() => setInput("")} onCopy={() => navigator.clipboard.writeText(output)} />
      <div className="flex gap-2 mb-4">
        <Button variant={mode === "to-bin" ? "default" : "outline"} size="sm" onClick={() => { setMode("to-bin"); setInput(""); }}>Text → Binary</Button>
        <Button variant={mode === "to-text" ? "default" : "outline"} size="sm" onClick={() => { setMode("to-text"); setInput(""); }}>Binary → Text</Button>
      </div>
      <div className="split-view">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Input</label>
          <textarea className="tool-input min-h-[300px]" value={input} onChange={e => setInput(e.target.value)} placeholder={mode === "to-bin" ? "Enter text..." : "Enter binary (space-separated)..."} spellCheck={false} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Output</label>
          <div className="tool-output min-h-[300px] whitespace-pre-wrap break-all">{output || "Output will appear here..."}</div>
        </div>
      </div>
    </div>
  );
}
