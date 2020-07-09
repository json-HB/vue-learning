<template>
    <div class="d">
        <span>{{ calcCount }}</span>
        <button @click="add">add</button>
        <slot></slot>
        <slot name="header"></slot>
        <slot name="fotter"></slot>
    </div>
</template>

<script>
export default {
    name: 'D',
    props: {
        data: {
            type: Number,
            required: false
        }
    },
    data: function() {
        return {};
    },
    computed: {
        calcCount: function() {
            return this.$props.data;
        }
    },
    created() {
        // this.log(this.$attrs);
    },
    updated() {
        // this.log('update', this.$props);
    },
    methods: {
        add() {
            // this.log('myChange');
            this.$emit('myChange', 22);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
