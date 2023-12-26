// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
    sourceMapsEnabled: true,
  },
  experimental: {
    typedPages: true,
    viewTransition: true,
  },

  app: {
    head: {
      charset: "utf-8",
      title: "JCS Bookings",
      viewport: "width=device-width, initial-scale=1",
      noscript: [{ innerHTML: "JCS Bookings requires javascript to function" }],
    },
  },

  nitro: {
    preset: "static",
  },

  vue: {
    defineModel: true,
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
    "nuxt-icon",
    "@vueuse/nuxt",
    "nuxt-typed-router",
    "@nuxtjs/google-fonts",
    "dayjs-nuxt",
    "nuxt-vuefire",
    "@hebilicious/vue-query-nuxt",
  ],

  googleFonts: {
    preconnect: true,
    download: false,
    families: {
      Roboto: true,
    },
  },

  vuefire: {
    config: {
      apiKey: "AIzaSyDCAOfUrMzC7uuV8zpGAsISHdhanU2sIbc",
      authDomain: "jcs-it.firebaseapp.com",
      projectId: "jcs-it",
      storageBucket: "jcs-it.appspot.com",
      messagingSenderId: "450949611405",
      appId: "1:450949611405:web:5eafd9b0a54ee6ba2f47c4",
      measurementId: "G-BKKN922HM5",
    },
    auth: true,
    appCheck: {
      debug: process.env.NODE_ENV !== "production",
      isTokenAutoRefreshEnabled: true,
      provider: "ReCaptchaV3",
      key: "6LdVYS8pAAAAAEYTKcye0IEHJ4WYqaPHocTN4Bpf",
    },
    emulators: {
      enabled: false,
    },
  },
});
