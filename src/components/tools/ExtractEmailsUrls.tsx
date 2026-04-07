import { useState } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { AtSign } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExtractEmailsUrls() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"emails" | "urls">("emails");

  const emailRe = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const urlRe = /https?:\/\/[^\s<>"{}|\\^`[\]]+/g;

  const matches = input ? (input.match(mode === "emails" ? emailRe : urlRe) || []) : [];
  const unique = [...new Set(matches)];
  const output = unique.join("\n");

  return (
    <div>
      <ToolHeader title="Extract Emails & URLs" description="Extract email addresses or URLs from text" icon={AtSign} onClear={() => setInput("")} onCopy={() => navigator.clipboard.writeText(output)} />
      <div className="flex gap-2 mb-4">
        <Button variant={mode === "emails" ? "default" : "outline"} size="sm" onClick={() => setMode("emails")}>Emails</Button>
        <Button variant={mode === "urls" ? "default" : "outline"} size="sm" onClick={() => setMode("urls")}>URLs</Button>
      </div>
      <div className="split-view">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Input Text</label>
          <textarea className="tool-input min-h-[300px]" value={input} onChange={e => setInput(e.target.value)} placeholder="Paste text containing emails or URLs..." spellCheck={false} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Found {unique.length} {mode}</label>
          <div className="tool-output min-h-[300px] whitespace-pre-wrap">{output || "No matches found..."}</div>
        </div>
      </div>
    </div>
  );
}
