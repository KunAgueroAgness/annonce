export default defineNuxtConfig({
  compatibilityDate: "2025-03-16",
  ssr: true,  
  experimental: {
    payloadExtraction: false
  },
  modules: ["@nuxtjs/device", "nuxt-quasar-ui"],
  app:{
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Serif:wght@600&display=auto',
        },
      ],
    },
  },
  quasar: {
    plugins: [
      "BottomSheet",
      "Dialog",
      "Loading",
      "LoadingBar",
      "Notify",
      "Dark",
    ],
    sassVariables: '@/assets/style/quasar/variables.scss' ,
    extras: {
      fontIcons: [
        "eva-icons",
        "material-icons",
        "mdi-v7",
        "mdi-v6",
        "bootstrap-icons"
      ],
    },
    components: {
      defaults: {
        QBtn: {
          unelevated: true,
        },
      },
    },
  },
});

