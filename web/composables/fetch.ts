import type { UseFetchOptions } from "nuxt/app";

export const useCustomFetch = <TRes>(
    url: string,
    options?: UseFetchOptions<TRes>
) => {
    const config = useRuntimeConfig();
    const { locale } = useI18n();
    return useFetch(url, {
        ...options,
        baseURL: config.public.apiProxyUrl,
        params: {
            ...options?.params,
            locale: locale.value,
        },
    });
};
