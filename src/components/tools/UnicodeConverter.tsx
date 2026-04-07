import { useState } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";

function textToUnicode(s: string) {
  return Array.from(s).map(c => "U+" + c.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0")).join(" ");
}
function unicodeToText(s: string) {
  return s.trim().split(/\s+/).map(u => {
    const code = parseInt(u.replace(/^U\+/i, ""), 16);
    return String.fromCodePoint(code);
  }).join("");
}

export function UnicodeConverter() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"to-unicode" | "to-text">("to-unicode");

  let output = "";
  if (input) {
    try {
      output = mode === "to-unicode" ? textToUnicode(input) : unicodeToText(input);
    } catch {
      output = "Invalid input";
    }
  }

  return (
    <div>
      <ToolHeader title="Unicode Converter" description="Convert between text and Unicode code points" icon={Languages} onClear={() => setInput("")} onCopy={() => navigator.clipboard.writeText(output)} />
      <div className="flex gap-2 mb-4">
        <Button variant={mode === "to-unicode" ? "default" : "outline"} size="sm" onClick={() => { setMode("to-unicode"); setInput(""); }}>Text → Unicode</Button>
        <Button variant={mode === "to-text" ? "default" : "outline"} size="sm" onClick={() => { setMode("to-text"); setInput(""); }}>Unicode → Text</Button>
      </div>
      <div className="split-view">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Input</label>
          <textarea className="tool-input min-h-[300px]" value={input} onChange={e => setInput(e.target.value)} placeholder={mode === "to-unicode" ? "Enter text..." : "Enter Unicode points (U+0048 U+0069)..."} spellCheck={false} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Output</label>
          <div className="tool-output min-h-[300px] whitespace-pre-wrap break-all">{output || "Output will appear here..."}</div>
        </div>
      </div>
    </div>
  );
}
