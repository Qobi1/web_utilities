import { useState, useCallback, useEffect } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { Shield, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

function generatePassword(length: number, useSymbols: boolean, useNumbers: boolean, useUppercase: boolean): string {
  let chars = "abcdefghijklmnopqrstuvwxyz";
  if (useUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (useNumbers) chars += "0123456789";
  if (useSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, x => chars[x % chars.length]).join("");
}

function getStrength(pw: string): { score: number; label: string; cls: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (pw.length >= 16) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;
  if (score <= 2) return { score: 25, label: "Weak", cls: "strength-weak" };
  if (score <= 3) return { score: 50, label: "Fair", cls: "strength-fair" };
  if (score <= 4) return { score: 75, label: "Good", cls: "strength-good" };
  return { score: 100, label: "Strong", cls: "strength-strong" };
}

export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [symbols, setSymbols] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [uppercase, setUppercase] = useState(true);
  const [password, setPassword] = useState("");

  const generate = useCallback(() => {
    setPassword(generatePassword(length, symbols, numbers, uppercase));
  }, [length, symbols, numbers, uppercase]);

  useEffect(() => { generate(); }, [generate]);

  const strength = getStrength(password);

  return (
    <div>
      <ToolHeader
        title="Password Generator"
        description="Generate secure passwords with strength meter"
        icon={Shield}
        onCopy={() => navigator.clipboard.writeText(password)}
        onClear={() => setPassword("")}
      />
      <div className="tool-panel p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 font-mono text-xl tracking-wider bg-muted rounded-md p-4 break-all select-all">{password}</div>
          <Button variant="outline" size="icon" onClick={generate}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        {/* Strength meter */}
        <div className="mb-6">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Strength</span>
            <span className="font-medium">{strength.label}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${strength.cls}`} style={{ width: `${strength.score}%` }} />
          </div>
        </div>

        {/* Options */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <Label>Length</Label>
              <span className="font-mono text-muted-foreground">{length}</span>
            </div>
            <Slider value={[length]} onValueChange={v => setLength(v[0])} min={6} max={64} step={1} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Switch checked={uppercase} onCheckedChange={setUppercase} />
              <Label className="text-sm">Uppercase</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={numbers} onCheckedChange={setNumbers} />
              <Label className="text-sm">Numbers</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={symbols} onCheckedChange={setSymbols} />
              <Label className="text-sm">Symbols</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
