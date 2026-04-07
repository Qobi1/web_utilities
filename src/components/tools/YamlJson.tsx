import { useState } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import yaml from "js-yaml";

export function YamlJson() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"yaml-to-json" | "json-to-yaml">("yaml-to-json");
  const [error, setError] = useState("");

  let output = "";
  if (input) {
    try {
      if (mode === "yaml-to-json") {
        output = JSON.stringify(yaml.load(input), null, 2);
      } else {
        output = yaml.dump(JSON.parse(input), { indent: 2 });
      }
      setError("");
    } catch (e: any) {
      output = "";
      // error shown inline
    }
  }

  const hasError = input && !output;

  return (
    <div>
      <ToolHeader title="YAML ↔ JSON" description="Convert between YAML and JSON formats" icon={FileText} onClear={() => { setInput(""); setError(""); }} onCopy={() => navigator.clipboard.writeText(output)} />
      <div className="flex gap-2 mb-4">
        <Button variant={mode === "yaml-to-json" ? "default" : "outline"} size="sm" onClick={() => { setMode("yaml-to-json"); setInput(""); }}>YAML → JSON</Button>
        <Button variant={mode === "json-to-yaml" ? "default" : "outline"} size="sm" onClick={() => { setMode("json-to-yaml"); setInput(""); }}>JSON → YAML</Button>
      </div>
      <div className="split-view">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Input ({mode === "yaml-to-json" ? "YAML" : "JSON"})</label>
          <textarea className="tool-input min-h-[300px]" value={input} onChange={e => setInput(e.target.value)} placeholder={mode === "yaml-to-json" ? "name: John\nage: 30" : '{"name": "John"}'} spellCheck={false} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Output ({mode === "yaml-to-json" ? "JSON" : "YAML"})</label>
          <div className="tool-output min-h-[300px] whitespace-pre-wrap break-all font-mono text-xs">
            {hasError ? <span className="text-destructive">Invalid input format</span> : output || "Output will appear here..."}
          </div>
        </div>
      </div>
    </div>
  );
}
