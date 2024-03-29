<template>
  <v-card class="card" variant="tonal">
    <div
      class="card"
      @click.middle="openRouteInNewTab"
      @click="$router.push(`/detail/${slug}`)"
    >
      <img :src="image" />
      <div class="card__details">
        <span class="mgn">{{ date }}</span>
        <h3>{{ title }}</h3>
        <p class="mgn">{{ summary }}</p>
        <div class="card__author">
          <img :src="authorImage" />
          <span>{{ authorName }}</span>
        </div>
      </div>
    </div>
  </v-card>
</template>
<script setup>
import { useRouter } from "vue-router";

// eslint-disable-next-line no-undef
const props = defineProps([
  "slug",
  "image",
  "date",
  "title",
  "summary",
  "authorImage",
  "authorName",
]);

const router = useRouter();
const openRouteInNewTab = () => {
  const routeData = router.resolve({
    path: `/detail/${props.slug}`,
  });
  window.open(routeData.href, "_blank");
};
</script>
<style>
.card {
  cursor: pointer;
}
.card:hover {
  box-shadow: 0 2px 6px rgb(var(--v-theme-primary));
}

.card > img {
  object-fit: cover;
  width: 100%;
  height: 200px;
}

.card__details {
  padding: 10px;
}

.card__details span:first-child {
  opacity: 0.5;
}

.card__details p {
  opacity: 0.8;
}

.card__author img {
  object-fit: cover;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  vertical-align: middle;
}

.card__author span {
  margin-left: 10px;
}
</style>
