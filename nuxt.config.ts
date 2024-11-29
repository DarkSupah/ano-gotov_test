// https://nuxt.com/docs/api/configuration/nuxt-config

// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  modules: ["@nuxt/image", "@nuxt/icon"],
  css: ["@/assets/styles/index.scss"],

  devtools: { enabled: false },
  ssr: false,
  components: true,

  app: {
    head: {
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
      meta: [{ name: "format-detection", content: "telephone=no" }],
      link: [
        {
          rel: "icon",
          href: "/favicon.ico",
          type: "image/x-icon",
        },
      ],
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
                        @use '@/assets/styles/dev/colors.scss' as *;
                        @use '@/assets/styles/dev/media.scss' as *;
                        @use '@/assets/styles/dev/typography.scss' as *;
                    `,
        },
      },
    },
  },

  icon: {
    provider: "server",
    class: "icon",
    mode: "svg",
    customCollections: [
      {
        prefix: "icon",
        dir: "./assets/icons",
      },
    ],
  },
});
