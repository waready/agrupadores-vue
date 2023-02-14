<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2023-01-13 22:12 -->
<!-- Description: -->
<template>
  <div ref="elMap" class="app-store-map"></div>
</template>
<script>
/* Script part */
export default {
  name: "MapEl",
  components: {
    //
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
    this.$options.markers = new Array();
    // https://www.google.com/maps?ll=-15.322977,-70.028362&z=8&t=m&hl=es-ES&gl=US&mapclient=apiv3
    const uluru = { lat: -15.206391, lng: -69.995404 };
    const map = new window.google.maps.Map(this.$refs.elMap, {
      zoom: 7,
      center: uluru
    });
    this.$options.map = map;
  },

  methods: {
    //
    //
    //
  }
};
</script>
<style scoped>
.app-store-map {
  width: 100%;
  height: 500px;
}
</style>
