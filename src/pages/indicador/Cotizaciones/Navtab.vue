<template>
  <div>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link" :class="{ active: $route.name == 'monedas' }" >
          Monedas
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: $route.name == 'indices' }">
          Indices
        </a>
      </li>
    </ul>
    <div v-if="monedas">
      <div class="card">
        <div class="row">
          <div class="col-md-12">
            <div class="card-body">
              holi
              <template>
                <monedas :data="monedas"></monedas>
              </template>
              <template>
                <indices :data="indices"></indices>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading v-else></loading>
  </div>
</template>
<script>
import loading from "@/components/Loading.vue";
import Monedas from "./Monedas.vue";
import Indices from "./Indices.vue";
import ApiService from "@/utils/ApiService.js";
export default {
  components: {
    Monedas,
    Indices,
    loading
  },

  // directives
  // filters

  props: {
    //
  },

  data: () => ({
    monedas: null,
    indices: null,
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
      await ApiService.getCotizaciones().then((response) => {
        console.log(response);
        if (response.Erroresnegocio.BTErrorNegocio[0]) {
          this.message = response.Erroresnegocio.BTErrorNegocio[0].Descripcion;
        }
        this.indices = response.sdtIndices.SdtsBTMonedaIndicador;
        this.monedas = response.sdtMonedas.SdtsBTMonedaIndicador;
      });
    }
    //
    //
    //
  }
};
</script>

<style scoped></style>
