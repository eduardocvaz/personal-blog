<template>
  <v-layout>
    <TopNav></TopNav>
    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>
<script setup>
// import { useTheme } from "vuetify";
import TopNav from "@/components/TopNav.vue";
// const theme = useTheme();

// function toggleTheme() {
//   theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
// }
</script>
