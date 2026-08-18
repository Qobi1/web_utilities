import { Link } from "react-router-dom";

const linkClass =
  "text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline";

export function SiteFooter() {
  return (
    <footer
      className="shrink-0 w-full border-t border-border bg-background/80 backdrop-blur-sm"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <Link to="/privacy" className={linkClass}>
          Privacy Policy
        </Link>
        <span className="text-border hidden sm:inline" aria-hidden="true">
          |
        </span>
        <Link to="/about" className={linkClass}>
          About Us
        </Link>
        <span className="text-border hidden sm:inline" aria-hidden="true">
          |
        </span>
        <Link to="/contact" className={linkClass}>
          Contact Us
        </Link>
      </div>
    </footer>
  );
}
