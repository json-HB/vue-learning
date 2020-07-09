import Demo from 'src/components/demo.vue';
import HelloWorld from 'src/components/HelloWorld.vue';
import NotFound from 'src/components/notFound.vue';
import Slide from 'src/components/slide';
import A from 'src/components/a';
import B from 'src/components/b';

function lazyLoadView(AsyncView) {
    const AsyncHandler = () => ({
        component: AsyncView,
        // A component to use while the component is loading.
        loading: require('src/components/loading.vue').default,
        // A fallback component in case the timeout is exceeded
        // when loading the component.
        error: require('src/components/loading.vue').default,
        // Delay before showing the loading component.
        // Default: 200 (milliseconds).
        delay: 300,
        // Time before giving up trying to load the component.
        // Default: Infinity (milliseconds).
        timeout: 10000
    });

    return Promise.resolve({
        functional: true,
        render(h, { data, children }) {
            // Transparently pass any props or children
            // to the view component.
            return h(AsyncHandler, data, children);
        }
    });
}

export const adminRoute = [
    {
        path: '/admin',
        component: () =>
            import(/* webpackChunkName: "admin" */ 'src/components/admin'),
        meta: {
            title: 'vuex'
        }
    }
];

const routers = [
    {
        path: '/',
        components: {
            default: HelloWorld,
            slide: Slide
        },
        meta: {
            title: 'home'
        }
    },
    {
        path: '/a',
        component: A,
        meta: {
            title: 'A'
        }
    },
    {
        path: '/b',
        props: {
            name: 'haibo'
        },
        component: B,
        meta: {
            title: 'B'
        }
    },
    {
        path: '/demo',
        component: Demo,
        meta: {
            title: 'Demo'
        }
    },
    {
        path: '/vuex',
        component: () => lazyLoadView(import('src/components/vuex')),
        meta: {
            title: 'vuex'
        }
    },
    {
        path: '*',
        component: NotFound,
        meta: {
            title: 'NotFound'
        }
    }
];

export default routers;
