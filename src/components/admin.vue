<template>
    <div>
        <div class="text-primary">{{ msg }}</div>
        <div class="text-dark" v-once>{{ light }}</div>
        <div v-html="html"></div>
        <div class="text-dark">{{ reverseMsg }}</div>
        <ul class="list-group">
            <li
                class="list-group-item"
                v-for="(item, index) in items"
                :key="index"
            >
                <span>{{ item.message }}</span>
            </li>
        </ul>
        <ul>
            <li v-for="(name, key) in objs" :key="name">
                {{ key }}:{{ name }}
            </li>
        </ul>
        <div class="alert alert-info">
            <input type="text" v-model="name" />
            <input type="text" v-model="value" />
            <button @click="addItem">add</button>
            <button @click="defaultAdd">default add</button>
            <button @click="assign">assign</button>
        </div>
        <alert ref="alert"></alert>
        <button @click="showAlert">show alert</button>
        <div v-if="show">show</div>
        <div v-else>hodden</div>
        <button @click="html = '<b>hello</b>'">change</button>
        <button
            class="btn btn-block btn-secondary"
            :class="[btn]"
            @click="changeMsg(msg)"
        >
            change
        </button>

        <D
            v-for="item in 3"
            :key="item"
            :data="count"
            v-on:myChange="addCount"
            class="hello world"
            data-name="haibo"
        >
            <div class="text-dark">slot</div>
            <div class="header w-25" slot="header">header</div>
            <div class="flotter" slot="fotter">flotter</div>
        </D>
        <label for="trueFalse">{{ check }}</label>
        <input id="trueFalse" type="checkbox" v-model="check" />
        <base-checkbox v-model="checkboxA" v-on:focus="say('hello')" />
        <div>{{ checkboxA }}</div>
        <base-demo1 v-bind:title.sync="title" />
        <div>{{ title }}</div>
        <ul class="nav justify-content-center">
            <li class="nav-item" @click="tabCom = 'tab1'">nav1</li>
            <li class="nav-item" @click="tabCom = 'tab2'">nav2</li>
        </ul>
        <div class="tab-content">
            <keep-alive :include="/tab[\w]+/">
                <component :is="tabCom" />
            </keep-alive>
        </div>
        <transition name="haibo">
            <hello-world v-if="showTransition" />
        </transition>
        <button @click="showTransition = !showTransition">transform</button>
        <input type="text" v-demo:success.foo.bar="'admin'" />
        <div class="text-info">{{ msg | demoFilter('concat', 'haibo') }}</div>
        <anchored :level="level">hello world</anchored>
        <select v-model="level">
            <option v-for="(item, index) in 6" :key="index" :value="item"
                >H{{ item }}</option
            >
        </select>
    </div>
</template>

<script>
import i18n from '../lang/index';
import Vue from 'vue';
import Alert from './alert';
import D from './d';

Vue.component('anchored', {
    functional: false,
    render: function(h) {
        return h(
            `h${this.level}`,
            {
                attrs: {
                    contentEditable: true
                }
            },
            [
                this.$slots.default,
                h(
                    'span',
                    { domProps: { innerHTML: 'I am inner' } },
                    'I am span'
                ),
                Array.from({ length: 10 }, (item, index) => index).map(item =>
                    h('p', {
                        domProps: { innerHTML: item },
                        style: {
                            display: 'inline'
                        },
                        on: {
                            click: function() {
                                console.log(item);
                            }
                        }
                    })
                )
            ]
        );
    },
    props: {
        level: {
            type: Number,
            required: true,
            default: '1'
        }
    }
});

Vue.component('hello-world', {
    template: '#hello-world-template'
});

Vue.component('async-base', function() {
    const asyncCom = () => ({
        component: import('./b.vue'),
        loading: Loading,
        delay: 4000,
        setTimeout: 5000
    });
    return Promise.resolve({
        functional: true,
        render(h, { data, children }) {
            return h(asyncCom, data, children);
        }
    });
    // setTimeout(() => {
    //     resolve({
    //         template: `
    //     <div>async component</div>
    // `
    //     });
    // }, 2000);
    // require(['./b.vue'], resolve);
});

const Demo = Vue.component('base-checkbox', {
    model: {
        prop: 'checkboxA',
        event: 'input'
    },
    props: {
        checkboxA: String
    },
    computed: {
        allListener: function() {
            return Object.assign({}, this.$listeners, {
                input: ev => {
                    this.$emit('input', ev.target.value);
                }
            });
        }
    },
    template: `
    <div>
        <input
        v-on="allListener"
      id='name'
      type="text"
      v-bind:value="checkboxA"
    >
    <label for='name'>checkbox</label>
    </div>
  `
});

const Demo1 = Vue.component('base-demo1', {
    props: {
        title: String
    },
    template: `
    <div>
        <input
      type="text"
      v-bind:value="title"
      v-on:input="$emit('update:title', $event.target.value)"
    >
    </div>
  `
});
Vue.component('tab1', {
    name: 'tab1',
    inject: ['name'],
    template: `
    <div>
        <input
      type="text"
      placeholder='tab1'
    >
    <b>{{name}}</b>
    </div>
  `
});
Vue.component('tab2', {
    props: {
        title: String
    },
    template: `
    <div>
        <input
      type="text"
    placeholder='tab2'
    >
    </div>
  `
});
export default {
    name: 'admin',
    provide: function() {
        return {
            name: 'haibo'
        };
    },
    components: {
        Alert,
        D
    },
    props: {
        content: {
            type: String,
            default: 'content'
        }
    },
    data: function() {
        return {
            level: 1,
            showTransition: false,
            tabCom: 'tab1',
            title: '',
            checkboxA: '',
            check: false,
            show: false,
            msg: 'admin',
            btn: '',
            light: 'dark',
            html: '',
            show: true,
            items: [{ message: 'Foo' }, { message: 'Bar' }],
            value: '',
            name: '',
            count: 0,
            objs: {
                name: 'json'
            }
        };
    },
    computed: {
        reverseMsg() {
            return this.msg
                .split('')
                .reverse()
                .join('');
        }
    },
    beforeCreate() {
        this.log('beforeCreate', this);
    },
    created() {
        this.log('created', this);
    },
    methods: {
        say() {
            this.log('day');
        },
        addCount(c) {
            this.log('change wrap');
            this.count++;
        },
        showAlert() {
            this.log(this.$refs.alert);
            this.$refs.alert.show = true;
        },
        defaultAdd() {
            this.items.push({
                message: 'haibo'
            });
        },
        assign() {
            this.objs = Object.assign({}, this.objs, {
                apple: '3699',
                react: '16.13.0'
            });
        },
        addItem(data) {
            this.$set(this.objs, this.name, this.value);
            this.items.splice(1, 1);
            this.$nextTick(() => {
                this.value = '';
                this.name = '';
            });
        },
        changeMsg(msg) {
            this.log(msg);
            this.btn = 'text-danger';
            this.log(this);
        }
    },
    beforeMount() {
        this.log('beforeMount');
    },
    beforeDestroy() {
        this.log('beforeDestroy');
    },
    mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
