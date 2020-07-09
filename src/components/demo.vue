<template>
    <div class="container" @scroll.passive="scroll($event)">
        <p class="text-center text-primary">
            <strong>{{ msg }}</strong>
        </p>
        <p>{{ $route.params.userId }}</p>
        <button type="form-control" @click="reverseMsg">
            reverseMessage
        </button>
        <input type="form-control" v-model="msg" />
        <button @click="send" class="btn btn-info">send</button>
        <div class="spinner-border text-info m-5" v-if="loading">
            <div class="sr-only">loading</div>
        </div>
        <div class="alert alert-info" v-else>
            <strong>name</strong>&emsp; <span>{{ userInfo.name }}</span>
        </div>
        <div v-once>{{ msg }}</div>
        <div v-html="rawHtml"></div>
        <p>{{ msgNow }}</p>
        <input type="text" v-model="firstName" />
        <p class="mb-0">{{ firstName }}</p>
        <p class="d-block">{{ fullName }}</p>
        <div
            class="text-center"
            @click="active = !active"
            :class="{ 'text-primary': active }"
        >
            I am Center
        </div>
        <div :class="classObj">classObj</div>
        <button class="btn btn-info" @mouseenter="changeClassObj">
            change blove color
        </button>
        <button :class="[btn, btnInfo]">class Array</button>
        <div
            class="text-center bg bg-dark"
            style="color: red;"
            :style="styleObj"
        >
            style demo
        </div>
        <button @click="addItem" class="btn btn-primary">add</button>
        <button @click="changeName" class="btn btn-primary">changeName</button>
        <ul class="list-group list-unstyled">
            <li
                class="list-item active ml-2"
                v-for="(item, index) in todos"
                :key="item.text"
            >
                {{ item.text }} : {{ index }}
            </li>
        </ul>
        <div class="row flex-row">
            <div class="col" v-for="i in 10" :key="i">{{ i }}</div>
        </div>
        <div class="badge badge-info">badge</div>
        <div>
            <input type="text" v-model="change" />
            <p>{{ change }}</p>
            checked: <input type="checkbox" v-model="checked" /> {{ checked }}
        </div>
        <form class="form-inline">
            <div class="form-control">
                <label for="exampleInputEmail1">Email address</label>
                <input
                    v-model="checkboxGroup"
                    type="checkbox"
                    value="react"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                />
                <input
                    v-model="checkboxGroup"
                    type="checkbox"
                    value="vue"
                    class="form-control"
                    id="exampleInputEmail2"
                    aria-describedby="emailHelp"
                />
                <input
                    v-model="checkboxGroup"
                    type="checkbox"
                    value="angular"
                    class="form-control"
                    id="exampleInputEmail3"
                    aria-describedby="emailHelp"
                />
                {{ checkboxGroup }}
                <small id="emailHelp" class="form-text text-muted"
                    >We'll never share your email with anyone else.</small
                >
                <input type="radio" value="yes" v-model="radio" />
                <input type="radio" value="no" v-model="radio" />
                <p class="form-text">{{ radio }}</p>
            </div>
        </form>
    </div>
</template>

<script>
import Ajax from 'util/server';

export default {
    name: 'Demo',
    components: {},
    data: function() {
        return {
            msg: 'vue hello',
            todos: [
                { text: '学习 JavaScript' },
                { text: '学习 Vue' },
                { text: '整个牛项目' }
            ],
            show: false,
            rawHtml: '<strong>I am Strong</strong>',
            firstName: '',
            lastName: '',
            fullName: '',
            active: false,
            classObj: {
                'bg-dark': true,
                'text-light': true
            },
            btn: 'btn',
            btnInfo: 'btn-info',
            styleObj: {
                fontSize: '30px'
            },
            userInfo: {},
            loading: false,
            change: '',
            checked: true,
            checkboxGroup: [],
            radio: ''
        };
    },
    mounted() {
        this.log('mounted', this);
    },
    computed: {
        msgNow: function() {
            return this.msg + Date.now();
        }
    },
    watch: {
        firstName: function(val) {
            this.fullName = this.firstName + this.lastName;
        }
    },
    methods: {
        scroll(ev) {
            console.log('scroll');
        },
        changeName() {
            this.$set(this.userInfo, 'name', 'jason-haibo');
        },
        addItem() {
            // this.todos.push({
            //     text: Date.now() + Math.random() + ''
            // });
            this.$set(this.todos, 0, { text: 'haibo' });
        },
        changeClassObj() {
            this.classObj['bg-dark'] = false;
        },
        send() {
            this.log(this.$router);
            const self = this;
            this.loading = true;
            Ajax.get('/getUserInfo')
                .then(res => {
                    console.log(res);
                    self.loading = false;
                    self.userInfo = res.data;
                })
                .catch(err => {
                    console.error(err, 'error');
                })
                .finally(() => {
                    self.loading = false;
                });
        },
        reverseMsg() {
            this.msg = this.msg
                .split('')
                .reverse()
                .join('');
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.demo {
    color: red;
    button {
        margin-left: 20px;
    }
}
.m {
    width: 100%;
    overflow: hidden;
    .l,
    .r,
    .ml {
        padding-bottom: 9999999px;
        margin-bottom: -9999999px;
        float: left;
        width: 200px;
        overflow: hidden;
        white-space: pre-wrap;
    }
    .l {
        background: red;
    }
    .r {
        background: blue;
    }
    .ml {
        background: yellow;
    }
}
.container {
    &::-webkit-scrollbar {
        background: red;
    }
    &::-webkit-scrollbar-thumb {
        background: blue;
        border-radius: 10%;
    }
}
</style>
