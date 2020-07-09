import Alert from 'component/alert';
import Vue from 'vue';

const alert = {
    show(opt = {}) {
        const conA = Vue.extend(Alert);
        const instance = new conA();
        instance.vm = instance.$mount();
        instance.vm = Object.assign(instance.vm, opt);
        document.body.appendChild(instance.vm.$el);
        instance.vm.show = true;
    }
};

export default alert;
