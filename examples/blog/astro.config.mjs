// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import asciinema from "remark-asciinema";

// https://astro.build/config
export default defineConfig({
	site: "https://example.com",
	integrations: [mdx(), sitemap()],
	markdown: {
		remarkPlugins: [[asciinema, { embedType: "script" }]],
	},
});
