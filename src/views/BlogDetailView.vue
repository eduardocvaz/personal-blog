<template>
  <div class="blogDetail">
    <h1>{{ post?.title }}</h1>
    <div class="blogDetail__head">
      <img
        :src="baseUrl + post?.author.image.url"
        class="blogDetail__profileImg"
      />
      <span>{{ post?.author.name }}</span>
      <span>{{ formatDate(post?.publishedAt) }}</span>
    </div>
    <div class="blogDetail__body_img">
      <img :src="baseUrl + post?.image.url" />
      <div class="blogDetail__body" v-html="post?.body"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { PostModel } from "@/model/PostModel";
import axios from "axios";
import qs from "qs";
import hljs from "highlight.js";
import "highlight.js/styles/base16/brogrammer.min.css";
export default defineComponent({
  name: "BlogDetailView",
  setup() {
    let post = ref<PostModel>();
    const baseUrl = process.env.VUE_APP_API_URL;
    const route = useRoute();
    const slug = route.params.slug;
    const query = qs.stringify(
      {
        filters: {
          slug: {
            $eq: slug,
          },
        },
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );
    const formatDate = (publishedAt: string | undefined) => {
      if (publishedAt) {
        const date = new Date(publishedAt);
        return date.toISOString().split("T")[0];
      }
      return "";
    };

    onMounted(async () => {
      axios
        .get(`${baseUrl}/api/posts?populate=tags,author.image,image&${query}`, {
          headers: {
            Authorization: process.env.VUE_APP_API_TOKEN,
          },
        })
        .then((response) => {
          post.value = new PostModel(response.data.data[0]);
          console.log(post.value);
          // Use Highlight.js para realçar o código HTML em post.body
          const codeBlocks = post.value.body?.match(
            /<code class="json">(.*?)<\/code>/gs
          );
          console.log(codeBlocks);
          if (codeBlocks) {
            codeBlocks.forEach((codeBlock) => {
              const code = codeBlock
                ?.replace(/<code class="json">/g, "")
                .replace(/<\/code>/g, "");
              //json
              const highlightedCode = hljs.highlight(code, {
                language: "json",
              }).value;
              if (post.value?.body) {
                post.value.body = post.value.body?.replace(
                  codeBlock,
                  highlightedCode
                );
              }
            });
          }
          console.log(post.value);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return {
      post,
      baseUrl,
      formatDate,
    };
  },
});
</script>

<style>
.blogDetail {
  width: 95%;
  max-width: 80vw;
  margin: 50px auto;
}

.blogDetail__head span:nth-child(2):after {
  content: ".";
  margin-left: 5px;
  vertical-align: top;
}

.blogDetail__head span {
  margin-left: 5px;
}

.blogDetail > h1 {
  margin-bottom: 15px;
}

.blogDetail > img {
  margin: 15px 0;
}

.blogDetail img {
  /*width: 90%;*/
}

.blogDetail .blogDetail__profileImg {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  vertical-align: middle;
}

.blogDetail__body_img img {
  width: 80%;
  display: block;
  margin: 10px auto;
}

.blogDetail__body p {
}

.blogDetail__body h2,
h3 {
  margin: 20px 0 5px;
}

.blogDetail__body img,
video {
}
</style>
