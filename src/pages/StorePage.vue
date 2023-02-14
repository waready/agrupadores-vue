<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2022-12-15 19:48 -->
<!-- Description: -->
<template>
  <div class="row">
    <div class="col">
      <StoreMap
        ref="elMap"
        @clickMarker="clickMarkerHandler($event)"></StoreMap>
    </div>
  </div>
</template>
<script>
import StoreMap from "../components/StoreMap.vue";
export default {
  name: "StorePage",
  components: {
    StoreMap
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
    clickMarkerHandler(e) {
      this.$router.push({ name: "marker-view", params: { id: e } });
    }
    //
    //
  }
};
</script>
<style scoped></style>
