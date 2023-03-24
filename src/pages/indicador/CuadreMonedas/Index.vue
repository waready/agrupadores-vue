<template>
  <div class="container mt-3">
    <div class="alert alert-warning" role="alert" v-show="message">
      {{ message + "!" }}
    </div>
    <div v-if="CuadreMonedas">
      <section id="minimal-statistics">
        <div class="row">
          <div class="col-12 mt-3 mb-1">
            <h4 class="text-uppercase">Balance Monedas Saldo</h4>
            <p>Información de los Balances</p>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-3 col-sm-6 col-12" v-for="(item, index) in CuadreMonedas" :key="index">
            <div class="card">
              <div class="card-content">
                <div class="card-body">
                  <div class="media d-flex">
                    <div class="media-body text-left">
                      <h3 :class="(item.Saldo < 0) ? 'danger' : 'success'">
                        {{ item.Saldo }}
                      </h3>
                      <span>{{ item.Nombremoneda }}</span>
                    </div>
                    <div :class="['align-self-center',(item.Saldo < 0) ? 'danger' : 'success']">

                     {{ item.Signo }}
                    </div>
                  </div>
                  <div class="progress mt-1 mb-0" style="height: 7px">
                    <div :class="[(item.Saldo < 0) ? 'bg-danger' : 'bg-success', 'progressbar']" role="progressbar"
                      style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <loading v-else></loading>
  </div>
</template>

<script>
import ApiService from "@/utils/ApiService.js";
import loading from "@/components/Loading.vue";
import { ServerTable } from "v-tables-3";
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
    columns: ["Nombremoneda", "Moneda", "Saldo"],
    options: {
      editableColumns: ["Nombre"],
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
        noRequest: "Seleccione al menos un filtro para obtener resultados",
        filterBy: "Filtrar por {column}",
        loading: "Cargando...",
        defaultOption: "Seleccionar {column}",
        columns: "Columnas"
      },
      // filterByColumn: true,
      perPage: 5,
      perPageValues: [5, 10, 25, 50, 100, 500],
      headings: {
        // id: 'ID',
        Nombremoneda: "Nombre Moneda",
        Moneda: "Codigo Moneda",
        Saldo: "Saldo"
      }
    }
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
      await ApiService.getCuadreMonedaSaldos().then((response) => {
        console.log(response);
        if (response.Erroresnegocio.BTErrorNegocio[0]) {
          this.message = response.Erroresnegocio.BTErrorNegocio[0].Descripcion;
        }
        //this.indices = response.sdtIndices.SdtBBTMONEDA;

        this.CuadreMonedas =
          response.SdtValanceMonedaSaldos.SdtsBTValanceMonedaSaldo;
      });
    }
    //
    //
  }
};
</script>
<style scoped>

</style>
