<template>
  <div class="mt-3">
    <h2>INDICES</h2>
    <div v-if="indices">
      <div id="indices">
        <v-client-table :columns="columns" :data="indices" :options="options">
          <template v-slot:tipoCambio="item">
            <a :class="item.row.tipoCambio != 'S' ? 'badge badge-danger' : 'badge badge-success'">{{
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
        tipoCambio: "Cotizacion",
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

</style>
  