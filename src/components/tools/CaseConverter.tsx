import { useState } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { CaseSensitive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

function toCamel(s: string) {
  return s.replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : "").replace(/^./, c => c.toLowerCase());
}
function toPascal(s: string) {
  return toCamel(s).replace(/^./, c => c.toUpperCase());
}
function toSnake(s: string) {
  return s.replace(/([a-z])([A-Z])/g, "$1_$2").replace(/[-\s]+/g, "_").toLowerCase();
}
function toKebab(s: string) {
  return s.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]+/g, "-").toLowerCase();
}

const cases = [
  { name: "camelCase", fn: toCamel },
  { name: "PascalCase", fn: toPascal },
  { name: "snake_case", fn: toSnake },
  { name: "kebab-case", fn: toKebab },
];

export function CaseConverter() {
  const [input, setInput] = useState("");

  return (
    <div>
      <ToolHeader
        title="Case Converter"
        description="Transform text between cases"
        icon={CaseSensitive}
        onClear={() => setInput("")}
      />
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-2 block">Input Text</label>
        <textarea className="tool-input min-h-[120px]" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text to convert..." />
      </div>
      {input && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {cases.map(c => (
            <div key={c.name} className="tool-panel p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-muted-foreground">{c.name}</label>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => navigator.clipboard.writeText(c.fn(input))}>
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <div className="font-mono text-sm">{c.fn(input)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
