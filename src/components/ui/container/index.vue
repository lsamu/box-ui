<template>
  <box-container-shop></box-container-shop>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import Shop from "./shop/shop.vue";

export default defineComponent({
  name: "Container",
  components: {
    "box-container-shop": Shop,
  },
  setup() {
      
  },
});
</script>
