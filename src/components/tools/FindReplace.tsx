import { useState } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { Replace } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export function FindReplace() {
  const [input, setInput] = useState("");
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [useRegex, setUseRegex] = useState(false);

  let output = input;
  let count = 0;
  if (find && input) {
    try {
      const flags = caseSensitive ? "g" : "gi";
      const re = useRegex ? new RegExp(find, flags) : new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), flags);
      count = (input.match(re) || []).length;
      output = input.replace(re, replace);
    } catch {
      output = "Invalid regex pattern";
    }
  }

  return (
    <div>
      <ToolHeader title="Find & Replace" description="Find and replace text with regex support" icon={Replace} onClear={() => { setInput(""); setFind(""); setReplace(""); }} onCopy={() => navigator.clipboard.writeText(output)} />
      <div className="flex flex-wrap gap-4 mb-4 items-end">
        <div className="flex-1 min-w-[150px]">
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Find</label>
          <Input value={find} onChange={e => setFind(e.target.value)} placeholder="Search text..." />
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Replace with</label>
          <Input value={replace} onChange={e => setReplace(e.target.value)} placeholder="Replacement..." />
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-xs"><Switch checked={caseSensitive} onCheckedChange={setCaseSensitive} /> Case sensitive</label>
          <label className="flex items-center gap-2 text-xs"><Switch checked={useRegex} onCheckedChange={setUseRegex} /> Regex</label>
        </div>
      </div>
      {find && <p className="text-xs text-muted-foreground mb-2">{count} match{count !== 1 ? "es" : ""} found</p>}
      <div className="split-view">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Input</label>
          <textarea className="tool-input min-h-[300px]" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text..." spellCheck={false} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Output</label>
          <div className="tool-output min-h-[300px] whitespace-pre-wrap">{output || "Output will appear here..."}</div>
        </div>
      </div>
    </div>
  );
}
