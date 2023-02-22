<template>
    <div class="mt-3">
      <h2>INDICES</h2>
      <hr/>
      <table class="table table-striped">
        <thead>
          <tr>
            <!-- <th scope="col"># Inidice</th> -->
            <th scope="col">Nombre</th>
            <th scope="col">Cotizacion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in indices" :key="index">
            <!-- <th scope="row">{{ item.indice }}</th> -->
            <td>{{ item.nombre }}</td>
            <td>
              <a :class="item.cotizacionCargada != 'Si' ? 'badge badge-danger' :'badge badge-success' ">{{ item.cotizacionCargada }}</a>

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
            <!-- <th scope="col"># Moneda</th> -->
            <th scope="col">Nombre</th>
            <th scope="col">Tipo de cambio</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in monedas" :key="index">
            <!-- <th scope="row">{{ item.moneda }}</th> -->
            <td>{{ item.nombre }}</td>
            <td><a :class="item.tipoDeCambioCargado != 'Si' ? 'badge badge-danger' :'badge badge-success' ">{{ item.tipoDeCambioCargado}}</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  <script>
  import ApiService from "@/utils/ApiService.js";
  
  export default {
    // name: "MarketplaceIndex",
    components: {
      
    },
  
    // directives
    // filters
  
    props: {
      //
    },
  
    data: () => ({
        indices: null,
        monedas:null
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
            console.log(response)
          this.indices = response.indices.indiceIndicadores;
          this.monedas = response.monedas.MonedaIndicadores;
        });
      },
      //
      //
    }
  };
  </script>
  <style scoped >
  
  </style>
  