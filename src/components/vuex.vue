<template>
    <div class="hello">
        <div>vuex</div>
        <div class="text-dark">{{ count }}</div>
        <ul class="list-group list-group-horizontal">
            <li
                class="list-group-item "
                v-for="(item, index) in todos"
                :key="item.id"
                :class="[getClass(index)]"
            >
                {{ item.name }}
                <span class="badge badge-secondary">{{ index }}</span>
            </li>
        </ul>
        <div class="text-success bg bg-dark font-weight-bold text-muted">
            {{ todosLength }}
        </div>
        <div class="text-info">{{ doneTodoLength }}</div>
        <div class="text-error">{{ filterCount(40) }}</div>
        <div>{{ msg }}</div>
        <button class="btn btn-primary" @click="increment(1)">increment</button>
        <button class="btn btn-danger" @click="decrement(2)">decrement</button>
        <button class="btn btn-danger" @click="actionIncrement">
            action increment
        </button>
        <button class="btn btn-danger" @click="getUser">fetch data</button>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
    name: 'Vuex',
    props: ['name'],
    mounted() {
        this.log('vuex mounted');
    },
    computed: {
        page: function() {
            return 10;
        },
        ...mapState(['count', 'todos', 'msg']),
        ...mapGetters(['todosLength', 'doneTodoLength', 'filterCount'])
    },
    methods: {
        getClass: function(i) {
            const colorMap = {
                '0': 'success',
                '1': 'primary',
                '2': 'danger'
            };
            i %= 3;
            return `list-group-item-${colorMap[i]}`;
        },
        getUser() {
            this.fetch
                .post('/form ', {
                    data: {
                        id: 12
                    }
                })
                .then(res => {
                    this.log(res);
                });
        },
        ...mapMutations(['increment', 'decrement']),
        ...mapActions(['actionIncrement'])
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
