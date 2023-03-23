<template>
  <div class="container mt-3">
    <div class="alert alert-warning" role="alert" v-show="message">
      {{ message + "!" }}
    </div>
    <div v-if="CuadreMonedas">
      <h2>Balance Monedas Saldo</h2>
      <hr />
      <section id="minimal-statistics">
        <div class="row">
          <div class="col-12 mt-3 mb-1">
            <h4 class="text-uppercase">Minimal Statistics Cards</h4>
            <p>Statistics on minimal cards.</p>
          </div>
        </div>
        <!-- <div class="row">
            <div class="col-xl-3 col-sm-6 col-12">
              <div class="card">
                <div class="card-content">
                  <div class="card-body">
                    <div class="media d-flex">
                      <div class="align-self-center">
                        <i
                          class="icon-pencil primary font-large-2 float-left"></i>
                      </div>
                      <div class="media-body text-right">
                        <h3>278</h3>
                        <span>New Posts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 col-12">
              <div class="card">
                <div class="card-content">
                  <div class="card-body">
                    <div class="media d-flex">
                      <div class="align-self-center">
                        <i
                          class="icon-speech warning font-large-2 float-left"></i>
                      </div>
                      <div class="media-body text-right">
                        <h3>156</h3>
                        <span>New Comments</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 col-12">
              <div class="card">
                <div class="card-content">
                  <div class="card-body">
                    <div class="media d-flex">
                      <div class="align-self-center">
                        <i
                          class="icon-graph success font-large-2 float-left"></i>
                      </div>
                      <div class="media-body text-right">
                        <h3>64.89 %</h3>
                        <span>Bounce Rate</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 col-12">
              <div class="card">
                <div class="card-content">
                  <div class="card-body">
                    <div class="media d-flex">
                      <div class="align-self-center">
                        <i
                          class="icon-pointer danger font-large-2 float-left"></i>
                      </div>
                      <div class="media-body text-right">
                        <h3>423</h3>
                        <span>Total Visits</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->

        <!-- <div class="row">
            <div class="col-xl-3 col-sm-6 col-12">
              <div class="card">
                <div class="card-content">
                  <div class="card-body">
                    <div class="media d-flex">
                      <div class="media-body text-left">
                        <h3 class="danger">278</h3>
                        <span>New Projects</span>
                      </div>
                      <div class="align-self-center">
                        <i
                          class="icon-rocket danger font-large-2 float-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 col-12">
              <div class="card">
                <div class="card-content">
                  <div class="card-body">
                    <div class="media d-flex">
                      <div class="media-body text-left">
                        <h3 class="success">156</h3>
                        <span>New Clients</span>
                      </div>
                      <div class="align-self-center">
                        <i
                          class="icon-user success font-large-2 float-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-3 col-sm-6 col-12">
              <div class="card">
                <div class="card-content">
                  <div class="card-body">
                    <div class="media d-flex">
                      <div class="media-body text-left">
                        <h3 class="warning">64.89 %</h3>
                        <span>Conversion Rate</span>
                      </div>
                      <div class="align-self-center">
                        <i
                          class="icon-pie-chart warning font-large-2 float-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 col-12">
              <div class="card">
                <div class="card-content">
                  <div class="card-body">
                    <div class="media d-flex">
                      <div class="media-body text-left">
                        <h3 class="primary">423</h3>
                        <span>Support Tickets</span>
                      </div>
                      <div class="align-self-center">
                        <i
                          class="icon-support primary font-large-2 float-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->

        <div class="row">
          <div
            class="col-xl-3 col-sm-6 col-12"
            v-for="(item, index) in CuadreMonedas"
            :key="index">
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
                    <div class="align-self-center">
                      <i
                        class="fas fa-usd primary font-large-2 float-right"></i>
                    </div>
                  </div>
                  <div class="progress mt-1 mb-0" style="height: 7px">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style="width: 100%"
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="col-xl-3 col-sm-6 col-12">
              <div class="card">
                <div class="card-content">
                  <div class="card-body">
                    <div class="media d-flex">
                      <div class="media-body text-left">
                        <h3 class="warning">156</h3>
                        <span>New Comments</span>
                      </div>
                      <div class="align-self-center">
                        <i
                          class="icon-bubbles warning font-large-2 float-right"></i>
                      </div>
                    </div>
                    <div class="progress mt-1 mb-0" style="height: 7px">
                      <div
                        class="progress-bar bg-warning"
                        role="progressbar"
                        style="width: 35%"
                        aria-valuenow="35"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-3 col-sm-6 col-12">
              <div class="card">
                <div class="card-content">
                  <div class="card-body">
                    <div class="media d-flex">
                      <div class="media-body text-left">
                        <h3 class="success">64.89 %</h3>
                        <span>Bounce Rate</span>
                      </div>
                      <div class="align-self-center">
                        <i
                          class="icon-cup success font-large-2 float-right"></i>
                      </div>
                    </div>
                    <div class="progress mt-1 mb-0" style="height: 7px">
                      <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        style="width: 60%"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 col-12">
              <div class="card">
                <div class="card-content">
                  <div class="card-body">
                    <div class="media d-flex">
                      <div class="media-body text-left">
                        <h3 class="danger">423</h3>
                        <span>Total Visits</span>
                      </div>
                      <div class="align-self-center">
                        <i
                          class="icon-direction danger font-large-2 float-right"></i>
                      </div>
                    </div>
                    <div class="progress mt-1 mb-0" style="height: 7px">
                      <div
                        class="progress-bar bg-danger"
                        role="progressbar"
                        style="width: 40%"
                        aria-valuenow="40"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->
        </div>
      </section>
      <!-- <section>
          <div class="row">
            <div class="col-xl-6 col-md-12">
              <div class="card">
                <div class="card-content">
                  <div class="card-body cleartfix">
                    <div class="media align-items-stretch">
                      <div class="align-self-center">
                        <h1 class="mr-2">$76,456.00</h1>
                      </div>
                      <div class="media-body">
                        <h4>Total Sales</h4>
                        <span>Monthly Sales Amount</span>
                      </div>
                      <div class="align-self-center">
                        <i class="icon-heart danger font-large-2"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-6 col-md-12">
              <div class="card">
                <div class="card-content">
                  <div class="card-body cleartfix">
                    <div class="media align-items-stretch">
                      <div class="align-self-center">
                        <h1 class="mr-2">$36,000.00</h1>
                      </div>
                      <div class="media-body">
                        <h4>Total Cost</h4>
                        <span>Monthly Cost</span>
                      </div>
                      <div class="align-self-center">
                        <i class="icon-wallet success font-large-2"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>  -->
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
          response.sDTValanceMonedaSaldo.SdtsBTValanceMonedaSaldo;
      });
    }
    //
    //
  }
};
</script>
<style scoped>
/*--------------------------------------------------------------
# Services
--------------------------------------------------------------*/
.services .icon-box {
  margin-bottom: 20px;
}

.services .icon {
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  background: #149ddd;
  border-radius: 50%;
  transition: 0.5s;
  border: 1px solid #149ddd;
}

.services .icon i {
  color: #fff;
  font-size: 24px;
  line-height: 0;
}

.services .icon-box:hover .icon {
  background: #fff;
}

.services .icon-box:hover .icon i {
  color: #149ddd;
}

.services .title {
  margin-left: 80px;
  font-weight: 700;
  margin-bottom: 15px;
  font-size: 18px;
}

.services .title a {
  color: #343a40;
}

.services .title a:hover {
  color: #149ddd;
}

.services .description {
  margin-left: 80px;
  line-height: 24px;
  font-size: 14px;
}
</style>
