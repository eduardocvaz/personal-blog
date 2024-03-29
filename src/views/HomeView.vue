<template>
  <v-container class="mb-6">
    <v-row>
      <v-col v-for="post in posts" v-bind:key="post.slug" cols="4">
        <BlogCard
          class="ma-5"
          :slug="post.slug"
          :image="baseUrl + post.image.url"
          :date="new Date(post.publishedAt).toISOString().split('T')[0]"
          :title="post.title"
          :summary="post.summary"
          :authorImage="baseUrl + post.author.image.url"
          :authorName="post.author.name"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";

import { PostModel } from "@/model/PostModel";
import BlogCard from "@/components/BlogCard.vue";

export default defineComponent({
  name: "HomeView",
  components: { BlogCard },
  setup() {
    const posts = ref<PostModel[]>([]);
    const baseUrl = process.env.VUE_APP_API_URL;
    onMounted(async () => {
      axios
        .get(`${baseUrl}/api/posts?populate=tags,author.image,image`, {
          headers: {
            Authorization: process.env.VUE_APP_API_TOKEN,
          },
        })
        .then((response) => {
          posts.value = response.data.data.map((data: any) => {
            return new PostModel(data);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return {
      posts,
      baseUrl,
    };
  },
});
</script>
<style scoped>
.post-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.post-content {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.post-tags {
  margin-top: 20px;
}

.tag-item {
  background-color: #e0e0e0;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 10px;
  display: inline-block;
}
.code-block {
  background-color: #f4f4f4; /* Cor de fundo */
  border: 1px solid #ccc; /* Borda */
  border-radius: 5px; /* Cantos arredondados */
  padding: 10px; /* Espaçamento interno */
  font-family: "Courier New", monospace; /* Tipo de fonte monoespaçada */
  font-size: 14px; /* Tamanho da fonte */
  line-height: 1.5; /* Espaçamento entre linhas */
  overflow-x: auto; /* Rolar horizontalmente quando necessário */
  color: #333; /* Cor do texto */
}
.post {
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
}
</style>
