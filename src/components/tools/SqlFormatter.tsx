import { useState } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { Database } from "lucide-react";
import { format } from "sql-formatter";

export function SqlFormatter() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  let output = "";
  if (input) {
    try {
      output = format(input, { language: "sql", tabWidth: 2 });
      setError("");
    } catch (e: any) {
      output = "";
    }
  }

  return (
    <div>
      <ToolHeader title="SQL Formatter" description="Format and beautify SQL queries" icon={Database} onClear={() => { setInput(""); setError(""); }} onCopy={() => navigator.clipboard.writeText(output)} />
      <div className="split-view">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Input SQL</label>
          <textarea className="tool-input min-h-[300px] font-mono text-xs" value={input} onChange={e => setInput(e.target.value)} placeholder="SELECT * FROM users WHERE id = 1 AND name = 'John';" spellCheck={false} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Formatted SQL</label>
          <div className="tool-output min-h-[300px] whitespace-pre-wrap font-mono text-xs">
            {input && !output ? <span className="text-destructive">Invalid SQL</span> : output || "Formatted SQL will appear here..."}
          </div>
        </div>
      </div>
    </div>
  );
}
