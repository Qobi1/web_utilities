import { useEffect } from "react";
import { Link } from "react-router-dom";
import { tools } from "@/lib/tools";
import { ArrowRight } from "lucide-react";
import { SITE_ORIGIN } from "@/lib/site";
import { SITE_NAME } from "@/lib/brand";
import { SiteFooter } from "@/components/SiteFooter";

export default function Index() {
  useEffect(() => {
    const title = `${SITE_NAME} — Free Online Developer Tools`;
    const desc =
      "Free online tools for developers and everyday users — JSON formatter, Base64 encoder, diff checker, regex tester, password generator, and 25+ more. 100% client-side, fast & private.";
    const ogImage = `${SITE_ORIGIN}/og-image.png`;
    const canonicalUrl = `${SITE_ORIGIN}/`;

    document.title = title;

    /** Upsert a <meta> tag. */
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", desc);
    setMeta(
      "keywords",
      "online tools, free developer tools, json formatter, base64 encoder, diff checker, regex tester, case converter, cron parser, password generator, url encoder, jwt decoder, text tools, free utilities"
    );
    setMeta("robots", "index, follow");

    setMeta("og:type", "website", true);
    setMeta("og:title", title, true);
    setMeta("og:description", desc, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:image:width", "1200", true);
    setMeta("og:image:height", "630", true);
    setMeta("og:image:alt", `${SITE_NAME} — free online developer tools`, true);
    setMeta("og:site_name", SITE_NAME, true);
    setMeta("og:locale", "en_US", true);

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", desc);
    setMeta("twitter:image", ogImage);
    setMeta("twitter:image:alt", `${SITE_NAME} — free online developer tools`);

    // Canonical — always www, trailing slash on homepage only.
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-6 pb-10">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl">
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
            Free, fast, privacy-first tools for text, files, and everyday
            tasks. Nothing leaves your browser.
          </p>
        </div>
        <nav
          aria-label="All tools"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-4xl mb-12"
        >
          {tools.map((tool) => (
            <Link
              key={tool.id}
              to={tool.path}
              className="tool-panel p-5 text-left hover:bg-accent/50 transition-colors group block min-h-[88px]"
            >
              <div className="flex items-start justify-between mb-3">
                <tool.icon
                  className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors"
                  aria-hidden="true"
                />
                <ArrowRight
                  className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
              </div>
              <h2 className="font-semibold text-sm mb-1">{tool.name}</h2>
              <p className="text-xs text-muted-foreground">
                {tool.description}
              </p>
            </Link>
          ))}
        </nav>
      </div>
      <div className="shrink-0 w-full max-w-4xl">
        <SiteFooter />
      </div>
    </div>
  );
}
