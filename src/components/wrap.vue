
<script>
export default {
    name: 'Wrap',
    functional: true,
    render(h, { props, slots, listeners }) {
        const childrens = slots().default;
        const vnode = childrens[1];
        console.log(vnode, slots());
        return h(
            'div',
            {
                on: {
                    click: listeners.click
                }
            },
            [vnode]
        );
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
