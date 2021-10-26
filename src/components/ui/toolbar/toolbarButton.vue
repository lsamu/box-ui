<template>
    <a :href='href' class='toolbar-button'>
        <slot></slot>
    </a>
</template>

<script>
export default {
    name: 'toolbarButton',
    props: {
        href: {
            type: String,
            default: '#'
        }
    }
}
</script>

<style lang='scss' scoped>

    a.toolbar-button  {
        display:flex;
        align-items: center;
        height: 100%;
        padding: 0px 15px;
        font-weight: bold;
        text-decoration: none;
        color: black;
    }
    a.toolbar-button:hover {
        background-color:rgba(black, .25);
    }
</style>
