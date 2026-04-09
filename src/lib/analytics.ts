export const GA_MEASUREMENT_ID = "G-3HZPGD8VF6";

type GtagFn = (...args: any[]) => void;

function getGtag(): GtagFn | undefined {
  return typeof window !== "undefined" ? (window as any).gtag : undefined;
}

export function trackPageView(path: string) {
  if (!import.meta.env.PROD) return;
  const gtag = getGtag();
  if (!gtag) return;

  gtag("config", GA_MEASUREMENT_ID, {
    page_path: path,
  });
}

