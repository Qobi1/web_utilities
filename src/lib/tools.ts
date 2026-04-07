import {
  Braces, Binary, Type, Clock, FileCode, KeyRound, CaseSensitive, Shield,
  ListX, ArrowDownAZ, Hash, Undo2, Space, AtSign, Link, Replace,
  Globe, Code, Languages, Database, Regex, Fingerprint, Minimize2,
  Network, Send, FileText,
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
  // ── Text Tools ──
  {
    id: "case-converter", name: "Case Converter", description: "Transform text between camelCase, PascalCase, snake_case, kebab-case, upper, lower, title",
    category: "Text", icon: CaseSensitive, path: "/case-converter",
    metaTitle: "Free Case Converter — camelCase, snake_case, Title Case & More",
    metaDescription: "Convert text to camelCase, PascalCase, snake_case, kebab-case, UPPER CASE, lower case, and Title Case instantly. Perfect for variable naming.",
    keywords: "case converter, camelcase, snake case, kebab case, pascal case, title case, uppercase, lowercase, text case converter, variable name converter",
  },
  {
    id: "remove-duplicates", name: "Remove Duplicates", description: "Remove duplicate lines from text",
    category: "Text", icon: ListX, path: "/remove-duplicates",
    metaTitle: "Free Remove Duplicate Lines Tool — Deduplicate Text Online",
    metaDescription: "Remove duplicate lines from text instantly. Paste your text and get unique lines. 100% client-side, fast and private.",
    keywords: "remove duplicate lines, deduplicate text, unique lines, remove duplicates online, text deduplication tool",
  },
  {
    id: "sort-text", name: "Sort Text", description: "Sort lines alphabetically A–Z or Z–A",
    category: "Text", icon: ArrowDownAZ, path: "/sort-text",
    metaTitle: "Free Sort Text Lines Tool — Alphabetical Sorting Online",
    metaDescription: "Sort text lines alphabetically in ascending or descending order. Fast, private, no data uploaded.",
    keywords: "sort text, sort lines, alphabetical sort, sort text online, a-z sort, z-a sort, line sorter",
  },
  {
    id: "word-counter", name: "Word Counter", description: "Count words, characters, sentences, and more",
    category: "Text", icon: Hash, path: "/word-counter",
    metaTitle: "Free Word & Character Counter — Count Words Online",
    metaDescription: "Count words, characters, sentences, paragraphs, and lines in your text. Real-time counting, 100% client-side.",
    keywords: "word counter, character counter, word count, character count, sentence counter, text counter online, letter counter",
  },
  {
    id: "reverse-text", name: "Reverse Text", description: "Reverse characters, words, or lines",
    category: "Text", icon: Undo2, path: "/reverse-text",
    metaTitle: "Free Reverse Text Tool — Reverse Characters, Words & Lines",
    metaDescription: "Reverse your text by characters, words, or lines instantly. Free online text reverser tool.",
    keywords: "reverse text, text reverser, reverse string, reverse words, mirror text, backwards text",
  },
  {
    id: "remove-spaces", name: "Remove Spaces", description: "Clean up extra whitespace from text",
    category: "Text", icon: Space, path: "/remove-spaces",
    metaTitle: "Free Remove Extra Spaces Tool — Clean Whitespace Online",
    metaDescription: "Remove extra spaces, tabs, and blank lines from text. Clean up whitespace instantly, 100% client-side.",
    keywords: "remove extra spaces, clean whitespace, trim spaces, remove blank lines, whitespace cleaner, text cleaner",
  },
  {
    id: "extract-emails-urls", name: "Extract Emails/URLs", description: "Extract email addresses or URLs from text",
    category: "Text", icon: AtSign, path: "/extract-emails-urls",
    metaTitle: "Free Email & URL Extractor — Extract Emails and Links from Text",
    metaDescription: "Extract all email addresses and URLs from any text. Unique results, one-click copy. Fast and private.",
    keywords: "extract emails, extract urls, email extractor, url extractor, find emails in text, link extractor, scrape emails",
  },
  {
    id: "text-to-slug", name: "Text to Slug", description: "Convert text to URL-friendly slugs",
    category: "Text", icon: Link, path: "/text-to-slug",
    metaTitle: "Free Text to Slug Converter — URL Slug Generator Online",
    metaDescription: "Convert any text to a clean, URL-friendly slug. Handles accents, special characters, and whitespace.",
    keywords: "text to slug, slug generator, url slug, slugify, seo slug, url friendly text, permalink generator",
  },
  {
    id: "find-replace", name: "Find & Replace", description: "Find and replace text with regex support",
    category: "Text", icon: Replace, path: "/find-replace",
    metaTitle: "Free Find & Replace Tool — Regex Search and Replace Online",
    metaDescription: "Find and replace text with optional regex support and case sensitivity. Real-time preview, 100% client-side.",
    keywords: "find and replace, search replace, regex replace, text replace, find replace online, regex search, bulk replace",
  },

  // ── Encoding Tools ──
  {
    id: "base64", name: "Base64 Encoder", description: "Encode/decode text and images to Base64",
    category: "Encoders", icon: Binary, path: "/base64",
    metaTitle: "Free Base64 Encoder & Decoder — Text and Image to Base64",
    metaDescription: "Encode and decode text or images to Base64 format instantly. Supports file upload, text conversion. Client-side only.",
    keywords: "base64 encoder, base64 decoder, base64 converter, image to base64, text to base64, encode base64 online",
  },
  {
    id: "url-encoder", name: "URL Encoder", description: "Encode or decode URL components",
    category: "Encoders", icon: Globe, path: "/url-encoder",
    metaTitle: "Free URL Encoder & Decoder — Encode URL Online",
    metaDescription: "Encode and decode URL components instantly. Handle special characters in URLs safely. 100% client-side.",
    keywords: "url encoder, url decoder, url encode online, percent encoding, encode url, decode url, urlencode",
  },
  {
    id: "html-encoder", name: "HTML Encoder", description: "Encode or decode HTML entities",
    category: "Encoders", icon: Code, path: "/html-encoder",
    metaTitle: "Free HTML Entity Encoder & Decoder — Escape HTML Online",
    metaDescription: "Encode and decode HTML entities. Convert special characters to HTML-safe entities. Fast and private.",
    keywords: "html encoder, html decoder, html entities, escape html, html entity encoder, html special characters, encode html online",
  },
  {
    id: "json-escape", name: "JSON Escape", description: "Escape or unescape JSON strings",
    category: "Encoders", icon: Braces, path: "/json-escape",
    metaTitle: "Free JSON Escape & Unescape Tool — JSON String Escaper",
    metaDescription: "Escape and unescape JSON strings. Handle quotes, backslashes, and special characters in JSON.",
    keywords: "json escape, json unescape, escape json string, json string escaper, json encode string, unescape json",
  },
  {
    id: "binary-text", name: "Binary ↔ Text", description: "Convert between binary and text",
    category: "Encoders", icon: Binary, path: "/binary-text",
    metaTitle: "Free Binary to Text Converter — Binary ↔ Text Online",
    metaDescription: "Convert text to binary and binary to text instantly. 8-bit representation, space-separated. 100% client-side.",
    keywords: "binary to text, text to binary, binary converter, binary translator, binary code converter, binary decoder",
  },
  {
    id: "hex-text", name: "Hex ↔ Text", description: "Convert between hexadecimal and text",
    category: "Encoders", icon: Hash, path: "/hex-text",
    metaTitle: "Free Hex to Text Converter — Hexadecimal ↔ Text Online",
    metaDescription: "Convert text to hexadecimal and hex to text. Simple, fast, private hex converter.",
    keywords: "hex to text, text to hex, hexadecimal converter, hex translator, hex decoder, hex encoder online",
  },
  {
    id: "unicode-converter", name: "Unicode Converter", description: "Convert between text and Unicode code points",
    category: "Encoders", icon: Languages, path: "/unicode-converter",
    metaTitle: "Free Unicode Converter — Text ↔ Unicode Code Points",
    metaDescription: "Convert text to Unicode code points (U+0048) and back. Supports all Unicode characters. Client-side.",
    keywords: "unicode converter, text to unicode, unicode to text, unicode code point, unicode encoder, unicode decoder",
  },

  // ── Developer Tools ──
  {
    id: "json-formatter", name: "JSON Formatter", description: "Format & validate JSON with syntax highlighting",
    category: "Developer", icon: Braces, path: "/json-formatter",
    metaTitle: "Free JSON Formatter & Validator — Pretty Print JSON Online",
    metaDescription: "Format, beautify, minify, and validate JSON data online. Syntax highlighting, tree view, error detection. 100% client-side.",
    keywords: "json formatter, json validator, json beautifier, json minifier, json parser, pretty print json, format json online",
  },
  {
    id: "json-xml", name: "JSON ↔ XML", description: "Convert between JSON and XML formats",
    category: "Developer", icon: FileCode, path: "/json-xml",
    metaTitle: "Free JSON to XML Converter — JSON ↔ XML Online",
    metaDescription: "Convert JSON to XML and XML to JSON instantly. Handles nested objects and arrays. 100% client-side.",
    keywords: "json to xml, xml to json, json xml converter, convert json to xml, convert xml to json, json xml online",
  },
  {
    id: "yaml-json", name: "YAML ↔ JSON", description: "Convert between YAML and JSON formats",
    category: "Developer", icon: FileText, path: "/yaml-json",
    metaTitle: "Free YAML to JSON Converter — YAML ↔ JSON Online",
    metaDescription: "Convert YAML to JSON and JSON to YAML instantly. Perfect for config files and data interchange.",
    keywords: "yaml to json, json to yaml, yaml converter, yaml json converter, yaml parser, convert yaml online",
  },
  {
    id: "sql-formatter", name: "SQL Formatter", description: "Format and beautify SQL queries",
    category: "Developer", icon: Database, path: "/sql-formatter",
    metaTitle: "Free SQL Formatter & Beautifier — Format SQL Online",
    metaDescription: "Format and beautify SQL queries with proper indentation and syntax. Supports multiple SQL dialects.",
    keywords: "sql formatter, sql beautifier, format sql, sql pretty print, sql indent, sql formatter online, beautify sql",
  },
  {
    id: "regex-tester", name: "Regex Tester", description: "Test regular expressions with real-time matching",
    category: "Developer", icon: Regex, path: "/regex-tester",
    metaTitle: "Free Regex Tester — Test Regular Expressions Online",
    metaDescription: "Test and debug regular expressions with real-time matching, flags support, and match highlighting.",
    keywords: "regex tester, regex test, regular expression tester, regex debugger, regex online, test regex, regex matcher",
  },
  {
    id: "uuid-generator", name: "UUID Generator", description: "Generate random UUIDs (v4)",
    category: "Developer", icon: Fingerprint, path: "/uuid-generator",
    metaTitle: "Free UUID Generator — Generate Random UUIDs v4 Online",
    metaDescription: "Generate random UUID v4 identifiers instantly. Bulk generation up to 100 at once. One-click copy.",
    keywords: "uuid generator, generate uuid, uuid v4, random uuid, guid generator, unique id generator, uuid online",
  },
  {
    id: "code-minifier", name: "Code Minifier", description: "Minify or beautify JavaScript and CSS",
    category: "Developer", icon: Minimize2, path: "/code-minifier",
    metaTitle: "Free Code Minifier & Beautifier — Minify JS & CSS Online",
    metaDescription: "Minify and beautify JavaScript and CSS code. Reduce file size and improve readability. Client-side only.",
    keywords: "code minifier, js minifier, css minifier, javascript minify, css minify, code beautifier, uglify online",
  },
  {
    id: "http-headers", name: "HTTP Headers", description: "Parse and analyze HTTP headers",
    category: "Developer", icon: Network, path: "/http-headers",
    metaTitle: "Free HTTP Headers Parser — Analyze HTTP Headers Online",
    metaDescription: "Parse and analyze HTTP headers into a readable table format. Understand request and response headers.",
    keywords: "http headers parser, parse http headers, http header analyzer, view headers, http header tool",
  },
  {
    id: "api-tester", name: "API Tester", description: "Send HTTP requests and inspect responses",
    category: "Developer", icon: Send, path: "/api-tester",
    metaTitle: "Free API Request Tester — Send HTTP Requests Online",
    metaDescription: "Send GET, POST, PUT, DELETE requests and inspect responses. Test APIs directly from your browser.",
    keywords: "api tester, http request tester, rest api tester, send request online, api client, postman alternative online",
  },
  {
    id: "cron-parser", name: "Cron Parser", description: "Convert cron expressions to English",
    category: "Developer", icon: Clock, path: "/cron-parser",
    metaTitle: "Free Cron Expression Parser & Generator — Cron to English",
    metaDescription: "Convert cron expressions into plain English. Understand cron schedules with visual breakdown and examples.",
    keywords: "cron parser, cron expression, cron to english, cron schedule, crontab guru, cron generator, cron translator",
  },
  {
    id: "diff-checker", name: "Diff Checker", description: "Compare two texts side-by-side",
    category: "Developer", icon: FileCode, path: "/diff-checker",
    metaTitle: "Free Diff Checker — Compare Text Side by Side Online",
    metaDescription: "Compare two blocks of text and see additions, deletions, and changes highlighted. Fast and private.",
    keywords: "diff checker, text compare, compare texts, online diff, text diff, code diff, side by side comparison",
  },
  {
    id: "jwt-decoder", name: "JWT Decoder", description: "Decode and inspect JWT tokens",
    category: "Developer", icon: KeyRound, path: "/jwt-decoder",
    metaTitle: "Free JWT Decoder — Decode JSON Web Tokens Online",
    metaDescription: "Decode JWT tokens into header, payload, and signature. Inspect claims, expiry, and algorithm. No data sent to servers.",
    keywords: "jwt decoder, jwt parser, decode jwt, json web token decoder, jwt inspector, jwt debugger",
  },
  {
    id: "password-generator", name: "Password Generator", description: "Generate secure passwords with strength meter",
    category: "Developer", icon: Shield, path: "/password-generator",
    metaTitle: "Free Password Generator — Secure & Customizable Passwords",
    metaDescription: "Generate strong, secure passwords with customizable length, symbols, numbers. Includes strength meter. Client-side.",
    keywords: "password generator, strong password, secure password, random password, password strength checker",
  },
];

export const categories = ["Text", "Encoders", "Developer"];

export function getToolsByCategory(category: string) {
  return tools.filter(t => t.category === category);
}

export function getToolByPath(path: string) {
  return tools.find(t => t.path === path);
}
