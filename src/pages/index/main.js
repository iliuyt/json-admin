import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import api from "@/api";
import router from "./router";

Vue.config.productionTip = false;

import filters from "@/plugins/filters.js";

Vue.use(filters);
Vue.use(api);

// 总线
Vue.prototype.$BUS = new Vue();

const start = async () => {
    try {
        // 基础数据初始化
    } catch (error) {
        // 错误处理
        console.log("基础数据初始化失败", error);
        return;
    }
    let vm = new Vue({ router, store, render: h => h(App) });
    // 绑定dom
    vm.$mount("#app");
};

start();
