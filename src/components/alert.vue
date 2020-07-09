<template>
    <div class="alert alert-info" v-show="show">
        <h4>{{ title }}</h4>
        <div class="bg bg-primary">{{ content }}</div>
        <slot>I am default slot</slot>
    </div>
</template>

<script>
import i18n from '../lang/index';
export default {
    name: 'alert',
    props: {
        title: {
            type: String,
            default: i18n.t('alert')
        },
        content: {
            type: String,
            default: 'content'
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {};
    },
    mounted() {
        console.log('mounted alert');
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.alert {
    display: absolute !important;
    width: 30rem;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
}
</style>
