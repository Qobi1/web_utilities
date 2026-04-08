import { Copy, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Props {
  title: string;
  description: string;
  onClear?: () => void;
  onCopy?: () => void;
  icon?: any;
}

export function ToolHeader({ title, description, onClear, onCopy, icon: Icon }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy?.();
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="tool-header">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />}
        <div>
          <h1 className="text-lg font-semibold">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="tool-actions">
        {onCopy && (
          <Button variant="outline" size="sm" onClick={handleCopy} aria-label="Copy output to clipboard" className="min-h-[36px] min-w-[36px]">
            {copied ? <Check className="h-3.5 w-3.5 mr-1" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5 mr-1" aria-hidden="true" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        )}
        {onClear && (
          <Button variant="outline" size="sm" onClick={onClear} aria-label="Clear input" className="min-h-[36px] min-w-[36px]">
            <Trash2 className="h-3.5 w-3.5 mr-1" aria-hidden="true" /> Clear
          </Button>
        )}
      </div>
    </div>
  );
}
