<template>
    <a :href='href' class='toolbar-link'>
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
    .toolbar-link {
        text-decoration: none;
    }
</style>
