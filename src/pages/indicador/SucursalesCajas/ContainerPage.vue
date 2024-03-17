<template>
  <div class="container">
    <Navtab class="mb-3"></Navtab>
    <div>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Navtab from "./Navtab.vue";
export default {
  components: {
    Navtab
  },

  // directives
  // filters

  props: {
    //
  },

  data: () => ({
    //
  }),

  computed: {
    //
  },

  // watch: {},

  mounted() {
    //
  },

  methods: {
    //
    //
    //
  }
};
</script>

<style scoped>

</style>
