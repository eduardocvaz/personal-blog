import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { vuetify } from "./plugins/vuetify";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas); // Include needed solid icons
library.add(far); // Include needed regular icons

document.title = "Eduardo's Blog";

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(vuetify)
  .use(router)
  .mount("#app");
