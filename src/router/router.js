import Vue from "vue";
import Router from "vue-router";

import HomePage from "../pages/HomePage/HomePage";
import PaymentsPage from "../pages/PaymentsPage/PaymentsPage";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "homepage",
            component: HomePage,
        },
        {
            path: "/user/:id/payments",
            name: "payments",
            component: PaymentsPage,
            props: true,
        },
    ],
    mode: "history",
});
