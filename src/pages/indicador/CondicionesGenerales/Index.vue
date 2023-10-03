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
                <h3 class="text-uppercase">debugs</h3>
                <p>Datos Informativos</p>
                <hr />
              </div>
            </div>

            <div class="row">
              <div class="col-lg-5 col-md-5 col-sm-12">
                <div
                  class="card overflow-hidden"
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
                          <h5>Históricos de Reglas de Negocio Activados</h5>
                          <span>
                            Cantidad:
                            {{ CondicionesGenerales.cantidadReglas }}</span
                          >
                        </div>
                        <div class="align-self-center">
                          <h1
                            :class="
                              CondicionesGenerales.reglasNegocio != 'SI'
                                ? 'text-secondary'
                                : 'text-danger tamleter'
                            ">
                            <i class="fas fa-bug"></i>
                            {{ CondicionesGenerales.reglasNegocio }}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-5 col-md-5 col-sm-12">
                <div
                  :class="[
                    'card overflow-hidden',
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
                          <h5>Históricos PAE Activados</h5>
                          <span>
                            Cantidad:
                            {{ CondicionesGenerales.cantidadPAE }}</span
                          >
                        </div>
                        <div class="align-self-center">
                          <h1
                            :class="
                              CondicionesGenerales.opcionPAE != 'SI'
                                ? 'text-secondary'
                                : 'border-danger tamleter'
                            ">
                            <i class="fas fa-bug"></i>

                            {{ CondicionesGenerales.opcionPAE }}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-5 col-md-5 col-sm-12">
                <div
                  :class="[
                    'card overflow-hidden',
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
                          <h5>Opción general</h5>
                          <span>Opción general 2850 activada?</span>
                        </div>
                        <div class="align-self-center">
                          <h1
                            :class="
                              CondicionesGenerales.debug != 'SI'
                                ? 'text-secondary'
                                : 'text-danger tamleter'
                            ">
                            <i class="fas fa-bug"></i>

                            {{ CondicionesGenerales.debug }}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-5 col-md-5 col-sm-12">
                <div
                  :class="[
                    'card overflow-hidden',
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
                          <h5>Workflow</h5>
                          <span>Opción XWFV02 correlativo 1 activada</span>
                        </div>
                        <div class="align-self-center">
                          <h1
                            :class="
                              CondicionesGenerales.opcionWorkFlow != 'SI'
                                ? 'text-secondary'
                                : 'text-danger tamleter'
                            ">
                            <i class="fas fa-bug"></i>

                            {{ CondicionesGenerales.opcionWorkFlow }}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-5 col-md-5 col-sm-12">
                <div
                  :class="[
                    'card overflow-hidden',
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
                          <h5>Reporteador</h5>
                          <span>Opción XWFV02 correlativo 4 activada</span>
                        </div>
                        <div class="align-self-center">
                          <h1
                            :class="
                              CondicionesGenerales.parametrosGeneralesWF != 'SI'
                                ? 'text-secondary'
                                : 'text-danger tamleter'
                            ">
                            <i class="fas fa-bug"></i>

                            {{ CondicionesGenerales.parametrosGeneralesWF }}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 mt-3 mb-1">
                <h3 class="text-uppercase">Periodo Delta 24 x 7</h3>
                <p>24 x 7</p>
                <hr />
              </div>
            </div>
            <div class="row">
              <div class="col-lg-5 col-md-5 col-sm-12">
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
                          <h5>Empresas Iguales</h5>
                          <span>FST017 vs FST017CNL iguales?</span>
                        </div>
                        <div class="align-self-center">
                          <h1>
                            {{ CondicionesGenerales.empresasIguales }}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Delta true -->
              <div
                class="col-lg-5 col-md-5 col-sm-12"
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
                          <h5>Delta</h5>
                          <span>Delta habilitado?</span>
                        </div>
                        <div class="align-self-center">
                          <h1>
                            {{ CondicionesGenerales.opcion7x24 }}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Delta Fail -->
              <div class="col-lg-5 col-md-5 col-sm-12" v-else>
                <div class="card">
                  <div class="card-content">
                    <div class="card-body cleartfix">
                      <div class="media align-items-stretch">
                        <div class="align-self-center">
                          <i
                            class="icon-screen-desktop danger font-large-2 mr-2"></i>
                        </div>
                        <div class="media-body">
                          <h5>Delta</h5>
                          <span>Delta habilitado?</span>
                        </div>
                        <div class="align-self-center">
                          <h1>
                            {{ CondicionesGenerales.opcionPAE }}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div class="col-12 mt-3 mb-1">
            <h3 class="text-uppercase">Fechas Ambiente</h3>
            <p>Listados de Fechas</p>
            <hr />
          </div>
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="main-timeline">
                  <div class="timeline">
                    <a href="#" class="timeline-content">
                      <div class="timeline-icon">
                        <i class="fa fa-calendar"></i>
                      </div>
                      <!-- <div class="timeline-year">2021-11-30</div> -->
                      <h3 class="title">Fecha de apertura core</h3>
                      <p class="description">
                        {{ fechaApertura }}
                      </p>
                    </a>
                  </div>
                  <div class="timeline">
                    <a href="#" class="timeline-content">
                      <div class="timeline-icon">
                        <i class="fa fa-calendar"></i>
                      </div>
                      <!-- <div class="timeline-year">2021-11-30</div> -->
                      <h3 class="title">Fecha de cierre core</h3>
                      <p class="description">
                        {{ fechaCierre }}
                      </p>
                    </a>
                  </div>
                  <div class="timeline">
                    <a href="#" class="timeline-content">
                      <div class="timeline-icon">
                        <i class="fa fa-calendar"></i>
                      </div>
                      <!-- <div class="timeline-year">2021-11-30</div> -->
                      <h3 class="title">Fecha de apertura 24x7</h3>
                      <p class="description">
                        {{ fechaApertura7x24 }}
                      </p>
                    </a>
                  </div>
                  <div class="timeline">
                    <a href="#" class="timeline-content">
                      <div class="timeline-icon">
                        <i class="fa fa-calendar"></i>
                      </div>
                      <!-- <div class="timeline-year">2021-11-30</div> -->
                      <h3 class="title">Fecha de cierre 24x7</h3>
                      <p class="description">
                        {{ fechaCierre7x24 }}
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
import ApiService from "@/utils/ApiService.js";
import loading from "@/components/Loading.vue";
export default {
  name: "RubroBolsa",
  components: {
    loading,
    Bar
  },
  mounted() {
    this.getAllCondicionesGenerales();
  },
  data: () => ({
    CondicionesGenerales: null,
    message: "",
    // charts
    chartData: {},
    chartOptions: {
      responsive: true
    }
  }),

  methods: {
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
/* .tamleter{
  font-size: 48px;
} */

.border-width-3 {
  border-width: 3px !important;
}
.border-width-5 {
  border-width: 3px !important;
}
.main-timeline {
  font-family: "Poppins", sans-serif;
}
.main-timeline:after {
  content: "";
  display: block;
  clear: both;
}
.main-timeline .timeline {
  width: calc(50% + 70px);
  margin: 0 5px 0 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  float: left;
}
.main-timeline .timeline-content {
  color: #555;
  background: #fff;
  min-height: 130px;
  padding: 30px 150px 30px 30px;
  border-top: none;
  display: block;
  position: relative;
}
.main-timeline .timeline-content:before {
  content: "";
  background-color: #00c6da;
  height: 100%;
  width: 70px;
  position: absolute;
  top: 0;
  right: 0;
}
.main-timeline .timeline-content:hover {
  text-decoration: none;
}
.main-timeline .timeline-icon {
  color: #fff;
  font-size: 40px;
  line-height: 40px;
  transform: translateY(-50%);
  position: absolute;
  top: 50%;
  right: 16px;
}
.main-timeline .timeline-year {
  color: #333;
  font-size: 20px;
  font-weight: 700;
  line-height: 40px;
  text-align: center;
  transform: translateY(-50%) rotate(90deg);
  position: absolute;
  top: 50%;
  right: 60px;
}
.main-timeline .title {
  color: #00c6da;
  font-size: 23px;
  font-weight: 600;
  text-transform: uppercase;
  margin: 0 0 5px;
}
.main-timeline .description {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}
.main-timeline .timeline:nth-child(even) {
  float: right;
  margin: 0 0 0 5px;
}
.main-timeline .timeline:nth-child(even) .timeline-content {
  padding: 30px 30px 30px 150px;
}
.main-timeline .timeline:nth-child(even) .timeline-content:before {
  right: auto;
  left: 0;
}
.main-timeline .timeline:nth-child(even) .timeline-icon {
  right: auto;
  left: 10px;
}
.main-timeline .timeline:nth-child(even) .timeline-year {
  right: auto;
  left: 60px;
}
.main-timeline .timeline:nth-child(4n + 2) .timeline-content:before {
  background-color: #00a6f9;
}
.main-timeline .timeline:nth-child(4n + 2) .title {
  color: #00a6f9;
}
.main-timeline .timeline:nth-child(4n + 3) .timeline-content:before {
  background-color: #ff3e7d;
}
.main-timeline .timeline:nth-child(4n + 3) .title {
  color: #ff3e7d;
}
.main-timeline .timeline:nth-child(4n + 4) .timeline-content:before {
  background-color: #7438b9;
}
.main-timeline .timeline:nth-child(4n + 4) .title {
  color: #7438b9;
}
@media screen and (max-width: 767px) {
  .main-timeline .timeline,
  .main-timeline .timeline:nth-child(even) {
    width: 100%;
    margin: 0 0 30px;
  }
}
@media screen and (max-width: 576px) {
  .main-timeline .timeline .timeline-content,
  .main-timeline .timeline:nth-child(even) .timeline-content {
    text-align: center;
    padding: 130px 25px 25px;
  }
  .main-timeline .timeline .timeline-content:before,
  .main-timeline .timeline:nth-child(even) .timeline-content:before {
    height: 70px;
    width: 100%;
  }
  .main-timeline .timeline-icon,
  .main-timeline .timeline:nth-child(even) .timeline-icon {
    transform: translateY(0) translateX(-50%);
    top: 16px;
    left: 50%;
    right: auto;
  }
  .main-timeline .timeline-year,
  .main-timeline .timeline:nth-child(even) .timeline-year {
    transform: translateY(0) translateX(-50%);
    top: 80px;
    left: 50%;
    right: auto;
  }
}
</style>
