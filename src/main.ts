import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";
Vue.use(VueCompositionAPI);

import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI, { size: "mini" });

import VCharts from "v-charts";
Vue.use(VCharts);

import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";
Vue.component("v-icon", Icon);

import BoxUI from "./components/ui/main";
Vue.use(BoxUI, { option: true });

import BoxEditor from "./components/editor/main";
Vue.use(BoxEditor, { option: true });

import BoxData from "./components/data/main";
Vue.use(BoxData, { option: true });

import VueDraggableResizable from "vue-draggable-resizable-gorkys";
import "vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css";

Vue.component("vue-draggable-resizable", VueDraggableResizable);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
