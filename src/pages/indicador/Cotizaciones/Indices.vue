<template>
  <div class="mt-3">
    <h2>INDICES</h2>

    <div class="alert alert-warning" role="alert" v-show="message" >
      {{ message + '!' }}
    </div>
    <div v-if="indices">
      <div id="indices">
        <v-client-table :columns="columns" :data="indices" :options="options">
          <template v-slot:Tipocambio="item">
            <a :class="item.row.Tipocambio != 'S' ? 'badge badge-danger' : 'badge badge-success'">{{
              item.row.Tipocambio }}</a>
          </template>
        </v-client-table>
      </div>
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
      sortable: ['Nombre', 'Tipocambio'],
      sortIcon: {
          is: 'fa-sort', // utiliza iconos de Font Awesome
          base: 'fa',
          up: 'fa-sort-asc',
          down: 'fa-sort-desc',
        },
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
          //this.monedas = response.sdtMonedas.SdtBBTMONEDA;
        })
    },
    //
    //
  }
};
</script>
<style scoped >
.sortable-header {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }
  .sortable-header .sort-icon {
    position: absolute;
    top: 50%;
    right: -20px;
    transform: translateY(-50%);
  }
  .sortable-header .sort-icon.fa-sort {
    opacity: 0.5;
  }

</style>
  