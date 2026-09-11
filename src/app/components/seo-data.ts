import pages from "./seo-pages.json";

export const SITE_URL = "https://www.tfawe.ca";
export const DEFAULT_TITLE = pages["/"].title;
export const DEFAULT_DESCRIPTION = pages["/"].description;

export type PageMetadata = { title: string; description: string; noIndex?: boolean };

export const PAGES: Record<string, PageMetadata> = pages;