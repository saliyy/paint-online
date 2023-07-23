import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: ['~/assets/css/main.scss'],
    modules: [
        '@pinia/nuxt',
    ],
    vite: {
        css: {
            preprocessorOptions: {
                sass: {
                    additionalData: '@import "@/assets/css/main.scss',
                },
            },
        },
    },
    runtimeConfig: {
        public: {
            baseServerPort: '5000',
            baseServerHost: '0.0.0.0'
        }
    }
})
