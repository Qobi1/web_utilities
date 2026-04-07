import { useState } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { Hash } from "lucide-react";

export function WordCounter() {
  const [input, setInput] = useState("");

  const chars = input.length;
  const charsNoSpace = input.replace(/\s/g, "").length;
  const words = input.trim() ? input.trim().split(/\s+/).length : 0;
  const sentences = input.trim() ? input.split(/[.!?]+/).filter(s => s.trim()).length : 0;
  const lines = input ? input.split("\n").length : 0;
  const paragraphs = input.trim() ? input.split(/\n\s*\n/).filter(p => p.trim()).length : 0;

  const stats = [
    { label: "Characters", value: chars },
    { label: "Characters (no spaces)", value: charsNoSpace },
    { label: "Words", value: words },
    { label: "Sentences", value: sentences },
    { label: "Lines", value: lines },
    { label: "Paragraphs", value: paragraphs },
  ];

  return (
    <div>
      <ToolHeader title="Word & Character Counter" description="Count words, characters, sentences, and more" icon={Hash} onClear={() => setInput("")} />
      <textarea className="tool-input min-h-[200px] mb-4" value={input} onChange={e => setInput(e.target.value)} placeholder="Type or paste your text here..." />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {stats.map(s => (
          <div key={s.label} className="tool-panel p-4 text-center">
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
