<template>
  <div class="row mt-3">
    <template v-if="indicadores">
      <h2>Indicadores</h2>
      <!-- <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Descripcíon</th>
            <th scope="col">Habilitado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in indicadores" :key="index">
           
            <td>{{ item.Descripcion }}</td>
            <td>SI</td>
            <td>
              <button
                class="btn btn-info"
                @click="indicadorID(item.Codigo)"
                data-toggle="modal"
                data-target="#modal-fullscreen-xl">
                Visualizar
              </button>
            </td>
          </tr>
        </tbody>
      </table> -->
      <div
          class="col-md-3 col-sm-5 mb-2"
          v-for="(item, index) in indicadores"
          :key="index">
          <div class="card h-100 mb-2" @click="indicadorID(item.Codigo)">
            <div class="card-body text-center">
              <h5 class="card-title mb-2 hover-underline-animation">{{ item.Descripcion }}</h5>
              <div>
                <!-- <div
              :class="item.descripcion.length < 20 ? 'mx pt-3' : 'pt-1'"> -->
                <i :class="item.icon"></i>
                <!-- <p class="card-text mt-2">
                  Indicador N°
                  <a href="#" class="card-link">{{ item.codigo }}</a>
                </p> -->
                <!-- <div class="content mb-3">
                  <button class="btn btn-info format" @click="indicadorID(item.Codigo)">
                  Indicador
                </button>
                </div> -->
              </div>
            </div>
          </div>
        </div>
    </template>
    
    <loading-vue v-else></loading-vue>
    <div class="alert alert-warning" role="alert" v-show="message">
      {{ message + '!' }}
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
    message:""
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
         
        }
        // else{
        // }
         this.indicadores = response.sdtIndicadores.SdtsBTIndicador.map((item) => {
          switch (item.Codigo) {
            case 105:
              // "Condiciones Generales"
              item.icon = "fas fa-wrench fa-5x";
              break;
            case 106:
              // "Informacion de cotizaciones"
              item.icon = "fas fa-info-circle fa-5x";
              break;
            case 110:
              // "Prueba"
              item.icon = "fas fa-chain-broken fa-5x";
              break;
            case 201:
              // "Sucursales y Cajas'"
              item.icon = "fas fa-institution fa-5x";
              break;
            case 360:
              // "Transacciones por estado'"
              item.icon = "fas fa-credit-card-alt fa-5x";
              break;
            case 370:
              // "Cuadre de monedas en saldos diarios"
              item.icon = "fas fa-dollar fa-5x";
              break;
            case 380:
              // "Posibles rubros bolsa"
              item.icon = "fas fa-balance-scale fa-5x";
              break;

            default:
              // sin icon
              item.icon = "";
              break;
          }
          console.log(item);
          return item;
        });;
      });
    },
    indicadorID(id) {
      if (id == 201) this.$router.push({ path: `/sucursales` });
      if (id == 106) this.$router.push({ path: `/monedas` });

      if (id == 105) this.$router.push({ path: `/monedas` });
      if (id == 110) this.$router.push({ path: `/monedas` });
      if (id == 360) this.$router.push({ path: `/monedas` });
      if (id == 370) this.$router.push({ path: `/monedas` });
      if (id == 380) this.$router.push({ path: `/monedas` });
      console.log(id)

    toastr.success("Ruta Valida","Dirigiendo..")
    toastr.error("Ruta en construcción","No Encontrada")  
    }
    //
    //
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

#toast-container > .toast {
    background-image: none !important;
}

#toast-container > .toast:before {
    position: fixed;
    font-family: FontAwesome;
    font-size: 24px;
    line-height: 18px;
    float: left;
    color: #FFF;
    padding-right: 0.5em;
    margin: auto 0.5em auto -1.5em;
}        
#toast-container > .toast-warning:before {
    content: "\f003";
}
#toast-container > .toast-error:before {
    content: "\f001";
}
#toast-container > .toast-info:before {
    content: "\f005";
}
#toast-container > .toast-success:before {
    content: "\f002";
}


</style>
