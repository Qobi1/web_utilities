import { useState } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UrlEncoder() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  let output = "";
  if (input) {
    try {
      output = mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input);
    } catch {
      output = "Invalid input";
    }
  }

  return (
    <div>
      <ToolHeader title="URL Encoder / Decoder" description="Encode or decode URL components" icon={Globe} onClear={() => setInput("")} onCopy={() => navigator.clipboard.writeText(output)} />
      <div className="flex gap-2 mb-4">
        <Button variant={mode === "encode" ? "default" : "outline"} size="sm" onClick={() => { setMode("encode"); setInput(""); }}>Encode</Button>
        <Button variant={mode === "decode" ? "default" : "outline"} size="sm" onClick={() => { setMode("decode"); setInput(""); }}>Decode</Button>
      </div>
      <div className="split-view">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Input</label>
          <textarea className="tool-input min-h-[300px]" value={input} onChange={e => setInput(e.target.value)} placeholder={mode === "encode" ? "Enter text to URL encode..." : "Enter URL-encoded text..."} spellCheck={false} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Output</label>
          <div className="tool-output min-h-[300px] whitespace-pre-wrap break-all">{output || "Output will appear here..."}</div>
        </div>
      </div>
    </div>
  );
}
