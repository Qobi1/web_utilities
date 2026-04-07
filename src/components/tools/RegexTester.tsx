import { useState, useMemo } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { Regex } from "lucide-react";
import { Input } from "@/components/ui/input";

export function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testStr, setTestStr] = useState("");

  const result = useMemo(() => {
    if (!pattern || !testStr) return { matches: [], error: "" };
    try {
      const re = new RegExp(pattern, flags);
      const matches: { match: string; index: number; groups?: Record<string, string> }[] = [];
      let m: RegExpExecArray | null;
      if (flags.includes("g")) {
        while ((m = re.exec(testStr)) !== null) {
          matches.push({ match: m[0], index: m.index, groups: m.groups });
          if (!m[0]) re.lastIndex++;
        }
      } else {
        m = re.exec(testStr);
        if (m) matches.push({ match: m[0], index: m.index, groups: m.groups });
      }
      return { matches, error: "" };
    } catch (e: any) {
      return { matches: [], error: e.message };
    }
  }, [pattern, flags, testStr]);

  return (
    <div>
      <ToolHeader title="Regex Tester" description="Test regular expressions with real-time matching" icon={Regex} onClear={() => { setPattern(""); setTestStr(""); }} />
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Pattern</label>
          <Input value={pattern} onChange={e => setPattern(e.target.value)} placeholder="[a-z]+" className="font-mono" />
        </div>
        <div className="w-24">
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Flags</label>
          <Input value={flags} onChange={e => setFlags(e.target.value)} placeholder="gi" className="font-mono" />
        </div>
      </div>
      {result.error && <p className="text-xs text-destructive mb-2">{result.error}</p>}
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-2 block">Test String</label>
        <textarea className="tool-input min-h-[200px]" value={testStr} onChange={e => setTestStr(e.target.value)} placeholder="Enter test string..." spellCheck={false} />
      </div>
      {result.matches.length > 0 && (
        <div className="mt-4">
          <label className="text-xs font-medium text-muted-foreground mb-2 block">{result.matches.length} match{result.matches.length !== 1 ? "es" : ""}</label>
          <div className="tool-panel divide-y divide-border max-h-[300px] overflow-auto">
            {result.matches.map((m, i) => (
              <div key={i} className="p-2 text-sm font-mono flex gap-4">
                <span className="text-muted-foreground text-xs min-w-[3rem]">#{i + 1} @{m.index}</span>
                <span className="text-primary">{m.match || "(empty)"}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
