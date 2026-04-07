import { useState } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { ArrowDownAZ } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SortText() {
  const [input, setInput] = useState("");
  const [dir, setDir] = useState<"asc" | "desc">("asc");

  const lines = input.split("\n").filter(l => l.trim());
  const sorted = [...lines].sort((a, b) => dir === "asc" ? a.localeCompare(b) : b.localeCompare(a));
  const output = input ? sorted.join("\n") : "";

  return (
    <div>
      <ToolHeader title="Sort Text" description="Sort lines alphabetically A–Z or Z–A" icon={ArrowDownAZ} onClear={() => setInput("")} onCopy={() => navigator.clipboard.writeText(output)} />
      <div className="flex gap-2 mb-4">
        <Button variant={dir === "asc" ? "default" : "outline"} size="sm" onClick={() => setDir("asc")}>A → Z</Button>
        <Button variant={dir === "desc" ? "default" : "outline"} size="sm" onClick={() => setDir("desc")}>Z → A</Button>
      </div>
      <div className="split-view">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Input</label>
          <textarea className="tool-input min-h-[300px]" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter lines to sort..." spellCheck={false} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Sorted Output</label>
          <div className="tool-output min-h-[300px] whitespace-pre-wrap">{output || "Output will appear here..."}</div>
        </div>
      </div>
    </div>
  );
}
