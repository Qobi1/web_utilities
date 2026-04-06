import { useState } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { FileCode } from "lucide-react";

function diffLines(a: string[], b: string[]) {
  const result: { type: "same" | "added" | "removed"; text: string }[] = [];
  const maxLen = Math.max(a.length, b.length);
  // Simple LCS-based diff
  const lcs: number[][] = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      lcs[i][j] = a[i - 1] === b[j - 1] ? lcs[i - 1][j - 1] + 1 : Math.max(lcs[i - 1][j], lcs[i][j - 1]);

  let i = a.length, j = b.length;
  const ops: { type: "same" | "added" | "removed"; text: string }[] = [];
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      ops.unshift({ type: "same", text: a[i - 1] });
      i--; j--;
    } else if (j > 0 && (i === 0 || lcs[i][j - 1] >= lcs[i - 1][j])) {
      ops.unshift({ type: "added", text: b[j - 1] });
      j--;
    } else {
      ops.unshift({ type: "removed", text: a[i - 1] });
      i--;
    }
  }
  return ops;
}

export function DiffChecker() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  const leftLines = left.split("\n");
  const rightLines = right.split("\n");
  const diff = diffLines(leftLines, rightLines);

  return (
    <div>
      <ToolHeader
        title="Diff Checker"
        description="Compare two texts side by side"
        icon={FileCode}
        onClear={() => { setLeft(""); setRight(""); }}
      />
      <div className="split-view">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Original</label>
          <textarea className="tool-input min-h-[300px]" value={left} onChange={e => setLeft(e.target.value)} placeholder="Paste original text..." spellCheck={false} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Modified</label>
          <textarea className="tool-input min-h-[300px]" value={right} onChange={e => setRight(e.target.value)} placeholder="Paste modified text..." spellCheck={false} />
        </div>
      </div>
      {(left || right) && (
        <div className="mt-4 tool-panel p-4">
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Differences</label>
          <div className="font-mono text-sm space-y-0">
            {diff.map((line, i) => (
              <div
                key={i}
                className={`px-3 py-0.5 rounded-sm ${
                  line.type === "added" ? "bg-diff-added text-diff-added-text" :
                  line.type === "removed" ? "bg-diff-removed text-diff-removed-text" :
                  "text-muted-foreground"
                }`}
              >
                <span className="inline-block w-4 select-none opacity-60">
                  {line.type === "added" ? "+" : line.type === "removed" ? "-" : " "}
                </span>
                {line.text || "\u00A0"}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
