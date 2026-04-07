import { useState, useCallback } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

function generateUUID() {
  return crypto.randomUUID();
}

export function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>(() => [generateUUID()]);
  const [count, setCount] = useState(1);

  const generate = useCallback(() => {
    setUuids(Array.from({ length: count }, () => generateUUID()));
  }, [count]);

  return (
    <div>
      <ToolHeader title="UUID Generator" description="Generate random UUIDs (v4)" icon={Fingerprint} onClear={() => setUuids([generateUUID()])} onCopy={() => navigator.clipboard.writeText(uuids.join("\n"))} />
      <div className="flex gap-3 items-end mb-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Count</label>
          <input type="number" min={1} max={100} value={count} onChange={e => setCount(Math.max(1, Math.min(100, +e.target.value)))} className="tool-input w-24 h-9 px-2" />
        </div>
        <Button onClick={generate} size="sm">Generate</Button>
      </div>
      <div className="tool-panel divide-y divide-border">
        {uuids.map((uuid, i) => (
          <div key={i} className="flex items-center justify-between p-2">
            <code className="text-sm font-mono">{uuid}</code>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => navigator.clipboard.writeText(uuid)}>
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
