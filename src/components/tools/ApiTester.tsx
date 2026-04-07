import { useState } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export function ApiTester() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState<Method>("GET");
  const [headers, setHeaders] = useState('{"Content-Type": "application/json"}');
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(0);

  const send = async () => {
    if (!url) return;
    setLoading(true);
    setResponse("");
    setStatus(null);
    const start = performance.now();
    try {
      let hdrs: Record<string, string> = {};
      try { hdrs = JSON.parse(headers); } catch {}
      const opts: RequestInit = { method, headers: hdrs };
      if (method !== "GET" && body) opts.body = body;
      const res = await fetch(url, opts);
      setStatus(res.status);
      const text = await res.text();
      try { setResponse(JSON.stringify(JSON.parse(text), null, 2)); } catch { setResponse(text); }
    } catch (e: any) {
      setResponse("Error: " + e.message + "\n\nNote: CORS restrictions may prevent requests to some APIs from the browser.");
    }
    setTime(Math.round(performance.now() - start));
    setLoading(false);
  };

  return (
    <div>
      <ToolHeader title="API Request Tester" description="Send HTTP requests and inspect responses" icon={Send} onClear={() => { setUrl(""); setBody(""); setResponse(""); setStatus(null); }} onCopy={() => navigator.clipboard.writeText(response)} />
      <div className="flex gap-2 mb-4 flex-wrap">
        {(["GET", "POST", "PUT", "DELETE", "PATCH"] as Method[]).map(m => (
          <Button key={m} variant={method === m ? "default" : "outline"} size="sm" onClick={() => setMethod(m)}>{m}</Button>
        ))}
      </div>
      <div className="flex gap-2 mb-4">
        <Input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://api.example.com/data" className="flex-1 font-mono text-sm" />
        <Button onClick={send} disabled={loading || !url}>{loading ? "Sending..." : "Send"}</Button>
      </div>
      <div className="split-view">
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Headers (JSON)</label>
            <textarea className="tool-input min-h-[100px] font-mono text-xs" value={headers} onChange={e => setHeaders(e.target.value)} spellCheck={false} />
          </div>
          {method !== "GET" && (
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Body</label>
              <textarea className="tool-input min-h-[150px] font-mono text-xs" value={body} onChange={e => setBody(e.target.value)} placeholder='{"key": "value"}' spellCheck={false} />
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <label className="text-xs font-medium text-muted-foreground">Response</label>
            {status !== null && (
              <>
                <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${status < 400 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>{status}</span>
                <span className="text-xs text-muted-foreground">{time}ms</span>
              </>
            )}
          </div>
          <div className="tool-output min-h-[280px] whitespace-pre-wrap font-mono text-xs break-all">{response || "Response will appear here..."}</div>
        </div>
      </div>
    </div>
  );
}
