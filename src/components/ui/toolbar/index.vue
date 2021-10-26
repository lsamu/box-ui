<template>
    <div class='toolbar'>
        <div class='toolbar-column-left'>
            <div>
                <slot name='left'>
                    <q-icon name='branding_watermark' style='font-size:50px;'></q-icon>
                    Logo
                </slot>
            </div>
        </div>

        <div class='toolbar-column-middle'>
            <slot name='middle'></slot>
        </div>

        <div class='toolbar-column-right '>
            <slot name='right'>
            </slot>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    name:"Toolbar",
    setup() {
        
    },
})
</script>

<style lang='scss' scoped>
    .toolbar {
        display: flex;
        flex-direction: row;
        width:100%;
    }
    .toolbar-column {
        @extend .toolbar;
        flex-grow: 1;
        width:33%;
    }
    .toolbar-column-left {
        @extend .toolbar-column;
        justify-content: flex-start;
        align-items:center;
        padding: 0px 10px;
    }
    .toolbar-column-middle {
        @extend .toolbar-column;
        justify-content: center;
        align-items:center;
        padding: 0px 10px;
    }
    .toolbar-column-right {
        @extend .toolbar-column;
        justify-content: flex-end;
        align-items:center;
        padding: 0px 10px;
    }

</style>
