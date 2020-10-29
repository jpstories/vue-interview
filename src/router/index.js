import Vue from 'vue';
import Router from 'vue-router';
import VTable from '../components/table/v-table';
import VPay from '../components/userPayment/v-pay';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'v-table',
            component: VTable,
        },
        {
            path: '/payment',
            name: 'v-pay',
            component: VPay,
        },
    ],
    mode: 'history',
});
