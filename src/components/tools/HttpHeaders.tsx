import { useState } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { Network } from "lucide-react";

export function HttpHeaders() {
  const [input, setInput] = useState("");

  const headers = input.trim().split("\n").filter(Boolean).map(line => {
    const idx = line.indexOf(":");
    if (idx === -1) return { name: line.trim(), value: "" };
    return { name: line.slice(0, idx).trim(), value: line.slice(idx + 1).trim() };
  });

  return (
    <div>
      <ToolHeader title="HTTP Headers Parser" description="Parse and analyze HTTP headers" icon={Network} onClear={() => setInput("")} />
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-2 block">Paste HTTP Headers</label>
        <textarea className="tool-input min-h-[200px] font-mono text-xs" value={input} onChange={e => setInput(e.target.value)} placeholder={"Content-Type: application/json\nAuthorization: Bearer eyJ...\nCache-Control: no-cache"} spellCheck={false} />
      </div>
      {input.trim() && (
        <div className="mt-4 tool-panel overflow-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border"><th className="text-left p-2 text-xs text-muted-foreground font-medium">Header</th><th className="text-left p-2 text-xs text-muted-foreground font-medium">Value</th></tr></thead>
            <tbody>
              {headers.map((h, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="p-2 font-mono text-xs font-semibold text-primary whitespace-nowrap">{h.name}</td>
                  <td className="p-2 font-mono text-xs break-all">{h.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
