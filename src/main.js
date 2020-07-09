import Vue from 'vue';
import App from './App.vue';
import './styles/bootstrap.css';
import router from 'route/index';
import Directive from 'util/directive';
import i18n from './lang/index';
import store from 'store/index';
import * as Filters from './util/filter';
import fetch from 'util/server';

import C from 'component/c1';

Vue.config.productionTip = false;

Vue.prototype.log = function(...arg) {
    console.log.apply(console, arg);
};

Directive(Vue);

Object.entries(Filters).forEach(([key, value]) => {
    Vue.filter(key, value);
});

Vue.prototype.fetch = fetch;

Vue.component('c', C);

function render() {
    setTimeout(() => {
        router.addRoutes(require('./router/routers.js').adminRoute);
        const AppRoot = new Vue({
            router,
            i18n,
            store,
            render: h => h(App)
        });
        document.querySelector('.app-loading').classList.add('d-none');
        AppRoot.$mount('#app');
    }, 100);
}
render();
