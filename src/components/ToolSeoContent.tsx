import { Tool } from "@/lib/tools";

interface Props {
  tool: Tool;
}

/**
 * Renders static, crawlable HTML content below every tool's interactive UI.
 *
 * Purpose: give search engine crawlers meaningful text on each tool route —
 * addressing "Crawled - currently not indexed" and "thin content" signals.
 * The section includes:
 *  - A brief "How it works" paragraph
 *  - Key features list
 *  - FAQ (also provides FAQ structured data candidates)
 *
 * Visually it is subdued (muted colours, lower visual weight) so it does not
 * compete with the interactive tool above it.
 */
export function ToolSeoContent({ tool }: Props) {
  return (
    <aside
      aria-label={`About ${tool.name}`}
      className="mt-12 border-t border-border pt-8 space-y-8 text-sm text-muted-foreground max-w-3xl"
    >
      {/* How it works */}
      <section aria-labelledby={`how-it-works-${tool.id}`}>
        <h2
          id={`how-it-works-${tool.id}`}
          className="text-base font-semibold text-foreground mb-2"
        >
          How it works
        </h2>
        <p className="leading-relaxed">{tool.howItWorks}</p>
      </section>

      {/* Key features */}
      <section aria-labelledby={`features-${tool.id}`}>
        <h2
          id={`features-${tool.id}`}
          className="text-base font-semibold text-foreground mb-2"
        >
          Key features
        </h2>
        <ul className="space-y-1.5 list-disc list-inside">
          {tool.features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section aria-labelledby={`faq-${tool.id}`}>
        <h2
          id={`faq-${tool.id}`}
          className="text-base font-semibold text-foreground mb-3"
        >
          Frequently asked questions
        </h2>
        <dl className="space-y-4">
          {tool.faq.map((item, i) => (
            <div key={i}>
              <dt className="font-medium text-foreground">{item.q}</dt>
              <dd className="mt-1 leading-relaxed">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </aside>
  );
}
