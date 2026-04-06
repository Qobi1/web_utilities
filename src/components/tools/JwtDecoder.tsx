import { useState } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { KeyRound } from "lucide-react";

function decodeBase64Url(str: string) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  return atob(str);
}

export function JwtDecoder() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  let header = "", payload = "", signature = "";
  if (input.trim()) {
    try {
      const parts = input.trim().split(".");
      if (parts.length !== 3) throw new Error("Invalid JWT: expected 3 parts");
      header = JSON.stringify(JSON.parse(decodeBase64Url(parts[0])), null, 2);
      payload = JSON.stringify(JSON.parse(decodeBase64Url(parts[1])), null, 2);
      signature = parts[2];
      setError && error && setError("");
    } catch (e: any) {
      if (!error) setError(e.message);
    }
  }

  return (
    <div>
      <ToolHeader
        title="JWT Decoder"
        description="Decode and inspect JWT tokens"
        icon={KeyRound}
        onClear={() => { setInput(""); setError(""); }}
        onCopy={() => navigator.clipboard.writeText(`Header:\n${header}\n\nPayload:\n${payload}\n\nSignature:\n${signature}`)}
      />
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-2 block">JWT Token</label>
        <textarea className="tool-input min-h-[100px]" value={input} onChange={e => { setInput(e.target.value); setError(""); }} placeholder="Paste JWT token here..." spellCheck={false} />
        {error && <p className="text-destructive text-xs mt-2">{error}</p>}
      </div>
      {header && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          <div className="tool-panel p-4">
            <label className="text-xs font-medium text-info mb-2 block">Header</label>
            <pre className="tool-output text-xs whitespace-pre-wrap">{header}</pre>
          </div>
          <div className="tool-panel p-4">
            <label className="text-xs font-medium text-success mb-2 block">Payload</label>
            <pre className="tool-output text-xs whitespace-pre-wrap">{payload}</pre>
          </div>
          <div className="tool-panel p-4">
            <label className="text-xs font-medium text-destructive mb-2 block">Signature</label>
            <pre className="tool-output text-xs whitespace-pre-wrap break-all">{signature}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
