import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { tools } from "@/lib/tools";

export function CommandPalette({ onSelect }: { onSelect: (toolId: string) => void }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(o => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search tools..." />
      <CommandList>
        <CommandEmpty>No tools found.</CommandEmpty>
        <CommandGroup heading="Tools">
          {tools.map(tool => (
            <CommandItem
              key={tool.id}
              value={tool.name}
              onSelect={() => { navigate(tool.path); setOpen(false); }}
              className="min-h-[44px]"
            >
              <tool.icon className="mr-2 h-4 w-4" aria-hidden="true" />
              <div>
                <div className="font-medium">{tool.name}</div>
                <div className="text-xs text-muted-foreground">{tool.description}</div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
