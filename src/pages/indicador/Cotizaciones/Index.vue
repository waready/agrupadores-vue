<template>
  <div class="mt-3">
    <h2>INDICES</h2>

    <div class="alert alert-warning" role="alert" v-show="message" >
      {{ message + '!' }}
    </div>
    <div v-if="indices || monedas">
      <div id="indices">
        <v-client-table :columns="columns" :data="indices" :options="options">
          <template v-slot:Tipocambio="item">
            <a :class="item.row.Tipocambio != 'S' ? 'badge badge-danger' : 'badge badge-success'">{{
              item.row.Tipocambio }}</a>
          </template>
        </v-client-table>
      </div>
      <hr />
      <!-- <table class="table table-striped">
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
              <a :class="item.Tipocambio != 'S' ? 'badge badge-danger' : 'badge badge-success'">{{ item.Tipocambio }}</a>
            </td>
          </tr>
        </tbody>
      </table> -->
      <hr />
      <h2>MONEDA</h2>
      <hr />
      <div id="moneda">
        <v-client-table :columns="columns1" :data="monedas" :options="options1">
          <template v-slot:Tipocambio="item">
            <a :class="item.row.Tipocambio != 'S' ? 'badge badge-danger' : 'badge badge-success'">{{
              item.row.Tipocambio }}</a>
          </template>
        </v-client-table>
      </div>
      <!-- <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Tipo de cambio</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in monedas" :key="index">
            <td>{{ item.Nombre }}</td>
            <td><a :class="item.Tipocambio != 'S' ? 'badge badge-danger' : 'badge badge-success'">{{ item.Tipocambio }}</a>
            </td>
          </tr>
        </tbody>
      </table> -->
    </div>
    <loading v-else></loading>
  </div>
</template>

<script>
import ApiService from "@/utils/ApiService.js";
import loading from "@/components/Loading.vue";
import { ServerTable } from 'v-tables-3';
export default {
  // name: "MarketplaceIndex",
  components: {
    loading,
    ServerTable
  },

  // directives
  // filters

  props: {
    //
  },

  data: () => ({
    indices: null,
    monedas: null,
    message: "",
    columns: ['Nombre', 'Tipocambio'],
    options: {
      texts: {
          count:
            "Mostrando {from} a {to} de {count} registros |{count} registros|Un registro",
          first: "Primero",
          last: "Ultimo",
          filter: "Filtro:",
          filterPlaceholder: "Consulta de Busqueda",
          limit: "Registros:",
          page: "Pagina:",
          noResults: "No hay registros coincidentes",
          noRequest:"Seleccione al menos un filtro para obtener resultados",
          filterBy: "Filtrar por {column}",
          loading: "Cargando...",
          defaultOption: "Seleccionar {column}",
          columns: "Columnas"
        },
      editableColumns:['Nombre'],
      // see the options API
      // filterByColumn: true,
      perPage: 10,
      perPageValues: [10, 25, 50, 100, 500],  
      headings: {
        // id: 'ID',
        Nombre: "Nombre",
        Tipocambio: "Cotizacion",
      },
    },
    columns1: ['Nombre', 'Tipocambio'],
    options1: {
      editableColumns:['Nombre'],
      // see the options API
      // filterByColumn: true,
      perPage: 10,
      perPageValues: [10, 25, 50, 100, 500],  
      headings: {
        // id: 'ID',
        Nombre: "Nombre",
        Tipocambio: "Cotizacion",
      },
    },
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
<style scoped ></style>
  