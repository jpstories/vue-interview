import Vue from 'vue';
import Router from 'vue-router';
import VTable from '../components/table/v-table';
import userPayInfo from '../components/userPayInfo/userPayInfo';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'v-table',
            component: VTable,
        },
        {
            path: '/userinfo',
            name: 'userPayInfo',
            component: userPayInfo,
        },
    ],
    mode: 'history',
});
