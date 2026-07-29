import { site } from "@/data/site";
import { articles } from "@/lib/articles";
import { articleUrl } from "@/data/articles/types";

export const dynamic = "force-static";

export function GET() {
  const items = articles
    .map(
      (a) => `    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${site.domain}${articleUrl(a)}</link>
      <guid>${site.domain}${articleUrl(a)}</guid>
      <pubDate>${new Date(a.publishedDate).toUTCString()}</pubDate>
      <description><![CDATA[${a.metaDescription}]]></description>
      <category>${a.category}</category>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${site.name} — Travel &amp; Lifestyle Stories</title>
    <link>${site.domain}</link>
    <description>${site.description}</description>
    <language>en</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
