// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  experimental: {
    typedPages: true,
    viewTransition: true,
  },

  app: {
    head: {
      charset: "utf-8",
      title: "JCS IT",
      viewport: "width=device-width, initial-scale=1",
      noscript: [{ innerHTML: "JCSIT requires javascript to function" }],
    },
  },

  vue: {
    defineModel: true,
  },

  build: {
    transpile: ["vue-sonner"],
  },

  vite: {
    server: {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Referrer-Policy": "no-referrer",
      },
    },
    esbuild: {
      drop:
        process.env.NODE_ENV === "development"
          ? undefined
          : ["console", "debugger"],
      legalComments: "none",
      format: "esm",
    },
  },

  css: ["~/assets/css/main.css"],

  typescript: {
    tsConfig: {
      include: ["./types/**/*"],
    },
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-icon",
    "@vueuse/nuxt",
    "nuxt-typed-router",
    "nuxt-headlessui",
  ],

  tailwindcss: {
    config: {
      content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
      daisyui: {
        themes: ["light", "dark"],
      },
      plugins: [
        // require('@tailwindcss/forms'),
        // require("@tailwindcss/typography"),
        require("daisyui"),
      ],
    },
  },
});
