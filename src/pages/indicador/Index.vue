<template>
  <div class="row mt-3">
    <template v-if="indicadores">
      <h2>Indicadores</h2>
      <hr>
      <div
        class="col-md-3 col-sm-5 mb-2"
        v-for="(item, index) in indicadores"
        :key="index">
        <div class="card h-100 mb-2" @click="indicadorID(item.codigo)">
          <div class="card-body text-center">
            <h5 class="card-title mb-2 hover-underline-animation">
              {{ item.descripcion }}
            </h5>
            <div>
              <i :class="item.icon"></i>
            </div>
          </div>
        </div>
      </div>
    </template>

    <loading-vue v-else></loading-vue>
    <div class="alert alert-warning" role="alert" v-show="message">
      {{ message + "!" }}
    </div>
  </div>
</template>
<script>
import ApiService from "@/utils/ApiService.js";
import loadingVue from "@/components/Loading.vue";
import toastr from "toastr";
export default {
  // name: "MarketplaceIndex",
  components: { loadingVue },

  // directives
  // filters

  props: {
    //
  },

  data: () => ({
    indicadores: null,
    message: ""
  }),

  computed: {
    //
  },

  // watch: {},

  mounted() {
    this.getAllAgrupadores(this.$route.params.id);
  },

  methods: {
    async getAllAgrupadores(idIndicador) {
      await ApiService.GetIndicadores(idIndicador).then((response) => {
        if (response.Erroresnegocio.BTErrorNegocio[0]) {
          this.message = response.Erroresnegocio.BTErrorNegocio[0].Descripcion;
          console.log(response.Erroresnegocio.BTErrorNegocio[0].Descripcion)
        }
        // else{
        // }
        this.indicadores = response.sdtIndicadores.SdtsBTIndicador.map(
          (item) => {
            switch (item.codigo) {
              case 105:
                // "Condiciones Generales"
                item.icon = "fas fa-cogs fa-5x primary";
                break;
              case 106:
                // "Informacion de cotizaciones"
                item.icon = "fas fa-info-circle fa-5x blue";
                break;
              case 110:
                // "Prueba"
                item.icon = "fas fa-chain-broken fa-5x danger";
                break;
              case 201:
                // "Sucursales y Cajas'"
                item.icon = "fas fa-institution fa-5x warning";
                break;
              case 360:
                // "Transacciones por estado'"
                item.icon = "fas fa-credit-card-alt fa-5x";
                break;
              case 370:
                // "Cuadre de monedas en saldos diarios"
                item.icon = "fas fa-balance-scale fa-5x success";
                break;
              case 380:
                // "Posibles rubros bolsa"
                item.icon = "mt-2 fas fa-sack-dollar fa-5x secondary";
                break;

              default:
                // sin icon
                item.icon = "";
                break;
            }
            console.log(item);
            return item;
          }
        );
      });
    },
    indicadorID(id) {
      if (id == 201) {
        this.$router.push({ path: `/sucursales` });
        toastr.success("Ruta Valida", "Dirigiendo..");
      }
      if (id == 106) {
        this.$router.push({ path: `/monedas` });
        toastr.success("Ruta Valida", "Dirigiendo..");
      }
      if (id == 105) {
        this.$router.push({ path: `/condiciones` });
        toastr.success("Ruta Valida", "Dirigiendo..");
      }
      if (id == 110) {
        // this.$router.push({ path: `/monedas` });
        toastr.error("Ruta en construcción", "No Encontrada");
      }
      if (id == 360) {
          this.$router.push({ path: `/transacciones` });
         toastr.success("Ruta Valida", "Dirigiendo..");
      }
      if (id == 370) {
        this.$router.push({ path: `/cuadre-saldos` });
        toastr.success("Ruta Valida", "Dirigiendo..");
      }
      if (id == 380) {
        this.$router.push({ path: `/rubros-bolsa` });
        toastr.success("Ruta Valida", "Dirigiendo..");
      }
      console.log(id);
    }
    //
    //
  },
  watch: {
  '$route.params.id': function(newId, oldId) {
    console.log(newId, " - ", oldId)
    this.getAllAgrupadores(newId);
  }
}
};
</script>
<style scoped>
body {
  margin: 5em;
}
li {
  font-size: 18px;
  padding: 4px;
}
</style>
