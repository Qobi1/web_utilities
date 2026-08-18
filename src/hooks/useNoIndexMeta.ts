import { useEffect } from "react";
import { SITE_ORIGIN } from "@/lib/site";

/**
 * Sets document title, optional description & canonical, and
 * `<meta name="robots" content="noindex">` for legal/info pages.
 * Resets robots to `index, follow` on unmount so other routes behave normally.
 */
export function useNoIndexMeta(pageTitle: string, description?: string, canonicalPath?: string) {
  useEffect(() => {
    document.title = pageTitle;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("robots", "noindex");
    if (description) {
      setMeta("description", description);
    }

    if (canonicalPath) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = `${SITE_ORIGIN}${canonicalPath}`;
    }

    return () => {
      setMeta("robots", "index, follow");
    };
  }, [pageTitle, description, canonicalPath]);
}
