<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import type { APIResponseCollection } from "@/types/strapi";
const { data, pending } = await useCustomFetch<
    APIResponseCollection<"api::blog.blog">
>("/blogs");
const localePath = useLocalePath();

const mapPoint = ref<
    {
        city: string;
        province: string;
        lat: number;
        long: number;
    }[]
>([
    {
        city: "Jakarta",
        province: "DKI Jakarta",
        lat: -6.1753942,
        long: 106.827183,
    },
    {
        city: "Surabaya",
        province: "Jawa Timur",
        lat: -7.2574719,
        long: 112.7520883,
    },
]);

const cityModel = ref("");
const provinceModel = ref("");
type Res =
    | {
          lat: string;
          lon: string;
      }
    | {
          lat: string;
          lon: string;
      }[];
const onAddPinpoint = async () => {
    if (!cityModel.value || !provinceModel.value) return;

    const url = `https://nominatim.openstreetmap.org/search?city=${cityModel.value}&state=${provinceModel.value}&format=json`;

    const res = await $fetch<Res>(url, {
        method: "GET",
    });

    if (res && !Array.isArray(res))
        mapPoint.value.push({
            city: cityModel.value,
            province: provinceModel.value,
            lat: parseFloat(res.lat),
            long: parseFloat(res.lon),
        });
    else if (res && Array.isArray(res)) {
        mapPoint.value.push({
            city: cityModel.value,
            province: provinceModel.value,
            lat: parseFloat(res[0].lat),
            long: parseFloat(res[0].lon),
        });
    }
};
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
    <div>
        <label>
            City
            <input v-model="cityModel" />
        </label>
        <label>
            Province
            <input v-model="provinceModel" />
        </label>
        <button @click="onAddPinpoint">Add pin point</button>

        <ul>
            <li v-for="point in mapPoint" :key="point.lat">
                {{ point.city }}, {{ point.province }}
            </li>
        </ul>
    </div>
    <div
        :style="{
            height: '600px',
            width: '100%',
        }"
    >
        <l-map
            ref="map"
            :center="[0.7, 115]"
            :zoom="5"
            :options="{
                zoomControl: false,
                scrollWheelZoom: false,
                attributionControl: '',
            }"
        >
            <l-marker
                v-for="pin in mapPoint"
                :key="`${pin.lat}${pin.long}`"
                :lat-lng="[pin.lat, pin.long]"
            >
                <l-popup
                    :options="{
                        maxHeight: 200,
                    }"
                >
                    <h3>{{ pin.city }}, {{ pin.province }}</h3>
                    <p>
                        pariatur porro nulla vel, obcaecati cupiditate eaque,
                        veniam odit sint maiores soluta! Ad iure rerum nisi
                        nulla minus. Optio delectus officiis eius cumque atque
                        reprehenderit id, harum, perferendis, provident maiores
                        voluptates sint quam tempore cupiditate ex totam
                        incidunt temporibus illum quod at. Laboriosam natus,
                        totam mollitia qui in amet placeat eveniet, minus ea
                        nobis incidunt expedita modi libero, odio deleniti
                        asperiores harum. Atque ad animi eveniet ullam fugiat!
                        Eveniet dolor eius repellendus quia debitis? Saepe,
                        velit asperiores earum minima quae, nobis eligendi eius
                        alias doloremque perferendis repudiandae tenetur libero
                        sapiente odit ipsum dolores, sit dignissimos ipsam enim
                        itaque quia distinctio. In eum voluptatibus at doloribus
                        ex, possimus cum provident ipsa voluptas laborum rerum
                        facilis inventore, sapiente iusto eaque reiciendis vel
                        nihil consectetur delectus.
                    </p>
                </l-popup>
            </l-marker>
            <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base"
                name="OpenStreetMap"
            ></l-tile-layer>
        </l-map>
    </div>
</template>
