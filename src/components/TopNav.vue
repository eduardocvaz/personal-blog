<template>
  <div>
    <v-app-bar>
      <v-app-bar-nav-icon>
        <font-awesome-icon :icon="['fas', 'bars']" />
      </v-app-bar-nav-icon>
      <v-toolbar-title @click="$router.push('/')" class="mouse">
        Eduardo's Blog
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        :label="state.search.loading ? 'Searching...' : 'Search...'"
        v-if="state.search.searching"
        :loading="state.search.loading"
        :disabled="state.search.loading"
        @focusout="toggleSearch"
        flat=""
        density="compact"
        hide-details
      ></v-text-field>
      <v-tooltip text="Search posts">
        <template #activator="{ props }">
          <v-btn v-bind="props" icon @click="toggleSearch">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </v-btn>
        </template>
      </v-tooltip>
      <div>
        <v-switch
          v-model="isDarkTheme"
          @click="toggleTheme"
          false-icon="fas fa-sun"
          true-icon="fas fa-moon"
          hide-details
          inset
        ></v-switch>
      </div>
      <v-btn icon>
        <font-awesome-icon :icon="['fas', 'heart']" />
      </v-btn>
      <v-btn icon>
        <font-awesome-icon :icon="['fas', 'ellipsis']" />
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { useTheme } from "vuetify";
import { reactive, ref } from "vue";

export default {
  name: "TopNav", // O nome do seu componente
  // Seus métodos, dados e outras configurações do componente vão aqui
  setup() {
    const theme = useTheme();
    const isDarkTheme = ref(theme.global.current.value.dark);
    const icon = ref(isDarkTheme.value ? ["far", "moon"] : ["far", "sun"]);

    const toggleTheme = () => {
      theme.global.name.value = isDarkTheme.value ? "light" : "dark";
      isDarkTheme.value = !isDarkTheme.value;
      icon.value = isDarkTheme.value ? ["far", "moon"] : ["far", "sun"];
    };

    const state = reactive({
      drawer: false,
      search: {
        query: "",
        results: [],
        searching: false,
        loading: false,
      },
    });

    const toggleSearch = () => {
      state.search.searching = !state.search.searching;
    };

    return {
      state,
      icon,
      isDarkTheme,
      toggleTheme,
      toggleSearch,
    };
  },
};
</script>

<style scoped>
/* Estilos CSS específicos para este componente, se necessário */
.mouse {
  cursor: pointer;
}
</style>
