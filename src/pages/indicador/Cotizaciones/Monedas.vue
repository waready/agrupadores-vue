<template>
  <div class="container mt-3">
    <div v-if=" monedas">
      <h3>MONEDA</h3>
      <hr />
      <div id="moneda">
        <v-client-table :columns="columns" :data="monedas" :options="options">
          <template v-slot:nombre="item">
            <div class="letter">
              {{ item.row.nombre.toUpperCase()}} 
            </div>
          </template>
          <template v-slot:tipoCambio="item">
            <a :class="['letter',item.row.tipoCambio != 'S' ? 'badge badge-danger text-white font-weight-bold' : 'badge badge-success  text-white font-weight-bold']">{{
              item.row.tipoCambio }}</a>
          </template>
        </v-client-table>
      </div>
    </div>
  </div>
</template>

<script>
import { ServerTable } from 'v-tables-3';
export default {
  // name: "MarketplaceIndex",
  components: {
    ServerTable
  },

  // directives
  // filters

  props: ['data'],

  data: () => ({
    monedas: null,
    columns: ['nombre', 'tipoCambio'],
    options: {
      sortable: ['nombre', 'tipoCambio'],
      sortIcon: {
          is: 'fa-sort', // utiliza iconos de Font Awesome
          base: 'fa',
          up: 'fa-sort-asc',
          down: 'fa-sort-desc',
        },
      // see the options API
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
      // filterByColumn: true,
      perPage: 10,
      perPageValues: [10, 25, 50, 100, 500],  
      headings: {
        // id: 'ID',
        nombre: "Nombre",
        tipoCambio: "Cotización",
      },
       
      
    },
  }),

  computed: {
    //
  },

  // watch: {},

  mounted() {
    this.getAllAgrupadores();
    $(document).ready(function () {
      $('.VuePagination__count').text(function(i, text) {
        return text.replace('Un registro', '1 registro');
      });
      $('.VueTables__search-field label').hide();
      $('.VueTables__search-field .VueTables__search__input').css('text-align', 'left');
    });
  },

  methods: {
    async getAllAgrupadores() {
      this.monedas = this.data;
    },
    //
    //
  }
};
</script>
<style  scoped>
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
  /* .letter{
    font-size: 1.1rem;
  } */

</style>
  