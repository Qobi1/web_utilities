import { useState } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { Clock } from "lucide-react";

function parseCron(expr: string): string {
  const parts = expr.trim().split(/\s+/);
  if (parts.length < 5 || parts.length > 6) return "Invalid cron expression (expected 5 or 6 fields)";

  const [min, hour, dom, month, dow] = parts;

  const descParts: string[] = [];

  // Minutes
  if (min === "*") descParts.push("Every minute");
  else if (min.startsWith("*/")) descParts.push(`Every ${min.slice(2)} minutes`);
  else descParts.push(`At minute ${min}`);

  // Hours
  if (hour === "*") descParts.push("of every hour");
  else if (hour.startsWith("*/")) descParts.push(`every ${hour.slice(2)} hours`);
  else {
    const h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    descParts.push(`past ${h12}:${min.padStart(2, "0")} ${ampm}`);
  }

  // Day of month
  if (dom !== "*") descParts.push(`on day ${dom} of the month`);

  // Month
  const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  if (month !== "*") {
    const m = parseInt(month);
    descParts.push(`in ${months[m] || month}`);
  }

  // Day of week
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  if (dow !== "*") {
    const d = parseInt(dow);
    descParts.push(`on ${days[d] || dow}`);
  }

  return descParts.join(" ");
}

const examples = [
  { expr: "*/5 * * * *", label: "Every 5 minutes" },
  { expr: "0 9 * * 1-5", label: "Weekdays at 9 AM" },
  { expr: "0 0 1 * *", label: "First of every month" },
  { expr: "30 14 * * 0", label: "Sundays at 2:30 PM" },
];

export function CronParser() {
  const [input, setInput] = useState("");

  return (
    <div>
      <ToolHeader
        title="Cron Parser"
        description="Convert cron expressions to human-readable English"
        icon={Clock}
        onClear={() => setInput("")}
      />
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-2 block">Cron Expression</label>
        <input
          className="tool-input font-mono text-lg tracking-wider"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="* * * * *"
        />
      </div>
      {input.trim() && (
        <div className="tool-panel p-4 mt-4">
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Human-Readable</label>
          <p className="text-lg font-medium">{parseCron(input)}</p>
          <div className="mt-3 grid grid-cols-5 gap-2 text-center">
            {["Minute", "Hour", "Day (Month)", "Month", "Day (Week)"].map((label, i) => (
              <div key={label} className="text-xs">
                <div className="font-mono text-base bg-muted rounded p-2">{input.trim().split(/\s+/)[i] || "-"}</div>
                <div className="text-muted-foreground mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mt-4">
        <label className="text-xs font-medium text-muted-foreground mb-2 block">Examples</label>
        <div className="grid grid-cols-2 gap-2">
          {examples.map(ex => (
            <button key={ex.expr} onClick={() => setInput(ex.expr)} className="tool-panel p-3 text-left hover:bg-accent/50 transition-colors">
              <div className="font-mono text-sm">{ex.expr}</div>
              <div className="text-xs text-muted-foreground mt-1">{ex.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
