<template>
  <div>
    <div class="alert alert-warning" role="alert" v-show="message">
      {{ message + "!" }}
    </div>
    <div v-if="!CuadreMonedas">
     
      <pre>
            {{ data }}
        </pre
      >
      <div class="row">
        <div class="col-12 mt-3 mb-1">
          <h4 class="text-uppercase">Rubro Bolsas </h4>
          <p>Información de los Rubros Bolsas</p>
        </div>
      </div>
  
      <div class="container">
        <div class="row">
          <div class="col-md-4 mb-2" v-for="(item,index) in data" :key="index">
            <div class="card-counter  primary">
              <i class="fa fa-archive"></i>
              <span class="count-numbers">{{item.Rubro}}</span>
              <span class="count-name">Descripcion de rubro</span>
              <br>
              <div class="float-right badge badge-primary">Cuenta : {{ item.Ctnro }} </div>
              <br>
              <div class="float-right badge badge-primary">Ocurrencias :  {{ item.Ocurrencias}} </div>
              <!-- <p class="count-p">Ocurrencias :  {{ item.Ocurrencias}}</p> -->
            </div>
            
          </div>

          <div class="col-md-4">
            <div class="card-counter danger">
              <i class="fa fa-ticket"></i>
              <span class="count-numbers">599</span>
              <span class="count-name">Instances</span>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card-counter success">
              <i class="fa fa-indent"></i>
              <span class="count-numbers">6875</span>
              <span class="count-name">Data</span>
            </div>
          </div>

          <!-- <div class="col-md-4">
            <div class="card-counter info">
              <i class="fa fa-users"></i>
              <span class="count-numbers">35</span>
              <span class="count-name">Users</span>
            </div>
          </div> -->
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
    console.log("hola");
    this.getAllRubroBolsas();
  },
  data: () => ({
    CuadreMonedas: null,
    message: "",
    data: [
      {
        Rubro: 2108050001,
        Papel: 0,
        Empresa: 1,
        Moneda: 0,
        Ctnro: 104,
        Suboper: 8,
        Ocurrencias: 1054,
        Sucursal: 1,
        Operacion: 0,
        Tipooper: 1
      }
    ]
  }),

  methods: {
    async getAllRubroBolsas() {
      // await ApiService.getRubroBolsas().then((response) => {
      //   console.log(response);
      //   if (response.Erroresnegocio.BTErrorNegocio[0]) {
      //     this.message = response.Erroresnegocio.BTErrorNegocio[0].Descripcion;
      //   }
      //   //this.indices = response.sdtIndices.SdtBBTMONEDA;
      //   this.CuadreMonedas =
      //     response.sdtRubrobolsas.SdtBBTRUBROBOLSA;
      // });
    }
    //
    //
  }
};
</script>

<style scoped>
.card-counter {
  box-shadow: 2px 2px 10px #dadada;
  margin: 5px;
  padding: 10px 10px;
  background-color: #fff;
  columns: #fff;
  height: 150px;
  border-radius: 5px;
  transition: 0.3s linear all;
}

.card-counter i {
  font-size: 5em;
  opacity: 0.2;
}

.card-counter .count-numbers {
  position: absolute;
  right: 35px;
  top: 20px;
  font-size: 32px;
  display: block;
}

.card-counter .count-name {
  position: absolute;
  right: 35px;
  top: 65px;
  /* font-style: italic;
  text-transform: capitalize; */
  opacity: 0.5;
  display: block;
  font-size: 18px;
}


</style>
