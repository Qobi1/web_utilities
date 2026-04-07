import { useState } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function minifyJS(s: string) {
  return s.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}();,:])\s*/g, "$1").trim();
}
function minifyCSS(s: string) {
  return s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,>~+])\s*/g, "$1").replace(/;\}/g, "}").trim();
}
function beautifyJS(s: string) {
  let indent = 0;
  let result = "";
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === "{" || c === "[") { result += c + "\n" + "  ".repeat(++indent); }
    else if (c === "}" || c === "]") { result += "\n" + "  ".repeat(--indent) + c; }
    else if (c === ";") { result += ";\n" + "  ".repeat(indent); }
    else if (c === ",") { result += ",\n" + "  ".repeat(indent); }
    else { result += c; }
  }
  return result.replace(/\n\s*\n/g, "\n").trim();
}

export function CodeMinifier() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"minify" | "beautify">("minify");
  const [lang, setLang] = useState<"js" | "css">("js");

  let output = "";
  if (input) {
    if (mode === "minify") {
      output = lang === "js" ? minifyJS(input) : minifyCSS(input);
    } else {
      output = beautifyJS(input);
    }
  }

  return (
    <div>
      <ToolHeader title="Code Minifier & Beautifier" description="Minify or beautify JavaScript and CSS" icon={Minimize2} onClear={() => setInput("")} onCopy={() => navigator.clipboard.writeText(output)} />
      <div className="flex gap-2 mb-4 flex-wrap">
        <Button variant={mode === "minify" ? "default" : "outline"} size="sm" onClick={() => setMode("minify")}>Minify</Button>
        <Button variant={mode === "beautify" ? "default" : "outline"} size="sm" onClick={() => setMode("beautify")}>Beautify</Button>
        <div className="w-px bg-border mx-1" />
        <Button variant={lang === "js" ? "default" : "outline"} size="sm" onClick={() => setLang("js")}>JavaScript</Button>
        <Button variant={lang === "css" ? "default" : "outline"} size="sm" onClick={() => setLang("css")}>CSS</Button>
      </div>
      <div className="split-view">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Input</label>
          <textarea className="tool-input min-h-[300px] font-mono text-xs" value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your code here..." spellCheck={false} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Output ({input.length} → {output.length} chars)</label>
          <div className="tool-output min-h-[300px] whitespace-pre-wrap font-mono text-xs">{output || "Output will appear here..."}</div>
        </div>
      </div>
    </div>
  );
}
