import type { FC } from "react";

export type ToolModule = { default: FC };

export const toolLoaders: Record<string, () => Promise<ToolModule>> = {
  "json-formatter": () => import("@/components/tools/JsonFormatter").then(m => ({ default: m.JsonFormatter })),
  "diff-checker": () => import("@/components/tools/DiffChecker").then(m => ({ default: m.DiffChecker })),
  "jwt-decoder": () => import("@/components/tools/JwtDecoder").then(m => ({ default: m.JwtDecoder })),
  "base64": () => import("@/components/tools/Base64Tool").then(m => ({ default: m.Base64Tool })),
  "case-converter": () => import("@/components/tools/CaseConverter").then(m => ({ default: m.CaseConverter })),
  "cron-parser": () => import("@/components/tools/CronParser").then(m => ({ default: m.CronParser })),
  "password-generator": () => import("@/components/tools/PasswordGenerator").then(m => ({ default: m.PasswordGenerator })),
  "remove-duplicates": () => import("@/components/tools/RemoveDuplicates").then(m => ({ default: m.RemoveDuplicates })),
  "sort-text": () => import("@/components/tools/SortText").then(m => ({ default: m.SortText })),
  "word-counter": () => import("@/components/tools/WordCounter").then(m => ({ default: m.WordCounter })),
  "reverse-text": () => import("@/components/tools/ReverseText").then(m => ({ default: m.ReverseText })),
  "remove-spaces": () => import("@/components/tools/RemoveSpaces").then(m => ({ default: m.RemoveSpaces })),
  "extract-emails-urls": () => import("@/components/tools/ExtractEmailsUrls").then(m => ({ default: m.ExtractEmailsUrls })),
  "text-to-slug": () => import("@/components/tools/TextToSlug").then(m => ({ default: m.TextToSlug })),
  "find-replace": () => import("@/components/tools/FindReplace").then(m => ({ default: m.FindReplace })),
  "url-encoder": () => import("@/components/tools/UrlEncoder").then(m => ({ default: m.UrlEncoder })),
  "html-encoder": () => import("@/components/tools/HtmlEncoder").then(m => ({ default: m.HtmlEncoder })),
  "json-escape": () => import("@/components/tools/JsonEscape").then(m => ({ default: m.JsonEscape })),
  "binary-text": () => import("@/components/tools/BinaryText").then(m => ({ default: m.BinaryText })),
  "hex-text": () => import("@/components/tools/HexText").then(m => ({ default: m.HexText })),
  "unicode-converter": () => import("@/components/tools/UnicodeConverter").then(m => ({ default: m.UnicodeConverter })),
  "json-xml": () => import("@/components/tools/JsonXml").then(m => ({ default: m.JsonXml })),
  "yaml-json": () => import("@/components/tools/YamlJson").then(m => ({ default: m.YamlJson })),
  "sql-formatter": () => import("@/components/tools/SqlFormatter").then(m => ({ default: m.SqlFormatter })),
  "regex-tester": () => import("@/components/tools/RegexTester").then(m => ({ default: m.RegexTester })),
  "uuid-generator": () => import("@/components/tools/UuidGenerator").then(m => ({ default: m.UuidGenerator })),
  "code-minifier": () => import("@/components/tools/CodeMinifier").then(m => ({ default: m.CodeMinifier })),
  "http-headers": () => import("@/components/tools/HttpHeaders").then(m => ({ default: m.HttpHeaders })),
  "api-tester": () => import("@/components/tools/ApiTester").then(m => ({ default: m.ApiTester })),
};

