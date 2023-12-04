<script setup lang="ts">
import type { APIResponse } from "@/types/strapi";
const route = useRoute("blogs-slug___id");

const { data, pending } = await useCustomFetch<APIResponse<"api::blog.blog">>(
    `/slugify/slugs/blog/${route.params.slug}`,
    {
        params: {
            populate: "*",
        },
    }
);

useServerSeoMeta({
    title: data.value?.data.attributes.title,
    description: () => data.value?.data.attributes.content,
    ogImage: `http://localhost:1337${data.value?.data.attributes.cover?.data.attributes.url}`,
    ogTitle: data.value?.data.attributes.title,
    ogDescription: () => data.value?.data.attributes.content,
    twitterImage: () =>
        `http://localhost:1337${data.value?.data.attributes.cover?.data.attributes.url}`,
    twitterTitle: data.value?.data.attributes.title,
    twitterDescription: () => data.value?.data.attributes.content,
    twitterCard: "summary_large_image",
});
</script>

<template>
    <p v-if="pending">Loading...</p>
    <div v-else>
        <nuxt-img
            :src="`http://localhost:1337${data?.data.attributes.cover?.data.attributes.url}`"
            :alt="data?.data.attributes.title"
            width="300"
        />

        <h1>
            {{ data?.data.attributes.title }}
        </h1>
        <p>
            {{ data?.data.attributes.content }}
        </p>
    </div>
</template>
