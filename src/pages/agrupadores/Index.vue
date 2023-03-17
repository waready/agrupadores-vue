<template>
  <div class="mt-3">
    <h2>Agrupadores</h2>
    <hr />
    <!-- {{ agrupadores }} -->
    <div class="row">
      <template v-if="agrupadores">
        <div
          class="col-md-3 col-sm-5 mb-2"
          v-for="(item, index) in agrupadores"
          :key="index">
          <div class="card h-100">
            <div class="card-body text-center">
              <h5 class="card-title mb-2">{{ item.Descripcion }}</h5>
              <div>
                <!-- <div
              :class="item.descripcion.length < 20 ? 'mx pt-3' : 'pt-1'"> -->
                <i :class="item.icon"></i>
                <p class="card-text mt-2">
                  Indicador N°
                  <a href="#" class="card-link">{{ item.codigo }}</a>
                </p>
                <div class="content mb-2">
                  <button class="btn btn-info format" @click="indicadorID(item.Codigo)">
                  Indicador
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <loading v-else></loading>
    </div>
  </div>
</template>
<script>
import ApiService from "@/utils/ApiService.js";

import Loading from "@/components/Loading.vue";
export default {
  // name: "MarketplaceIndex",
  components: { Loading },

  // directives
  // filters

  props: {
    //
  },

  data: () => ({
    agrupadores: null
  }),

  computed: {
    //
  },

  // watch: {},

  mounted() {
    this.getAllAgrupadores();
  },

  methods: {
    async getAllAgrupadores() {
      await ApiService.GetAgrupadores().then((response) => {
       
        this.agrupadores = response.sdtAgrupadores.sBTAgrupador.map((item) => {
          switch (item.Codigo) {
            case 100:
              // "Condiciones Generales"
              item.icon = "fas fa-wrench fa-5x";
              break;
            case 200:
              // "Cajas y Sucursales"
              item.icon = "fas fa-building fa-5x";
              break;
            case 300:
              // "Contabilidad"
              item.icon = "fas fa-file-contract fa-5x";
              break;
            default:
              // sin icon
              item.icon = "";
              break;
          }
          console.log(item);
          return item;
        });
      });
    },
    indicadorID(id) {
      this.$router.push({ path: `/indicador/${id}` });
    }
    //
    //
  }
};
</script>
<style scoped>
.content{
  display: flex;
  align-items: center;
  justify-content: center;
}
.format{
  margin-bottom: 3%;
  position: absolute;
  bottom: 0;  
}
</style>
