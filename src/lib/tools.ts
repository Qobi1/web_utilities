import {
  Braces, Binary, Type, Shield, Clock, FileCode, KeyRound, CaseSensitive, Image
} from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  metaTitle: string;
  metaDescription: string;
}

export const tools: Tool[] = [
  { id: "json-formatter", name: "JSON Formatter", description: "Format & validate JSON with syntax highlighting", category: "JSON", icon: Braces, metaTitle: "Free Online JSON Formatter", metaDescription: "Format, validate, and beautify JSON data with syntax highlighting and tree view." },
  { id: "diff-checker", name: "Diff Checker", description: "Compare two texts side-by-side", category: "Text", icon: FileCode, metaTitle: "Free Online Diff Checker", metaDescription: "Compare two texts and see additions and deletions highlighted." },
  { id: "jwt-decoder", name: "JWT Decoder", description: "Decode and inspect JWT tokens", category: "Encoders", icon: KeyRound, metaTitle: "Free Online JWT Decoder", metaDescription: "Decode JWT tokens into header, payload, and signature." },
  { id: "base64", name: "Base64 Encoder", description: "Encode/decode text and images to Base64", category: "Encoders", icon: Binary, metaTitle: "Free Online Base64 Encoder", metaDescription: "Convert text and images to and from Base64 encoding." },
  { id: "case-converter", name: "Case Converter", description: "Transform text between cases", category: "Text", icon: CaseSensitive, metaTitle: "Free Online Case Converter", metaDescription: "Convert text to camelCase, PascalCase, snake_case, and kebab-case." },
  { id: "cron-parser", name: "Cron Parser", description: "Convert cron expressions to English", category: "Generators", icon: Clock, metaTitle: "Free Online Cron Parser", metaDescription: "Convert cron expressions into human-readable descriptions." },
  { id: "password-generator", name: "Password Generator", description: "Generate secure passwords with strength meter", category: "Security", icon: Shield, metaTitle: "Free Online Password Generator", metaDescription: "Generate secure passwords with customizable options and strength meter." },
];

export const categories = ["JSON", "Encoders", "Text", "Generators", "Security"];

export function getToolsByCategory(category: string) {
  return tools.filter(t => t.category === category);
}
