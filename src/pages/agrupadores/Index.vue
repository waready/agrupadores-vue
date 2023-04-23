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
          <div class="card h-100 "  @click="indicadorID(item.codigo)">
            <div class="card-body text-center">
              <h5 class="card-title mb-2 hover-underline-animation">{{ item.descripcion }}</h5>
              <div>
                <i :class="[item.icon,'mt-3']"></i>
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
       
        this.agrupadores = response.sdtAgrupadores.SdtsBTAgrupador.map((item) => {
          switch (item.codigo) {
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
.card {
  cursor: pointer;
}
.hover-underline-animation {
  position: relative;
  color:#0087ca;
}


.hover-underline-animation:after {
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #0087ca;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
