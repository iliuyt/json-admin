import Vue from "vue";
import Router from "vue-router";

const Layout = () => import("../views/Layout/index.vue");
const home = () => import("../views/home/index.vue");

Vue.use(Router);

export const asyncRouterMap = [
    {
        path: "/home",
        name: "home",
        meta: { title: "主页" },
        component: Layout,
        children: [
            {
                path: "",
                redirect: "/index",
                hidden: true
            },
            {
                path: "index",
                name: "homeIndex",
                component: home,
                meta: { title: "主页" }
            }
        ]
    }
];

export default new Router({
    mode: "hash",
    routes: []
});
