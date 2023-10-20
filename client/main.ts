import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import "./app.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faFaceAngry, faFaceFrown, faFaceMeh, faFaceSadCry, faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { faAdd, faCheck, faHeart, faLocationArrow, faLocationDot, faMap, faPen, faQuestion, faSpinner, faThumbsUp, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from "./App.vue";
import router from "./router";

library.add(faLocationArrow, faAdd, faHeart, faThumbsUp, faCheck, faQuestion, faFaceSadCry, faFaceAngry, faUserGroup, faLocationDot, faPen, faSpinner, faMap, faFaceSmile, faFaceMeh, faFaceFrown);

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

app.use(pinia);
app.use(router);
app.use(VueQueryPlugin);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
