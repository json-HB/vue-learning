<template>
    <div class="hello">
        <div>b</div>
        <div class="text-dark">{{ name }}</div>
        <wrap @click="say">
            <div class="demo">children</div>
            <alert show title="title" content="content"></alert>
        </wrap>
        <func :wrap="true" name="cao func"></func>
    </div>
</template>

<script>
import Wrap from './wrap';
import Alert from './alert';
import Func from './func';

export default {
    name: 'B',
    components: {
        Wrap,
        Alert,
        Func
    },
    props: ['name'],
    methods: {
        say() {
            console.log('say hello');
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
