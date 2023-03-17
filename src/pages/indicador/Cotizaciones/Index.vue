<template>
    <div class="mt-3">
      <h2>INDICES</h2>
      <div class="alert alert-warning" role="alert" v-show="message">
        {{ message + '!' }}
       </div>
      <div v-if="indices || monedas">
      <hr/>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Cotizacion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in indices" :key="index">
            <td>{{ item.Nombre }}</td>
            <td>
              <a :class="item.Tipocambio != 'S' ? 'badge badge-danger' :'badge badge-success' ">{{ item.Tipocambio }}</a> 
            </td>
          </tr>
        </tbody>
      </table>
      <hr/>
      <h2>MONEDA</h2>
      <hr/>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Tipo de cambio</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in monedas" :key="index">
            <td>{{ item.Nombre }}</td>
            <td><a :class="item.Tipocambio != 'S' ? 'badge badge-danger' :'badge badge-success' ">{{ item.Tipocambio}}</a></td>
          </tr>
        </tbody>
      </table>
      </div>
      <loading v-else></loading>
    </div>
  </template>

  <script>
  import ApiService from "@/utils/ApiService.js";
  import loading from "@/components/Loading.vue";

  export default {
    // name: "MarketplaceIndex",
    components: {
      loading
    },
  
    // directives
    // filters
  
    props: {
      //
    },
  
    data: () => ({
        indices: null,
        monedas:null,
        message:""
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
        await ApiService.getCotizaciones()
        .then((response) => {
            console.log(response)
          if (response.Erroresnegocio.BTErrorNegocio[0]) {
          this.message = response.Erroresnegocio.BTErrorNegocio[0].Descripcion;
         
        }
          this.indices = response.sdtIndices.SdtBBTMONEDA;
          this.monedas = response.sdtMonedas.SdtBBTMONEDA;
        })
      },
      //
      //
    }
  };
  </script>
  <style scoped >
  
  </style>
  