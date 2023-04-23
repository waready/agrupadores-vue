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
          <!-- <div
            class="col-xl-6 col-md-12 pb-"
            v-for="(item, index) in rubroBolsa"
            :key="index">
            <div class="card overflow-hidden">
              <div class="card-content">
                <div class="card-body cleartfix">
                  <div class="media align-items-stretch">
                    <div class="align-self-center">
                      <i class="fa fa-archive info font-large-2 mr-2"></i>
                    </div>
                    <div class="media-body text-right">
                      <p>{{ item.descripcion }}</p>
                      <h5>{{ item.rubro }}</h5>
                    </div>
                  </div>
                  <div>
                    <div class="dropdown">
                      <button
                        class="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                        Dropdown button
                      </button>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#"
                          >Something else here</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
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
                <!-- <div class="dropdown text-right">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    Identificador
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                    style="position: absolute; z-index: 999">
                    <a class="dropdown-item" >Empresa: <span class="badge badge-info badge-pill "> {{item.empresa}}</span> </a>
                    <a class="dropdown-item" >Sucursal: <span class="badge badge-info badge-pill "> {{item.sucursal}}</span></a>
                    <a class="dropdown-item" >Operacion: <span class="badge badge-info badge-pill "> {{item.operacion}}</span></a>
                    <a class="dropdown-item" >Moneda: <span class="badge badge-info badge-pill "> {{item.moneda}}</span></a>
                    <a class="dropdown-item" >Papel: <span class="badge badge-info badge-pill "> {{item.papel}}</span></a>
                  </div>
                </div> -->
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
    // data: [
    //   {
    //     Rubro: 2108050001,
    //     Papel: 0,
    //     Empresa: 1,
    //     Moneda: 0,
    //     Ctnro: 104,
    //     Suboper: 8,
    //     Ocurrencias: 1054,
    //     Sucursal: 1,
    //     Operacion: 0,
    //     Tipooper: 1
    //   }
    // ]
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
