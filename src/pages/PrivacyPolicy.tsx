import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SITE_NAME, PRIVACY_CONTACT_EMAIL } from "@/lib/brand";
import { SITE_ORIGIN } from "@/lib/site";
import { useNoIndexMeta } from "@/hooks/useNoIndexMeta";
import { SiteFooter } from "@/components/SiteFooter";

const LAST_UPDATED = "April 9, 2026";

export default function PrivacyPolicy() {
  useNoIndexMeta(
    `Privacy Policy — ${SITE_NAME}`,
    `Privacy Policy for ${SITE_NAME} (${SITE_ORIGIN}). How we collect, use, and protect your information.`,
    "/privacy",
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
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        <article className="space-y-8 text-sm sm:text-[15px] leading-relaxed text-foreground">
          <section className="space-y-3">
            <p>
              This Privacy Policy describes how <strong>{SITE_NAME}</strong> (“we,” “us,” or “our”) collects, uses, and
              shares information when you visit <strong>{SITE_ORIGIN}</strong> (the “Site”) and use our online tools and
              related services (collectively, the “Services”). We are committed to protecting your privacy and being
              transparent about our practices.
            </p>
            <p className="text-muted-foreground">
              By using the Services, you agree to this Privacy Policy. If you do not agree, please do not use the Site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground pt-2">1. Information we collect</h2>
            <h3 className="text-base font-medium">1.1 Information you provide</h3>
            <p>
              Most of our tools run <strong>entirely in your web browser</strong> on your device. Text, files, or other
              content you enter into a tool is typically processed locally and is <strong>not uploaded to our servers</strong>{" "}
              for that processing. We do not require an account to use the Site.
            </p>
            <p>
              If you contact us (for example, by email), we will receive whatever information you choose to send, such as
              your email address and the contents of your message.
            </p>

            <h3 className="text-base font-medium pt-2">1.2 User-pasted content and our servers</h3>
            <p>
              <strong>We do not store user-pasted data on our servers.</strong> Content you enter into our tools—such as
              JSON, plain text, code snippets, formatted data, or files processed in the browser—is handled{" "}
              <strong>client-side</strong> (in your device’s browser) unless a specific tool clearly states otherwise.
              That means we do not persist your pasted JSON, text, or similar input on our servers for routine tool
              operation; processing happens locally on your device to keep the experience fast and private.
            </p>

            <h3 className="text-base font-medium pt-2">1.3 Information collected automatically</h3>
            <p>
              When you access the Site, certain information may be collected automatically, including:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Device and browser type, operating system, and language preferences</li>
              <li>Approximate location derived from IP address (e.g., country or region)</li>
              <li>Pages viewed, referring / exit pages, and the date and time of visits</li>
              <li>Internet Protocol (IP) address and similar network identifiers</li>
            </ul>
            <p>
              We use <strong>Google Analytics</strong> (Google LLC) to understand how visitors use the Site. Google may
              use cookies and similar technologies to collect and process this information. For more information, see{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:no-underline"
              >
                Google’s Privacy Policy
              </a>
              {" "}and{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:no-underline"
              >
                How Google uses information from sites or apps that use our services
              </a>
              .
            </p>

            <h3 className="text-base font-medium pt-2">1.4 Cookies and similar technologies</h3>
            <p>
              We and our partners may use cookies, local storage, pixels, and similar technologies to operate the Site,
              remember preferences, measure traffic, and—if enabled—support advertising. You can control cookies through
              your browser settings. Blocking certain cookies may affect how the Site functions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground pt-2">2. Advertising (including Google AdSense)</h2>
            <p>
              We may use <strong>Google AdSense</strong> or other advertising partners to display ads on the Site.
              Third-party ad providers may use cookies and similar technologies to show personalized ads based on your
              visits to this Site and other sites, and to measure ad performance.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>
                Google’s use of advertising cookies enables it and its partners to serve ads based on your visits to our
                Site and/or other sites on the Internet.
              </li>
              <li>
                You may opt out of personalized advertising by visiting{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 hover:no-underline"
                >
                  Google Ads Settings
                </a>
                {" "}(or, where applicable,{" "}
                <a
                  href="https://www.google.com/settings/ads/anonymous"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 hover:no-underline"
                >
                  Ads Settings for mobile apps
                </a>
                ).
              </li>
              <li>
                You can learn more about how Google uses data when you use our partners’ sites or apps at{" "}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 hover:no-underline"
                >
                  policies.google.com/technologies/partner-sites
                </a>
                .
              </li>
            </ul>
            <p className="text-muted-foreground">
              Where required by law, we will obtain consent before using non-essential cookies or serving personalized ads.
            </p>

            <h3 className="text-base font-medium pt-4">Google AdSense and DoubleClick Cookies</h3>
            <p>
              Google, as a third-party vendor, uses cookies to serve ads on our Site. Google’s use of the{" "}
              <strong>DART cookie</strong> enables it and its partners to serve ads to users based on visits to our Site
              and/or other sites on the Internet. Users may opt out of the use of the DART cookie for interest-based
              advertising by visiting Google’s Ads Settings (linked above) and by reviewing{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:no-underline"
              >
                Google’s Advertising Policies &amp; Technologies
              </a>
              .
            </p>
            <p>
              <strong>DoubleClick:</strong> Google may use DoubleClick and related technologies to manage ad delivery and
              measurement. These technologies may set or read cookies (including third-party cookies) to record information
              such as whether a particular browser has been shown an ad, to cap how often you see an ad, and to measure
              engagement. We do not control these cookies directly; you can manage preferences through Google’s tools and
              your browser settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground pt-2">3. How we use information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Provide, maintain, and improve the Services</li>
              <li>Understand usage patterns and improve performance and user experience</li>
              <li>Detect, prevent, and address technical issues, fraud, or abuse</li>
              <li>Comply with legal obligations and enforce our terms</li>
              <li>Communicate with you if you contact us</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground pt-2">4. Legal bases (EEA, UK, Switzerland)</h2>
            <p>
              If you are in the European Economic Area, the United Kingdom, or Switzerland, we process personal data
              where we have a legal basis, including: your <strong>consent</strong> (where required); performance of a
              contract or steps at your request; <strong>legitimate interests</strong> (such as analytics, security, and
              improving the Site), balanced against your rights; and <strong>compliance with legal obligations</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground pt-2">5. Sharing of information</h2>
            <p>
              We may share information with service providers who assist us (such as hosting, analytics, and advertising
              partners), where they process data on our instructions and subject to appropriate safeguards. We may also
              disclose information if required by law, to protect rights and safety, or in connection with a business
              transfer (such as a merger or acquisition).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground pt-2">6. Data retention</h2>
            <p>
              We retain information only as long as necessary for the purposes described in this Policy, unless a longer
              period is required or permitted by law. Analytics and advertising data may be retained according to the
              policies of Google and other partners.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground pt-2">7. Security</h2>
            <p>
              We implement reasonable technical and organizational measures designed to protect information. However, no
              method of transmission over the Internet or electronic storage is completely secure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground pt-2">8. Children’s privacy</h2>
            <p>
              The Services are not directed to children under 13 (or the age required in your jurisdiction). We do not
              knowingly collect personal information from children. If you believe we have collected such information,
              please contact us and we will take steps to delete it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground pt-2">9. Your privacy rights</h2>
            <p>
              Depending on where you live, you may have rights to access, correct, delete, or port your personal data;
              object to or restrict certain processing; withdraw consent where processing is based on consent; and lodge a
              complaint with a supervisory authority.
            </p>
            <p>
              <strong>California (CCPA/CPRA):</strong> California residents may have additional rights, including to know
              what personal information we collect, to delete certain information, to opt out of “sale” or “sharing” of
              personal information for cross-context behavioral advertising, and to non-discrimination for exercising
              rights. We do not sell personal information for money. To exercise rights, contact us using the details
              below.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground pt-2">10. International transfers</h2>
            <p>
              If you access the Site from outside the country where our servers or partners operate, your information may
              be transferred to and processed in countries that may have different data protection laws. Where required,
              we use appropriate safeguards (such as standard contractual clauses).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground pt-2">11. Third-party links and fonts</h2>
            <p>
              The Site may load resources from third parties (for example, fonts from Google Fonts). Those providers have
              their own privacy practices. We encourage you to read their policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground pt-2">12. Changes to this Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will post the revised version on this page and update
              the “Last updated” date. Continued use of the Services after changes constitutes acceptance of the updated
              Policy, where permitted by law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground pt-2">13. Contact us</h2>
            <p>
              For questions about this Privacy Policy or our data practices, contact us at:
            </p>
            <p>
              <a
                href={`mailto:${PRIVACY_CONTACT_EMAIL}`}
                className="text-primary font-medium underline underline-offset-2 hover:no-underline"
              >
                {PRIVACY_CONTACT_EMAIL}
              </a>
            </p>
            <p className="text-muted-foreground text-xs sm:text-sm">
              This policy is provided for general information and does not constitute legal advice. You may wish to have a
              qualified attorney review it for your specific situation, especially for AdSense approval and regional
              compliance.
            </p>
          </section>
        </article>
      </div>
      <SiteFooter />
    </div>
  );
}
