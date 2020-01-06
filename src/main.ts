import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/registerServiceWorker";
import "@/registerGlobalComponents";

Vue.config.productionTip = false;
console.log(process.env.NODE_ENV);
console.log(process.env.VUE_APP_URL);

import "vsuite/dist/styles/vsuite.css";
import { BaseButton } from "vsuite";
Vue.component("BaseButton", BaseButton);

let a = "1";

import "./axios.tool"; // 导入封装好的axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
