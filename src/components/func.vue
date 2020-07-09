
<script>
export default {
    name: 'func',
    props: {
        name: {
            type: String,
            default: 'default name'
        }
    },
    methods: {
        handClick() {
            console.log('handClick');
        }
    },
    render(h, context) {
        console.log(this.$attrs);
        const span = <span>{this.name}</span>;
        return this.$attrs.wrap ? (
            <div class="has-wrap" on-click={this.handClick}>
                {span}
            </div>
        ) : (
            span
        );
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
