<template>
    <div class="hello">
        <div class="text-align">{{ $t('name') }}</div>
        <div class="text-align">{{ $t('title', { msg: 'home' }) }}</div>
        <button @click="change" type="button" class="btn btn-warning">
            change
        </button>
        <input type="text" v-demo.filter="'demo'" />
        <c
            :age="20"
            :title="title"
            data="data"
            @input="say"
            v-on:change="apple"
            v-bind:yellow.sync="react"
            @mouseenter.native="chnageYellow"
        >
            <template slot="a">
                <p>I am solt name a</p>
            </template>
            <p>hello I am solt</p>
        </c>
        <div>{{ react }}</div>
        <div class="nav nav-pills">
            <li class="nav-item">
                <a
                    @click="changeTab('tab1')"
                    class="nav-link"
                    :class="{ active: activeItem == 'tab1' }"
                    >tab1</a
                >
            </li>
            <li class="nav-item">
                <a
                    @click="changeTab('tab2')"
                    class="nav-link"
                    :class="{ active: activeItem == 'tab2' }"
                    >tab2</a
                >
            </li>
        </div>
        <div class="tab-content">
            <div class="tab1" v-show="activeItem == 'tab1'">
                <h1>{{ activeItem }}</h1>
                <input @paste="paste($event)" key="tab1" type="text" />
            </div>
            <div class="tab1" v-show="activeItem == 'tab2'">
                <h1>{{ activeItem }}</h1>
                <input key="tab2" type="text" />
            </div>
        </div>
    </div>
</template>

<script>
import { Mixin } from 'util/mixin';
import { EventBus } from 'util/singal-bus';
import alert from 'util/alert';

export default {
    mixins: [Mixin],
    name: 'A',
    data: function() {
        return {
            title: '',
            react: 'rect',
            activeItem: 'tab1'
        };
    },
    methods: {
        change() {
            EventBus.$emit('change', 'cao xushan');
            this.title = Math.random().toString();
            alert.show({});
        },
        say(ev) {
            console.log(ev.target.value);
        },
        apple(data) {
            console.log(data);
        },
        chnageYellow() {
            this.log('chnageYellow');
        },
        changeTab(type) {
            this.log(type);
            this.activeItem = type;
        },
        paste(ev) {
            this.log(ev.clipboardData.getData('text'));
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
