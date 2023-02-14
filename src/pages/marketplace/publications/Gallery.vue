<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2023-01-16 22:25 -->
<!-- Description: -->
<template>
  <div class="row">
    <div
      class="col-sm-6 col-md-4 col-lg-3 mb-3"
      v-for="(l, i) in list"
      :key="i">
      <div class="card">
        <img
          class="card-img-top"
          src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp"
          alt="Imagen ref" />
        <div class="card-body">
          <h5 class="card-title">{{ l.producto_obj.nombre }}</h5>
          <p class="card-text">S/ {{ l.precio }}</p>
          <a class="btn" href="">Comprar</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MarketplaceService from "src/pages/marketplace/MarketplaceService.js";
/* Script part */
export default {
  name: "GalleryEl",
  components: {
    //
  },

  // directives
  // filters

  props: {
    //
  },

  data: () => ({
    list: []
  }),

  computed: {
    //
  },

  // watch: {},

  mounted() {
    this.loadData();
  },

  methods: {
    async loadData() {
      var res = await MarketplaceService.getPublicacions({ page_size: 40 });
      this.list = res.results;
    }
    //
    //
  }
};
</script>
<style scoped></style>
