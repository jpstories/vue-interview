import Vue from 'vue';
import Router from 'vue-router';

import UserTable from '../components/UserTable/UserTable';
import UserDetails from '../components/UserDetails/UserDetails';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'usertable',
            component: UserTable,
        },
        {
            path: '/user/:id/details',
            name: 'details',
            component: UserDetails,
            props: true
        },
    ],
    mode: 'history',
});
