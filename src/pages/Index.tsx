import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tools } from "@/lib/tools";
import { Wrench, ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

export default function Index() {
  const navigate = useNavigate();

  // Set home page SEO
  useEffect(() => {
    document.title = "DevUtils — Free Online Developer Tools";
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "Free online developer tools — JSON formatter, diff checker, JWT decoder, Base64 encoder, case converter, cron parser, password generator. All client-side, fast & private.");
    setMeta("keywords", "developer tools, online dev tools, json formatter, base64 encoder, jwt decoder, diff checker, case converter, cron parser, password generator, free developer utilities");
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground mb-6">
          <Wrench className="h-3.5 w-3.5" />
          100% Client-Side · Fast · Private
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Developer Utility Hub
        </h1>
        <p className="text-lg text-muted-foreground">
          Free, fast, privacy-first developer tools. No data leaves your browser.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-4xl">
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => navigate(tool.path)}
            className="tool-panel p-5 text-left hover:bg-accent/50 transition-colors group"
          >
            <div className="flex items-start justify-between mb-3">
              <tool.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h2 className="font-semibold text-sm mb-1">{tool.name}</h2>
            <p className="text-xs text-muted-foreground">{tool.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
