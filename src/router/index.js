import Vue from 'vue';
import VueRouter from 'vue-router';
import routers from './routers';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'hash',
    routes: routers,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
});

router.beforeEach((to, from, next) => {
    // console.log(to, from);
    next(vm => {
        // console.log(vm);
    });
});

router.afterEach((to, from) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
});

export default router;
