import { MetadataRoute } from "next";

const baseUrl = "https://montenegrotransfergroup.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["", "/en", "/ru"];
  const pages = ["", "/ture", "/o-nama", "/kontakt"];

  const urls: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      urls.push({
        url: `${baseUrl}${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
      });
    }
  }

  return urls;
}
