import { useState } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { Space } from "lucide-react";

export function RemoveSpaces() {
  const [input, setInput] = useState("");

  const output = input
    .replace(/[^\S\n]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .split("\n").map(l => l.trim()).join("\n")
    .trim();

  return (
    <div>
      <ToolHeader title="Remove Extra Spaces" description="Clean up extra whitespace from text" icon={Space} onClear={() => setInput("")} onCopy={() => navigator.clipboard.writeText(output)} />
      <div className="split-view">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Input</label>
          <textarea className="tool-input min-h-[300px]" value={input} onChange={e => setInput(e.target.value)} placeholder="Paste text with extra spaces..." spellCheck={false} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Cleaned Output</label>
          <div className="tool-output min-h-[300px] whitespace-pre-wrap">{output || "Output will appear here..."}</div>
        </div>
      </div>
    </div>
  );
}
