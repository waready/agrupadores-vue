<template>
  <div class="container">
    <div class="row">
      <h2>Condiciones generales</h2>
      <div class="alert alert-warning" role="alert" v-show="message">
        {{ message + "!" }}
      </div>
      <div class="grey-bg container-fluid">
        <section v-if="CondicionesGenerales">
          <section id="stats-subtitle">
            <div class="row">
              <div class="col-md-12 mt-3 mb-1">
                <h4 class="text-uppercase">debugs</h4>
                <p>Datos Informativos</p>
                <hr />
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6 col-md-5 col-sm-12">
                <div
                  class="card custom-card overflow-hidden"
                  :class="[
                    CondicionesGenerales.reglasNegocio !== 'SI'
                      ? ''
                      : 'border-danger',
                    'border-width-5'
                  ]">
                  <div class="card-content" style="border-radius: 20%">
                    <div class="card-body cleartfix">
                      <div class="media align-items-stretch">
                        <div class="align-self-center">
                          <i
                            class="icon-social-dropbox info font-large-2 mr-2"></i>
                        </div>
                        <div class="media-body">
                          <h6>Históricos de Reglas de Negocio Activados</h6>
                          <span>
                            Cantidad:
                            {{ CondicionesGenerales.cantidadReglas }}</span
                          >
                        </div>
                        <div class="align-self-center">
                          <h4
                            :class="
                              CondicionesGenerales.reglasNegocio != 'SI'
                                ? 'text-secondary'
                                : 'text-danger tamleter'
                            ">
                            <i class="fas fa-bug"></i>
                            {{ CondicionesGenerales.reglasNegocio }}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-6 col-md-5 col-sm-12">
                <div
                  :class="[
                    'card custom-card overflow-hidden',
                    CondicionesGenerales.opcionPAE != 'SI'
                      ? ''
                      : 'border-danger',
                    'border-width-5'
                  ]">
                  <div class="card-content">
                    <div class="card-body cleartfix">
                      <div class="media align-items-stretch">
                        <div class="align-self-center">
                          <i class="icon-layers warning font-large-2 mr-2"></i>
                        </div>
                        <div class="media-body">
                          <h6>Históricos PAE Activados</h6>
                          <span>
                            Cantidad:
                            {{ CondicionesGenerales.cantidadPAE }}</span
                          >
                        </div>
                        <div class="align-self-center">
                          <h4
                            :class="
                              CondicionesGenerales.opcionPAE != 'SI'
                                ? 'text-secondary'
                                : 'border-danger tamleter'
                            ">
                            <i class="fas fa-bug"></i>

                            {{ CondicionesGenerales.opcionPAE }}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-5 col-sm-12">
                <div
                  :class="[
                    'card custom-card overflow-hidden',
                    CondicionesGenerales.debug != 'SI' ? '' : 'border-danger',
                    'border-width-5'
                  ]">
                  <div class="card-content">
                    <div class="card-body cleartfix">
                      <div class="media align-items-stretch">
                        <div class="align-self-center">
                          <i class="icon-globe primary font-large-2 mr-2"></i>
                        </div>
                        <div class="media-body">
                          <h6>Opción general</h6>
                          <span>Opción general 2850 activada?</span>
                        </div>
                        <div class="align-self-center">
                          <h4
                            :class="
                              CondicionesGenerales.debug != 'SI'
                                ? 'text-secondary'
                                : 'text-danger tamleter'
                            ">
                            <i class="fas fa-bug"></i>

                            {{ CondicionesGenerales.debug }}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-6 col-md-5 col-sm-12">
                <div
                  :class="[
                    'card custom-card overflow-hidden',
                    CondicionesGenerales.opcionWorkFlow != 'SI'
                      ? ''
                      : 'border-danger',
                    'border-width-5'
                  ]">
                  <div class="card-content">
                    <div class="card-body cleartfix">
                      <div class="media align-items-stretch">
                        <div class="align-self-center">
                          <i
                            class="icon-game-controller warning font-large-2 mr-2"></i>
                        </div>
                        <div class="media-body">
                          <h6>Workflow</h6>
                          <span>Opción XWFV02 correlativo 1 activada</span>
                        </div>
                        <div class="align-self-center">
                          <h4
                            :class="
                              CondicionesGenerales.opcionWorkFlow != 'SI'
                                ? 'text-secondary'
                                : 'text-danger tamleter'
                            ">
                            <i class="fas fa-bug"></i>

                            {{ CondicionesGenerales.opcionWorkFlow }}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-5 col-sm-12">
                <div
                  :class="[
                    'card custom-card overflow-hidden',
                    CondicionesGenerales.parametrosGeneralesWF != 'SI'
                      ? ''
                      : 'border-danger',
                    'border-width-5'
                  ]">
                  <div class="card-content">
                    <div class="card-body cleartfix">
                      <div class="media align-items-stretch">
                        <div class="align-self-center">
                          <i class="icon-folder-alt info font-large-2 mr-2"></i>
                        </div>
                        <div class="media-body">
                          <h6>Reporteador</h6>
                          <span>Opción XWFV02 correlativo 4 activada</span>
                        </div>
                        <div class="align-self-center">
                          <h4
                            :class="
                              CondicionesGenerales.parametrosGeneralesWF != 'SI'
                                ? 'text-secondary'
                                : 'text-danger tamleter'
                            ">
                            <i class="fas fa-bug"></i>

                            {{ CondicionesGenerales.parametrosGeneralesWF }}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-12 mt-3 mb-1">
                <h4 class="text-uppercase">Periodo Delta 24 x 7</h4>
                <p>24 x 7</p>
                <hr />
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6 col-md-5 col-sm-12">
                <div
                  :class="[
                    'card overflow-hidden',
                    CondicionesGenerales.opcion7x24 === 'SI' &&
                    CondicionesGenerales.empresasIguales === 'SI'
                      ? 'border-danger'
                      : '',
                    'border-width-5'
                  ]">
                  <div class="card-content">
                    <div class="card-body cleartfix">
                      <div class="media align-items-stretch">
                        <div class="align-self-center">
                          <i
                            class="icon-briefcase secondary font-large-2 mr-2"></i>
                        </div>
                        <div class="media-body">
                          <h6>Empresas Iguales</h6>
                          <span>FST017 vs FST017CNL iguales?</span>
                        </div>
                        <div class="align-self-center">
                          <h4>
                            {{ CondicionesGenerales.empresasIguales }}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Delta true -->
              <div
                class="col-lg-6 col-md-5 col-sm-12"
                v-if="CondicionesGenerales.opcion7x24 == 'SI'">
                <div class="card">
                  <div class="card-content">
                    <div class="card-body cleartfix">
                      <div class="media align-items-stretch">
                        <div class="align-self-center">
                          <i
                            class="icon-screen-desktop success font-large-2 mr-2"></i>
                        </div>
                        <div class="media-body">
                          <h6>Delta</h6>
                          <span>Delta habilitado?</span>
                        </div>
                        <div class="align-self-center">
                          <h4>
                            {{ CondicionesGenerales.opcion7x24 }}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Delta Fail -->
              <div class="col-lg-6 col-md-5 col-sm-12" v-else>
                <div class="card">
                  <div class="card-content">
                    <div class="card-body cleartfix">
                      <div class="media align-items-stretch">
                        <div class="align-self-center">
                          <i
                            class="icon-screen-desktop danger font-large-2 mr-2"></i>
                        </div>
                        <div class="media-body">
                          <h6>Delta</h6>
                          <span>Delta habilitado?</span>
                        </div>
                        <div class="align-self-center">
                          <h4>
                            {{ CondicionesGenerales.opcionPAE }}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div class="col-12 mt-3 mb-1">
            <h4 class="text-uppercase">Fechas Ambiente</h4>
            <p>Listados de Fechas</p>
            <hr />
          </div>
          <Calendarios :fechaA="CondicionesGenerales.fechaApertura"  :fechaC = "CondicionesGenerales.fechaCierre"  :fecha7x24A = "CondicionesGenerales.fechaAperturaCanales"  :fecha7x24C ="CondicionesGenerales.fechaCierreCanales"></Calendarios>
        </section>
        <loading v-else></loading>
      </div>
    </div>
  </div>
</template>
<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
import moment from "moment";
import AuthService from "@/utils/AuthService";
import Calendarios from "@/components/calendarios.vue";
import Service from "@/components/calendar.vue";
import loading from "@/components/Loading.vue";
export default {
  name: "RubroBolsa",
  components: {
    loading,
    Bar,
    Calendarios,
    Service
  },
  mounted() {
    this.fetchCondicionesGenerales();
  },
  beforeDestroy() {
    clearTimeout(this.timeoutId);
  },
  beforeRouteLeave(to, from, next) {
    clearTimeout(this.timeoutId);
    next();
  },
  data: () => ({
    CondicionesGenerales: null,
    message: "",
    timeoutId: null,
    // charts
    chartData: {},
    chartOptions: {
      responsive: true
    }
  }),

  methods: {
    async fetchCondicionesGenerales() {
      await this.getAllCondicionesGenerales();
      this.timeoutId = setTimeout(this.fetchCondicionesGenerales, 5 * 60 * 1000);
    },
    async getAllCondicionesGenerales() {
      await AuthService.getCondicionesGenerales().then((response) => {
        if (response.Erroresnegocio) {
          if (response.Erroresnegocio.BTErrorNegocio[0]) {
            this.message =
              response.Erroresnegocio.BTErrorNegocio[0].Descripcion;
            if (this.message == "Sesión inválida") {
              setTimeout(() => {
                AuthService.logout();
                this.$store.dispatch("logout");
                this.$router.push("/login");
              }, 3000);
            }
          }
        }
        //this.indices = response.sdtIndices.SdtBBTMONEDA;

        this.CondicionesGenerales = response.sdtCondicionesGenerales;
        if (!this.CondicionesGenerales) {
          this.message = "No se encuentran registros!";
        }
        this.chartData = {
          labels: ["Reglas de negocio", "PAE"],
          datasets: [
            {
              label: "Cantidad",
              backgroundColor: ["#41B883", "#E46651"],
              data: [
                response.sdtCondicionesGenerales.cantidadReglas,
                response.sdtCondicionesGenerales.cantidadPAE
              ]
            }
          ]
        };
      });
    }
    //
    //
  },
  computed: {
    fechaApertura() {
      const fecha = moment(this.CondicionesGenerales.fechaApertura);
      return fecha.format("DD/MM/YYYY");
    },
    fechaCierre() {
      const fecha = moment(this.CondicionesGenerales.fechaCierre);
      return fecha.format("DD/MM/YYYY");
    },
    fechaApertura7x24() {
      const fecha = moment(this.CondicionesGenerales.fechaAperturaCanales);
      return fecha.format("DD/MM/YYYY");
    },
    fechaCierre7x24() {
      const fecha = moment(this.CondicionesGenerales.fechaCierreCanales);
      return fecha.format("DD/MM/YYYY");
    }
  }
};
</script>

<style scoped>

@media screen and (max-width: 1386px) {
  .custom-card {
    height: 130px; /* Ajusta la altura según tus necesidades */
  }

}


@media screen and (max-width: 991px) {
  .custom-card {
    height: 180px; /* Puedes ajustar la altura según tus necesidades */
  }
  .card-content{
    height: 180px;
  }
  
}

@media screen and (max-width: 767px) {
  .custom-card {
    height: 180px; /* Puedes ajustar la altura según tus necesidades */
  }
  .card-content{
    height: 180px;
  }
}

@media screen and (max-width: 576px) {
  .custom-card {
    height: 120px; /* Puedes ajustar la altura según tus necesidades */
  }
  .card-content{
    height: 120px;
  }
}


</style>
