import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const state = {
    count: 0,
    msg: 'initialize',
    todos: [
        {
            count: 1,
            id: 1,
            name: 'react',
            done: true
        },
        {
            count: 10,
            id: 2,
            name: 'angular',
            done: false
        },
        {
            count: 50,
            id: 3,
            name: 'vue',
            done: true
        },
        {
            count: 70,
            id: 4,
            name: 'rxjs',
            done: true
        }
    ]
};

const store = new Vuex.Store({
    state,
    getters: {
        todosLength: state => {
            return state.todos.filter(item => item.count > 1).length;
        },
        doneTodoLength: state => {
            return state.todos.filter(item => item.done).length;
        },
        filterCount: state => count => {
            return state.todos.filter(item => item.count > count).length;
        }
    },
    mutations: {
        increment(state) {
            state.count += 1;
        },
        decrement(state, payload) {
            state.count -= payload;
        },
        changeText(state, payload) {
            state.msg = payload;
        }
    },
    actions: {
        async actionIncrement({ commit, dispatch }) {
            const res = await dispatch('asyncDemo');
            return new Promise(r => {
                setTimeout(() => {
                    commit('changeText', res);
                    r();
                }, 1000);
            });
        },
        asyncDemo() {
            return new Promise(function(resolve) {
                setTimeout(() => {
                    resolve('hello world');
                }, 1000);
            });
        },
        getUser() {}
    }
});

export default store;
