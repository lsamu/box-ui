<template>
   <div>
        <vue-otp-2 
        :length="currentOption.length"
        :join-character="currentOption.join_character"
/>
    </div>
</template>
<script>
import VueOtp2 from 'vue-otp-2';
const propsDefault = {
  length:6,
  join_character:"-"
};

export default {
  name:"Otp",
  components: {
    VueOtp2,
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    currentOption() {
      let list = Object.assign(propsDefault, this.option || {});
      return list;
    },
  },
};
</script>
<style lang="scss">
.vue-otp-2 {
  display: flex;
  justify-content: space-between;

  div {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      max-width: 30px;
      padding: 10px 8px;
      font-size: 20px;
      border-radius: 3px;
      border: 1px solid #cecece;
      text-align: center;
    }

    span {
      display: block;
      flex: 1;
      text-align: center;
    }
  }
}
</style>