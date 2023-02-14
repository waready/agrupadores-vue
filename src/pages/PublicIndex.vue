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
              <h1 class="mb-3">Agrupadores</h1>
              <h4 class="mb-3">Listado de Agrupadores Bantotal</h4>
              <router-link
                class="btn btn-primary btn-lg"
                to="/agrupadores"
                role="button"
                >Ir al contenido</router-link
              >
            </div>
          </div>
        </div>
      </div>
      <!-- Background image -->
    </header>
  </div>
</template>
<script>
/* Script part */
// import Gallery from "./publications/Gallery.vue";
export default {
  name: "MarketplaceIndex",
  components: {
    // Gallery
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
