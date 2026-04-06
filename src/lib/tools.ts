import {
  Braces, Binary, Type, Shield, Clock, FileCode, KeyRound, CaseSensitive,
} from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  path: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
}

export const tools: Tool[] = [
  {
    id: "json-formatter", name: "JSON Formatter", description: "Format & validate JSON with syntax highlighting",
    category: "JSON", icon: Braces, path: "/json-formatter",
    metaTitle: "Free Online JSON Formatter & Validator — DevUtils",
    metaDescription: "Format, beautify, minify, and validate JSON data online. Syntax highlighting, tree view, error detection. 100% client-side, fast & private.",
    keywords: "json formatter, json validator, json beautifier, json minifier, json parser, pretty print json, format json online free",
  },
  {
    id: "diff-checker", name: "Diff Checker", description: "Compare two texts side-by-side",
    category: "Text", icon: FileCode, path: "/diff-checker",
    metaTitle: "Free Online Diff Checker — Compare Text Side by Side — DevUtils",
    metaDescription: "Compare two blocks of text and instantly see additions, deletions, and changes highlighted. Fast, private, no upload required.",
    keywords: "diff checker, text compare, compare two texts, online diff tool, text diff, code diff, side by side comparison",
  },
  {
    id: "jwt-decoder", name: "JWT Decoder", description: "Decode and inspect JWT tokens",
    category: "Encoders", icon: KeyRound, path: "/jwt-decoder",
    metaTitle: "Free Online JWT Decoder — Decode JSON Web Tokens — DevUtils",
    metaDescription: "Decode JWT tokens into header, payload, and signature. Inspect claims, expiry, and algorithm. No data sent to servers.",
    keywords: "jwt decoder, jwt parser, decode jwt token, json web token decoder, jwt inspector, jwt debugger",
  },
  {
    id: "base64", name: "Base64 Encoder", description: "Encode/decode text and images to Base64",
    category: "Encoders", icon: Binary, path: "/base64",
    metaTitle: "Free Online Base64 Encoder & Decoder — DevUtils",
    metaDescription: "Encode and decode text or images to Base64 format instantly. Supports file upload, text conversion, and image-to-base64. Client-side only.",
    keywords: "base64 encoder, base64 decoder, base64 converter, image to base64, text to base64, encode base64 online",
  },
  {
    id: "case-converter", name: "Case Converter", description: "Transform text between cases",
    category: "Text", icon: CaseSensitive, path: "/case-converter",
    metaTitle: "Free Online Case Converter — camelCase, snake_case & More — DevUtils",
    metaDescription: "Convert text to camelCase, PascalCase, snake_case, kebab-case instantly. Perfect for variable naming in any programming language.",
    keywords: "case converter, camelcase converter, snake case, kebab case, pascal case, text case converter, variable name converter",
  },
  {
    id: "cron-parser", name: "Cron Parser", description: "Convert cron expressions to English",
    category: "Generators", icon: Clock, path: "/cron-parser",
    metaTitle: "Free Online Cron Expression Parser — Human-Readable Cron — DevUtils",
    metaDescription: "Convert cron expressions into plain English descriptions. Understand cron schedules instantly with visual field breakdown and examples.",
    keywords: "cron parser, cron expression, cron to english, cron schedule, crontab guru, cron generator, cron translator",
  },
  {
    id: "password-generator", name: "Password Generator", description: "Generate secure passwords with strength meter",
    category: "Security", icon: Shield, path: "/password-generator",
    metaTitle: "Free Online Password Generator — Secure & Customizable — DevUtils",
    metaDescription: "Generate strong, secure passwords with customizable length, symbols, numbers, and uppercase. Includes password strength meter. 100% client-side.",
    keywords: "password generator, strong password, secure password generator, random password, password strength checker",
  },
];

export const categories = ["JSON", "Encoders", "Text", "Generators", "Security"];

export function getToolsByCategory(category: string) {
  return tools.filter(t => t.category === category);
}

export function getToolByPath(path: string) {
  return tools.find(t => t.path === path);
}
