<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2023-01-13 21:34 -->
<!-- Description: -->
<template>
  <div>
    <header>
      <!-- Background image -->
      <div
        class="p-5 text-center bg-image"
        style="
          background-image: url('https://mdbcdn.b-cdn.net/img/new/slides/041.webp');
          height: 400px;
        ">
        <div class="mask" style="background-color: rgba(0, 0, 0, 0.6)">
          <div class="d-flex justify-content-center align-items-center h-100">
            <div class="text-white">
              <h1 class="mb-3">Marketplace</h1>
              <h4 class="mb-3">Compra a productores locales en Puno</h4>
              <router-link
                class="btn btn-primary btn-lg"
                to="/marketplace/map"
                role="button"
                >Ir al mapa</router-link
              >
            </div>
          </div>
        </div>
      </div>
      <!-- Background image -->
    </header>
    <div class="row">
      <div class="col">
        <h4 class="text-center my-3">Lista de Productos</h4>
        <Gallery></Gallery>
      </div>
    </div>
  </div>
</template>
<script>
/* Script part */
import Gallery from "./publications/Gallery.vue";
export default {
  name: "MarketplaceIndex",
  components: {
    Gallery
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
<style scoped></style>
