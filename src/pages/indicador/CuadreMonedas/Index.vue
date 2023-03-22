<template>
  <div class="container mt-3">
    <div class="alert alert-warning" role="alert" v-show="message" >
      {{ message + '!' }}
    </div>
    <div v-if="CuadreMonedas">
      <h2>Balance Monedas Saldo</h2>
      <hr />
      <div id="moneda">
        <v-client-table :columns="columns" :data="CuadreMonedas" :options="options">
          <template v-slot:Saldo="item">
            <a :class="(item.row.Saldo < 0) ? 'badge badge-danger' : 'badge badge-success'">{{
              item.row.Saldo }}</a>
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
    CuadreMonedas: null,
    message: "",
    columns: ['Nombremoneda', 'Moneda','Saldo'],
    options: {
      editableColumns:['Nombre'],
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
      perPage: 5,
      perPageValues: [5,10, 25, 50, 100,500],  
      headings: {
        // id: 'ID',
        Nombremoneda: "Nombre Moneda",
        Moneda: "Codigo Moneda",
        Saldo: "Saldo"
      },
    },
  }),

  computed: {
    //
  },

  // watch: {},

  mounted() {
    this.getAllCuadreMonedaSaldos();
  },

  methods: {
    async getAllCuadreMonedaSaldos() {
      await ApiService.getCuadreMonedaSaldos()
        .then((response) => {
          console.log(response)
          if (response.Erroresnegocio.BTErrorNegocio[0]) {
            this.message = response.Erroresnegocio.BTErrorNegocio[0].Descripcion;

          }
          //this.indices = response.sdtIndices.SdtBBTMONEDA;

          this.CuadreMonedas = response.sDTValanceMonedaSaldo.SdtsBTValanceMonedaSaldo;
        })
    },
    //
    //
  }
};
</script>
<style scoped >
#app {
  width: 95%;
  margin: 0 auto;
}

.VuePagination {
  text-align: center;
}

.vue-title {
  text-align: center;
  margin-bottom: 10px;
}

.vue-pagination-ad {
  text-align: center;
}

.glyphicon.glyphicon-eye-open {
  width: 16px;
  display: block;
  margin: 0 auto;
}

th:nth-child(3) {
  text-align: center;
}

.VueTables__child-row-toggler {
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: block;
  margin: auto;
  text-align: center;
}

.VueTables__child-row-toggler--closed::before {
  content: "+";
}

.VueTables__child-row-toggler--open::before {
  content: "-";
}

[v-cloak] {
  display:none;
}
</style>
  