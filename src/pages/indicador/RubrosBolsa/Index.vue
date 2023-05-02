<template>
  <div>
    <div class="alert alert-warning" role="alert" v-show="message">
      {{ message + "!" }}
    </div>
    <div v-if="rubroBolsa">
      <div class="row">
        <div class="col-12 mt-3 mb-1">
          <h3 class="text-uppercase">Rubro Bolsas</h3>
          <p>Información de los Rubros Bolsas</p>
          <hr>
        </div>
      </div>

      <div class="container">
        <div class="row">
        
          <div class="col-xl-6 col-md-12"  v-for="(item, index) in rubroBolsa" :key="index">
            <div class="card">
              <div class="card-body">
                <div class="media align-items-stretch">
                  <div class="align-self-center">
                    <i class="fa fa-archive info font-large-4 mr-2"></i>
                  </div>
                  <div class="media-body text-right">
                    <h2>{{ item.descripcion }}</h2>
                    <h4>{{ item.rubro }}</h4>
                    
                  </div>
                </div>
                <p class="card-text">
                  Identificador Bantotal ( Empresa - Sucursal - Operacion - Sub operacion - Moneda - Papel) :
                   {{ '(' + item.empresa +" - "+ item.sucursal+" - "+ item.operacion+" -  "+ item.subOperacion+" -  "+ item.moneda+" -  " + item.papel +  ')'}} 
                </p>
                <span class="mb-2"> Ocurrencias: {{item.ocurrencias}}</span>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading v-else></loading>
  </div>
</template>
<script>

import ApiService from "@/utils/ApiService.js";
import loading from "@/components/Loading.vue";
export default {
  name: "RubroBolsa",
  components: {
    loading
  },
  mounted() {
    this.getAllRubroBolsas();
  },
  data: () => ({
    rubroBolsa: null,
    message: "",
    config: {
      options: [
        {
          value: "option 1"
        },
        {
          value: "option 2"
        },
        {
          value: "option 3"
        }
      ],
      placeholder: "Placeholder",
      backgroundColor: "#cde4f5",
      textColor: "black",
      borderRadius: "1.5em",
      border: "1px solid gray",
      width: 180
    }
   
  }),

  methods: {
    async getAllRubroBolsas() {
      await ApiService.getRubroBolsas().then((response) => {
        console.log(response);
        if (response.Erroresnegocio.BTErrorNegocio[0]) {
          this.message = response.Erroresnegocio.BTErrorNegocio[0].Descripcion;
        }
        //this.indices = response.sdtIndices.SdtBBTMONEDA;
        this.rubroBolsa = response.sdtRubrobolsas.SdtsBTRubroBolsa;
      });
    }
    //
    //
  }
};
</script>

<style scoped>
.card {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  z-index: 1;
}
</style>
