import { useState } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Mode = "chars" | "words" | "lines";

export function ReverseText() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("chars");

  const reverse = () => {
    if (!input) return "";
    if (mode === "chars") return input.split("").reverse().join("");
    if (mode === "words") return input.split(/\s+/).reverse().join(" ");
    return input.split("\n").reverse().join("\n");
  };

  const output = reverse();

  return (
    <div>
      <ToolHeader title="Reverse Text" description="Reverse characters, words, or lines" icon={Undo2} onClear={() => setInput("")} onCopy={() => navigator.clipboard.writeText(output)} />
      <div className="flex gap-2 mb-4">
        {(["chars", "words", "lines"] as Mode[]).map(m => (
          <Button key={m} variant={mode === m ? "default" : "outline"} size="sm" onClick={() => setMode(m)} className="capitalize">{m}</Button>
        ))}
      </div>
      <div className="split-view">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Input</label>
          <textarea className="tool-input min-h-[300px]" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text to reverse..." />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Reversed Output</label>
          <div className="tool-output min-h-[300px] whitespace-pre-wrap">{output || "Output will appear here..."}</div>
        </div>
      </div>
    </div>
  );
}
