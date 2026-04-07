import { useState } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";

function jsonToXml(obj: any, indent = 0): string {
  const pad = "  ".repeat(indent);
  if (Array.isArray(obj)) {
    return obj.map(item => `${pad}<item>\n${jsonToXml(item, indent + 1)}${pad}</item>\n`).join("");
  }
  if (typeof obj === "object" && obj !== null) {
    return Object.entries(obj).map(([k, v]) => {
      const tag = k.replace(/[^a-zA-Z0-9_-]/g, "_");
      if (typeof v === "object" && v !== null) {
        return `${pad}<${tag}>\n${jsonToXml(v, indent + 1)}${pad}</${tag}>\n`;
      }
      return `${pad}<${tag}>${escapeXml(String(v))}</${tag}>\n`;
    }).join("");
  }
  return `${pad}${escapeXml(String(obj))}\n`;
}

function escapeXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function xmlToJson(xml: string): any {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");
  const err = doc.querySelector("parsererror");
  if (err) throw new Error("Invalid XML");
  return nodeToObj(doc.documentElement);
}

function nodeToObj(node: Element): any {
  const children = Array.from(node.children);
  if (children.length === 0) return node.textContent || "";
  const obj: any = {};
  children.forEach(child => {
    const key = child.tagName;
    const val = nodeToObj(child);
    if (obj[key] !== undefined) {
      if (!Array.isArray(obj[key])) obj[key] = [obj[key]];
      obj[key].push(val);
    } else {
      obj[key] = val;
    }
  });
  return obj;
}

export function JsonXml() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"json-to-xml" | "xml-to-json">("json-to-xml");
  const [error, setError] = useState("");

  let output = "";
  if (input) {
    try {
      setError && (void 0);
      if (mode === "json-to-xml") {
        const parsed = JSON.parse(input);
        output = '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n' + jsonToXml(parsed, 1) + "</root>";
      } else {
        output = JSON.stringify(xmlToJson(input.trim()), null, 2);
      }
    } catch (e: any) {
      output = "";
      setError;
    }
  }

  return (
    <div>
      <ToolHeader title="JSON ↔ XML" description="Convert between JSON and XML formats" icon={FileCode} onClear={() => { setInput(""); setError(""); }} onCopy={() => navigator.clipboard.writeText(output)} />
      <div className="flex gap-2 mb-4">
        <Button variant={mode === "json-to-xml" ? "default" : "outline"} size="sm" onClick={() => { setMode("json-to-xml"); setInput(""); setError(""); }}>JSON → XML</Button>
        <Button variant={mode === "xml-to-json" ? "default" : "outline"} size="sm" onClick={() => { setMode("xml-to-json"); setInput(""); setError(""); }}>XML → JSON</Button>
      </div>
      <div className="split-view">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Input ({mode === "json-to-xml" ? "JSON" : "XML"})</label>
          <textarea className="tool-input min-h-[300px]" value={input} onChange={e => { setInput(e.target.value); setError(""); }} placeholder={mode === "json-to-xml" ? '{"key": "value"}' : "<root><key>value</key></root>"} spellCheck={false} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Output ({mode === "json-to-xml" ? "XML" : "JSON"})</label>
          <div className="tool-output min-h-[300px] whitespace-pre-wrap break-all font-mono text-xs">{error ? <span className="text-destructive">{error}</span> : output || "Output will appear here..."}</div>
        </div>
      </div>
    </div>
  );
}
