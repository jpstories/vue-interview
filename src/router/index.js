import Vue from 'vue';
import Router from 'vue-router';
import VTable from '../components/table/v-table';
import PaymentInfo from '../components/PaymentInfo/PaymentInfo';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'v-table',
            component: VTable,
        },
        {
            path: '/userpayments',
            name: 'PaymentInfo',
            component: PaymentInfo,
        },
    ],
    mode: 'history',
});
