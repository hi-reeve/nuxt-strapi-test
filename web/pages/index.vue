<script setup lang="ts">
import type { APIResponseCollection } from "@/types/strapi";
const { data, pending } = await useCustomFetch<
    APIResponseCollection<"api::blog.blog">
>("/blogs");
const localePath = useLocalePath();
</script>

<template>
    <p v-if="pending">Loading...</p>
    <ul v-else>
        <li v-for="article in data?.data" :key="article.id">
            <nuxt-link :to="localePath(`/blogs/${article.attributes.slug}`)">
                {{ article.attributes.title }}
            </nuxt-link>
        </li>
    </ul>
</template>
