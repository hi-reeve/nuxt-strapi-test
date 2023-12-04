<script setup>
const route = useRoute();
const head = useLocaleHead({
    addDirAttribute: true,
    identifierAttribute: "id",
    addSeoAttributes: true,
});
const { locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
</script>

<template>
    <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
        <Head>
            <template v-for="link in head.link" :key="link.id">
                <Link
                    :id="link.id"
                    :rel="link.rel"
                    :href="link.href"
                    :hreflang="link.hreflang"
                />
            </template>
            <template v-for="meta in head.meta" :key="meta.id">
                <Meta
                    :id="meta.id"
                    :property="meta.property"
                    :content="meta.content"
                />
            </template>
        </Head>
        <Body>
            <header>
                <nav>
                    <ul>
                        <li>
                            <NuxtLink :to="localePath('/')"> Home </NuxtLink>
                        </li>
                        <li v-for="locale in locales" :key="locale.code">
                            <NuxtLink :to="switchLocalePath(locale.code)">{{
                                locale.name
                            }}</NuxtLink>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                {{ $t("hello-world") }}
                <slot />
            </main>
        </Body>
    </Html>
</template>
