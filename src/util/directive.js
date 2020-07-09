const demo = {
    bind(el) {
        console.log('el', el, 'bind');
    },
    inserted(el, binding) {
        el.focus();
        console.log(binding);
    },
    update(el) {
        console.log('el', el, 'update');
    }
};

const directiveInstall = function(vue) {
    vue.directive('demo', demo);
};

export default directiveInstall;
