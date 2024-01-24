<template>
  <div class="mt-3">
    <h3>PASAJE A HISTORICO POR ESPECIE</h3>
    <div v-if="indices">
      <hr>
      <div id="indices">
        <v-client-table :columns="columns" :data="indices" :options="options">
          <template v-slot:nombre="item">
            <div class="letter">
              {{ item.row.nombre.toUpperCase() }} 
            </div>
          </template>
          <template v-slot:tipoCambio="item">
            <a :class="[item.row.tipoCambio != 'S' ? 'badge badge-danger text-white font-weight-bold' : 'badge badge-success  text-white font-weight-bold','letter']">
              {{ item.row.tipoCambio!= 'S' ? 'No' : 'Si' }}</a>
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
    indices: null,
    monedas: null,
    columns: ['nombre', 'tipoCambio'],
    options: {
      texts: {
          count:
            "Mostrando {from} a {to} de {count} registros |{count} registros|Un registro",
          first: "Primero",
          last: "Ultimo",
          filter: "Filtro:",
          filterPlaceholder: "Busqueda",
          limit: "Registros:",
          page: "Pagina:",
          noResults: "No hay registros coincidentes",
          noRequest:"Seleccione al menos un filtro para obtener resultados",
          filterBy: "Filtrar por {column}",
          loading: "Cargando...",
          defaultOption: "Seleccionar {column}",
          columns: "Columnas"
        },
      sortable: ['nombre', 'tipoCambio'],
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
        nombre: "Nombre",
        tipoCambio: "Pasaje a histórico",
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
      $(".VueTables__search").addClass("float-right");
    });
  },

  methods: {
    async getAllAgrupadores() {
      this.indices = this.data
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
  /* .letter{
    font-size: 1.1rem;
  } */

</style>
  