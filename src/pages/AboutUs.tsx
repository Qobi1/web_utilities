import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SITE_NAME } from "@/lib/brand";
import { useNoIndexMeta } from "@/hooks/useNoIndexMeta";
import { SiteFooter } from "@/components/SiteFooter";

export default function AboutUs() {
  useNoIndexMeta(
    `About Us — ${SITE_NAME}`,
    `Learn about ${SITE_NAME} — fast, no-bloat utility tools for developers.`,
    "/about",
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-3xl mx-auto px-4 py-10 sm:py-14 flex-1 w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">About Us</h1>
          <p className="text-sm text-muted-foreground">What {SITE_NAME} is and why we built it</p>
        </header>

        <article className="space-y-6 text-sm sm:text-[15px] leading-relaxed text-foreground">
          <p>
            <strong>{SITE_NAME}</strong> is a platform built by a developer, for developers. We focus on one thing:
            giving you <strong>fast, no-bloat, and secure</strong> utility tools that work in your browser—without unnecessary
            clutter, sign-ups, or friction.
          </p>
          <p>
            Whether you are formatting JSON, testing regex, encoding data, or handling everyday text tasks, our tools are
            designed to stay <strong>responsive and straightforward</strong>. Where possible, processing happens{" "}
            <strong>on your device</strong>, so your input stays under your control and the experience stays snappy.
          </p>
          <p>
            We believe developer utilities should feel <strong>lightweight and trustworthy</strong>: clear UI, sensible
            defaults, and respect for your time. That is the standard we apply as we grow the catalog.
          </p>
          <p className="text-muted-foreground">
            Thank you for using {SITE_NAME}. If you have feedback or ideas, we would love to hear from you via{" "}
            <Link to="/contact" className="text-primary underline underline-offset-2 hover:no-underline">
              Contact Us
            </Link>
            .
          </p>
        </article>
      </div>
      <SiteFooter />
    </div>
  );
}
