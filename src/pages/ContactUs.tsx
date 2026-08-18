import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import { SITE_NAME, SUPPORT_EMAIL } from "@/lib/brand";
import { useNoIndexMeta } from "@/hooks/useNoIndexMeta";
import { SiteFooter } from "@/components/SiteFooter";

export default function ContactUs() {
  useNoIndexMeta(
    `Contact Us — ${SITE_NAME}`,
    `Contact ${SITE_NAME} for support and general inquiries.`,
    "/contact",
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
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Contact Us</h1>
          <p className="text-sm text-muted-foreground">We will get back to you as soon as we can</p>
        </header>

        <div className="rounded-lg border border-border bg-card/50 p-6 sm:p-8">
          <p className="text-sm sm:text-[15px] leading-relaxed text-muted-foreground mb-6">
            For support, feedback, or general questions about <strong className="text-foreground">{SITE_NAME}</strong>,
            please email us at:
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="inline-flex items-center gap-2 text-base font-medium text-primary hover:underline"
          >
            <Mail className="h-5 w-5 shrink-0" aria-hidden="true" />
            {SUPPORT_EMAIL}
          </a>
          <p className="mt-6 text-xs text-muted-foreground">
            We do not offer phone support. For privacy-related requests, see our{" "}
            <Link to="/privacy" className="text-primary underline underline-offset-2 hover:no-underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
