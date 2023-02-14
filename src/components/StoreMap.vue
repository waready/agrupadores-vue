<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2022-12-15 23:06 -->
<!-- Description: -->
<template>
  <div ref="elMap" class="app-store-map">maps render</div>
</template>
<script>
import markers from "./demoMarkets.js";
export default {
  name: "StoreMap",
  components: {
    //
  },

  // directives
  // filters

  props: {
    //
  },

  data: () => ({
    map: null,
    markers: new Map()
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
    markers.map((x) => {
      const marker = new window.google.maps.Marker({
        position: {
          lat: x.lat,
          lng: x.lng
        },
        map,
        label: "A",
        title: x.name,
        clickable: true,
        icon: x.iconSrc
      });
      marker.addListener("click", (e) => {
        this.markClick(e, x.id);
      });
      this.$options.markers.push(marker);
      this.markers.set(x.id.toString(), x);
    });
  },

  methods: {
    markClick(event, id) {
      this.$emit("clickMarker", id);
    }
    //
    //
  }
};
</script>
<style scoped>
.app-store-map {
  height: 400px;
  width: 100%;
}
</style>
