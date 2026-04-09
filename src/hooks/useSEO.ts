import { useEffect } from "react";
import { Tool } from "@/lib/tools";
import { SITE_ORIGIN } from "@/lib/site";
import { SITE_NAME } from "@/lib/brand";

export function useSEO(tool: Tool | undefined) {
  useEffect(() => {
    if (!tool) return;

    document.title = tool.metaTitle;

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

    const origin = window.location.origin || SITE_ORIGIN;
    const ogImage = `${origin}/og-image.png`;

    setMeta("description", tool.metaDescription);
    setMeta("keywords", tool.keywords);
    setMeta("robots", "index, follow");
    setMeta("og:title", tool.metaTitle, true);
    setMeta("og:description", tool.metaDescription, true);
    setMeta("og:type", "website", true);
    setMeta("og:url", origin + tool.path, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:image:alt", `${tool.name} — ${SITE_NAME}`, true);
    setMeta("og:site_name", SITE_NAME, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", tool.metaTitle);
    setMeta("twitter:description", tool.metaDescription);
    setMeta("twitter:image", ogImage);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.origin + tool.path;

    // JSON-LD
    let ld = document.getElementById("jsonld-tool");
    if (!ld) {
      ld = document.createElement("script");
      ld.id = "jsonld-tool";
      ld.setAttribute("type", "application/ld+json");
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: tool.name,
      description: tool.metaDescription,
      url: window.location.origin + tool.path,
      applicationCategory: "WebApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    });
  }, [tool]);
}