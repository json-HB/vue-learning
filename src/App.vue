<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" />
        <div class="alert">{{ bus }}</div>
        <ul class="nav">
            <li class="nav-item">
                <router-link class="nav-link active" to="/">home</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link active" to="/a">a</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link active" to="/b">b</router-link>
            </li>
            <li class="nav-item">
                <router-link
                    class="nav-link"
                    :to="{
                        path: 'demo',
                        params: { userId: '123' },
                        query: { name: 'jason' }
                    }"
                    >demo</router-link
                >
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/vuex">vuex</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/admin">admin</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/notfound"
                    >notFound</router-link
                >
            </li>
        </ul>
        <transition name="fade">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
        <router-view name="slide"></router-view>
    </div>
</template>

<script>
import Demo from './components/demo.vue';
import { EventBus } from 'util/singal-bus';

export default {
    name: 'App',
    components: {
        Demo
    },
    data: function() {
        return {
            bus: 'hello bus'
        };
    },
    created() {
        const vm = this;
        EventBus.$on('change', function(msg) {
            vm.bus = msg;
        });
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
