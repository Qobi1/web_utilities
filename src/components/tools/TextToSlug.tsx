import { useState } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { Link } from "lucide-react";

export function TextToSlug() {
  const [input, setInput] = useState("");

  const slug = input
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return (
    <div>
      <ToolHeader title="Text to Slug" description="Convert text to URL-friendly slugs" icon={Link} onClear={() => setInput("")} onCopy={() => navigator.clipboard.writeText(slug)} />
      <div className="split-view">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Input Text</label>
          <textarea className="tool-input min-h-[200px]" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text to slugify..." />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Slug Output</label>
          <div className="tool-output min-h-[200px] font-mono">{slug || "slug-will-appear-here"}</div>
        </div>
      </div>
    </div>
  );
}
