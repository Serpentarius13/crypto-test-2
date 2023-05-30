// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "nuxt-icons"],

  vite: {
    vue: {
      script: {
        propsDestructure: true,
        defineModel: true,
      },
    },
  },
  css: ["~/styles/main.scss"],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
    },
  },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
});
