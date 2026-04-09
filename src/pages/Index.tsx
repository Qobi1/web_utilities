import { useEffect } from "react";
import { Link } from "react-router-dom";
import { tools } from "@/lib/tools";
import { ArrowRight } from "lucide-react";
import { SITE_ORIGIN } from "@/lib/site";
import { SITE_NAME } from "@/lib/brand";

export default function Index() {
  useEffect(() => {
    document.title = `${SITE_NAME} — Free Online Tools`;
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    const origin = typeof window !== "undefined" ? window.location.origin : SITE_ORIGIN;
    const ogImage = `${origin}/og-image.png`;
    setMeta("description", "Free online tools — text, encoding, JSON, diff, passwords, and more. All client-side, fast & private.");
    setMeta("keywords", "online tools, free utilities, json formatter, base64 encoder, text tools, diff checker, case converter, cron parser, password generator, free tools");
    setMeta("robots", "index, follow");
    setMeta("og:title", `${SITE_NAME} — Free Online Tools`, true);
    setMeta("og:description", "Free online tools — text, encoding, JSON, and more. All client-side, fast & private.", true);
    setMeta("og:url", `${origin}/`, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:image:alt", `${SITE_NAME} — free online tools`, true);
    setMeta("twitter:image", ogImage);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${origin}/`;
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="flex justify-center mb-6">
          <img
            src="/logo.svg"
            alt={SITE_NAME}
            width={210}
            height={40}
            className="h-9 sm:h-10 w-auto"
            decoding="async"
          />
        </div>
        <div className="inline-flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground mb-6">
          100% Client-Side · Fast · Private
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Your online utility hub
        </h1>
        <p className="text-lg text-muted-foreground">
          Free, fast, privacy-first tools for text, files, and everyday tasks. Nothing leaves your browser.
        </p>
      </div>
      <nav aria-label="All tools" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-4xl">
        {tools.map(tool => (
          <Link
            key={tool.id}
            to={tool.path}
            className="tool-panel p-5 text-left hover:bg-accent/50 transition-colors group block min-h-[88px]"
          >
            <div className="flex items-start justify-between mb-3">
              <tool.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" aria-hidden="true" />
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
            </div>
            <h2 className="font-semibold text-sm mb-1">{tool.name}</h2>
            <p className="text-xs text-muted-foreground">{tool.description}</p>
          </Link>
        ))}
      </nav>
    </div>
  );
}
