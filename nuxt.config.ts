// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui-pro",
    "@nuxt/content",
    "@nuxtjs/mdc",
    "nuxt-og-image",
    "nuxt-llms",
  ],

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  content: {
    
    build: {
      markdown: {
        toc: {
          searchDepth: 1,
          depth: 3,
        },
        rehypePlugins: {
          "rehype-pretty-code": {
            // Theme configuration for light/dark mode
            theme: {
              light: "github-light",
              dark: "github-dark",
            },
            // Enable line numbers
            keepBackground: true,
            // Add line highlighting capabilities
            grid: true,
          }
        },
        highlight: {
          theme: {
            // Default theme (same as single string)
            default: 'github-light',
            // Theme used if `html.dark`
            dark: 'github-dark',
            // Theme used if `html.sepia`
            sepia: 'monokai'
          },
          preload: ["js", "jsx", "ts", "tsx", "vue", "css", "html", "vue", "bash", "md", "mdc", "yaml", "csharp"],
          langs: ["js", "jsx", "ts", "tsx", "vue", "css", "html", "vue", "bash", "md", "mdc", "yaml", "csharp"],
        },
      },
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-07-11",

  nitro: {
    prerender: {
      routes: ["/"],
      crawlLinks: true,
    },
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },

  icon: {
    provider: "iconify",
  },

  llms: {
    // TODO: Change to your own domain and document configuration
    domain: "https://the-standard.dev/",
    title: "The Standard",
    description:
      "A comprehensive guide to software engineering excellence.",
    full: {
      title: "The Standard - Full Documentation",
      description: "This is the full documentation for The Standard.",
    },
    sections: [
      {
        title: "Getting Started",
        contentCollection: "docs",
        contentFilters: [
          { field: "path", operator: "LIKE", value: "/getting-started%" },
        ],
      },
      {
        title: "Standard",
        contentCollection: "standard",
        contentFilters: [
          { field: "path", operator: "LIKE", value: "/standard%" },
        ],
      },
    ],
  },
});
