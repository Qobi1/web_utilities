import { useState, useRef } from "react";
import { ToolHeader } from "@/components/ToolHeader";
import { Binary, Upload } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export function Base64Tool() {
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [imageBase64, setImageBase64] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleText = (val: string) => {
    setTextInput(val);
    try {
      setTextOutput(mode === "encode" ? btoa(val) : atob(val));
    } catch {
      setTextOutput("Invalid input");
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageBase64(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <ToolHeader
        title="Base64 Encoder"
        description="Encode/decode text and images to Base64"
        icon={Binary}
        onClear={() => { setTextInput(""); setTextOutput(""); setImageBase64(""); }}
        onCopy={() => navigator.clipboard.writeText(textOutput || imageBase64)}
      />
      <Tabs defaultValue="text">
        <TabsList>
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="image">Image</TabsTrigger>
        </TabsList>
        <TabsContent value="text">
          <div className="flex gap-2 mb-4">
            <Button variant={mode === "encode" ? "default" : "outline"} size="sm" onClick={() => { setMode("encode"); setTextInput(""); setTextOutput(""); }}>Encode</Button>
            <Button variant={mode === "decode" ? "default" : "outline"} size="sm" onClick={() => { setMode("decode"); setTextInput(""); setTextOutput(""); }}>Decode</Button>
          </div>
          <div className="split-view">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Input</label>
              <textarea className="tool-input min-h-[300px]" value={textInput} onChange={e => handleText(e.target.value)} placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."} spellCheck={false} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Output</label>
              <div className="tool-output min-h-[300px] whitespace-pre-wrap break-all">{textOutput || "Output will appear here..."}</div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="image">
          <div className="space-y-4">
            <div className="tool-panel p-8 flex flex-col items-center gap-4 border-dashed cursor-pointer" onClick={() => fileRef.current?.click()}>
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Click to upload an image</p>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
            </div>
            {imageBase64 && (
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Base64 Output</label>
                <div className="tool-output max-h-[200px] overflow-auto break-all text-xs">{imageBase64}</div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
