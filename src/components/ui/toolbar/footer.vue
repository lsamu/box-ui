<template>
    <div class='footer'>
        <div class='contact-footer' v-if="!hideContactSection">
            <template>
                <slot name='contact'>
                    contact-us@test.com
                </slot>
            </template>
        </div>
        <div class='legal-footer' v-if="!hideLegalSection">
            <template>
                <slot name='legal'>
                    &copy;&nbsp;&nbsp;Site Name
                </slot>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'toolbar-footer',
    props: {
        hideContactSection: {
            type: Boolean,
            default: false
        },
        hideLegalSection: {
            type: Boolean,
            default: false
        }
    },
}
</script>

<style lang='scss' scoped>
    .footer {
        width:100%;
    }
    .flexColumn {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .contact-footer {
        @extend .flexColumn;
        align-content: center;
        align-items: center;
        padding: 16px 0px 8px;
    }
    .legal-footer {
        @extend .flexColumn;
        align-content: center;
        align-items: center;
        padding: 8px 0px 16px;
    }
</style>
