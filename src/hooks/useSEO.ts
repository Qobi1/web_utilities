import { useEffect } from "react";
import { Tool } from "@/lib/tools";
import { SITE_ORIGIN } from "@/lib/site";
import { SITE_NAME } from "@/lib/brand";

/**
 * Injects all per-tool SEO signals into <head>:
 * - <title> and meta description / keywords
 * - Open Graph + Twitter Card
 * - <link rel="canonical"> pinned to SITE_ORIGIN (www)
 * - WebApplication JSON-LD structured data
 *
 * Uses SITE_ORIGIN exclusively (never window.location.origin) so
 * canonicals always point to the www primary domain regardless of
 * which origin the browser is actually on.
 */
export function useSEO(tool: Tool | undefined) {
  useEffect(() => {
    if (!tool) return;

    document.title = tool.metaTitle;

    /** Upsert a <meta> tag by name or property attribute. */
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

    // Always canonical to the www primary domain — no trailing slash on sub-pages.
    const canonicalUrl = `${SITE_ORIGIN}${tool.path}`;
    const ogImage = `${SITE_ORIGIN}/og-image.png`;

    setMeta("description", tool.metaDescription);
    setMeta("keywords", tool.keywords);
    setMeta("robots", "index, follow");

    setMeta("og:type", "website", true);
    setMeta("og:title", tool.metaTitle, true);
    setMeta("og:description", tool.metaDescription, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:image:width", "1200", true);
    setMeta("og:image:height", "630", true);
    setMeta("og:image:alt", `${tool.name} — ${SITE_NAME}`, true);
    setMeta("og:site_name", SITE_NAME, true);
    setMeta("og:locale", "en_US", true);

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", tool.metaTitle);
    setMeta("twitter:description", tool.metaDescription);
    setMeta("twitter:image", ogImage);
    setMeta("twitter:image:alt", `${tool.name} — ${SITE_NAME}`);

    // Canonical — upsert single element, pinned to www.
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // Per-tool WebApplication JSON-LD structured data.
    let ld = document.getElementById("jsonld-tool") as HTMLScriptElement | null;
    if (!ld) {
      ld = document.createElement("script");
      ld.id = "jsonld-tool";
      ld.setAttribute("type", "application/ld+json");
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: tool.name,
      description: tool.metaDescription,
      url: canonicalUrl,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      inLanguage: "en-US",
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      provider: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_ORIGIN,
      },
    });

    // Cleanup: remove the per-tool JSON-LD when navigating away
    // (e.g. back to the homepage which has its own static WebSite schema).
    return () => {
      document.getElementById("jsonld-tool")?.remove();
    };
  }, [tool]);
}
