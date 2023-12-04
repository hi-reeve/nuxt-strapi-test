// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from "@nuxt/kit";
const { resolve } = createResolver(import.meta.url);
export default defineNuxtConfig({
    modules: ["@nuxt-alt/proxy", "@nuxtjs/i18n", "@nuxt/image"],
    devtools: { enabled: true },
    runtimeConfig: {
        public: {
            apiProxyUrl: process.env.API_PROXY_URL,
        },
    },
    experimental: {
        typedPages: true,
    },
    i18n: {
        langDir: resolve("./locales"),
        locales: [
            {
                name: "Indonesia",
                isCatchallLocale: true,
                code: "id",
                iso: "id-ID",
                file: "id.yaml",
            },
            {
                code: "en",
                iso: "en-US",
                file: "en.yaml",
                name: "English",
            },
        ],
        baseUrl: process.env.APP_URL,
        defaultLocale: "id",
        strategy: "prefix",
        detectBrowserLanguage: {
            useCookie: true,
            redirectOn: "root",
            cookieKey: "i18n_redirected",
            alwaysRedirect: true,
        },
    },
    proxy: {
        proxies: {
            "/proxy": {
                target: process.env.API_BASE_URL,
                changeOrigin: true,
                rewrite: path => path.replace("/proxy", ""),
                headers: {
                    Authorization: `Bearer ${process.env.API_TOKEN}`,
                },
            },
        },
    },
});