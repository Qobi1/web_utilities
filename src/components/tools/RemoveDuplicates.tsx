import { useState } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { ListX } from "lucide-react";

export function RemoveDuplicates() {
  const [input, setInput] = useState("");
  const output = input ? [...new Set(input.split("\n"))].join("\n") : "";

  return (
    <div>
      <ToolHeader title="Remove Duplicate Lines" description="Remove duplicate lines from text" icon={ListX} onClear={() => setInput("")} onCopy={() => navigator.clipboard.writeText(output)} />
      <div className="split-view">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Input</label>
          <textarea className="tool-input min-h-[300px]" value={input} onChange={e => setInput(e.target.value)} placeholder="Paste text with duplicate lines..." spellCheck={false} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Output ({output.split("\n").filter(Boolean).length} unique lines)</label>
          <div className="tool-output min-h-[300px] whitespace-pre-wrap">{output || "Output will appear here..."}</div>
        </div>
      </div>
    </div>
  );
}
