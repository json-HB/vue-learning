<template>
    <div class="hello">
        <div>C</div>
        <div class="text-dark">{{ name }}</div>
        <slot :name="slotName">I am default A</slot>
        <div class="alert alert-info">
            <p>{{ title }}</p>
            <p>{{ age }}</p>
            <p>{{ data }}</p>
        </div>
        <input type="text" v-on="$listeners" />
        <button class="btn btn-dark" @click="emit1">emit parent</button>
        <div @mouseenter="changeYelow">{{yellow}}</div>
    </div>
</template>

<script>
export default {
    name: 'C',
    props: {
        title: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: false,
            default: 29
        },
        data: {
            validator: function(val) {
                return typeof val == 'string';
            }
        },
        change: {
            type: Function
        },
        yellow: {
            type: String
        }
    },
    data: function() {
        return {
            name: 'C Component',
            slotName: 'a'
        };
    },
    methods: {
        changeYelow() {
            this.$emit('update:yellow', 'angular');
        },
        emit1() {
            this.$emit('change', 'cao xushan');
        }
    },
    updated() {
        this.log(this.title);
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
