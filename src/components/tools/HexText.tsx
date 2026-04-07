import { useState } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { Hash } from "lucide-react";
import { Button } from "@/components/ui/button";

function textToHex(s: string) {
  return Array.from(s).map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join(" ");
}
function hexToText(s: string) {
  return s.trim().split(/\s+/).map(h => String.fromCharCode(parseInt(h, 16))).join("");
}

export function HexText() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"to-hex" | "to-text">("to-hex");

  let output = "";
  if (input) {
    try {
      output = mode === "to-hex" ? textToHex(input) : hexToText(input);
    } catch {
      output = "Invalid input";
    }
  }

  return (
    <div>
      <ToolHeader title="Hex ↔ Text" description="Convert between hexadecimal and text" icon={Hash} onClear={() => setInput("")} onCopy={() => navigator.clipboard.writeText(output)} />
      <div className="flex gap-2 mb-4">
        <Button variant={mode === "to-hex" ? "default" : "outline"} size="sm" onClick={() => { setMode("to-hex"); setInput(""); }}>Text → Hex</Button>
        <Button variant={mode === "to-text" ? "default" : "outline"} size="sm" onClick={() => { setMode("to-text"); setInput(""); }}>Hex → Text</Button>
      </div>
      <div className="split-view">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Input</label>
          <textarea className="tool-input min-h-[300px]" value={input} onChange={e => setInput(e.target.value)} placeholder={mode === "to-hex" ? "Enter text..." : "Enter hex (space-separated)..."} spellCheck={false} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Output</label>
          <div className="tool-output min-h-[300px] whitespace-pre-wrap break-all">{output || "Output will appear here..."}</div>
        </div>
      </div>
    </div>
  );
}
