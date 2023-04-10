<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <router-link
        class="nav-link"
        :class="{ active: $route.name == 'monedas' }"
        to="/monedas">
        Monedas
      </router-link>
    </li>
    <li class="nav-item">
      <router-link
        class="nav-link"
        :class="{ active: $route.name == 'indices' }"
        to="/monedas/indices">
        Indices
      </router-link>
    </li>
    <pre>
      {{ monedas }}
    </pre>
  </ul>
</template>
<script>
import ApiService from "@/utils/ApiService.js";
export default {
  components: {
    //
  },

  // directives
  // filters

  props: {
    //
  },

  data: () => ({
    monedas:[]
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
        //this.indices = response.sdtIndices.SdtBBTMONEDA;
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
