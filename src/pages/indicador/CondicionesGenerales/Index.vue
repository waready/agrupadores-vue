<template>
  <div class="container">
    <div class="row">
      <h2>Condiciones generales</h2>
      <div class="grey-bg container-fluid">

        <section v-if="CondicionesGenerales">
          <section id="stats-subtitle">
            <div class="row">
              <div class="col-12 mt-3 mb-1">
                <h4 class="text-uppercase">Estadisticas</h4>
                <p>Reglas de Negocio - PAE</p>
              </div>
              <div class="col-xl-6 col-sm-6 col-12">
                <div class="card">
                  <div class="card-content">
                    <div class="card-body">
                      <div class="media d-flex">
                        <div class="align-self-center">
                         <h1
                            :class="
                              CondicionesGenerales.Reglasnegocio != 'SI'
                                ? 'danger'
                                : 'success'
                            ">
                            {{ CondicionesGenerales.Reglasnegocio }}
                          </h1>
                        </div>
                        <div class="media-body text-right">
                          <h3>{{CondicionesGenerales.Cantidadreglas}}</h3>
                          <span>Reglas de negocio</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-sm-6 col-12">
                <div class="card">
                  <div class="card-content">
                    <div class="card-body">
                      <div class="media d-flex">
                        <div class="align-self-center">
                         <h1
                            :class="
                              CondicionesGenerales.Opcionpae != 'SI'
                                ? 'danger'
                                : 'success'
                            ">
                            {{ CondicionesGenerales.Opcionpae }}
                          </h1>
                        </div>
                        <div class="media-body text-right">
                          <h3>{{CondicionesGenerales.Cantidadpae}}</h3>
                          <span>PAE</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
            </div>

            <div class="row">
              <div class="col-12 mt-3 mb-1">
                <h4 class="text-uppercase">Debugs</h4>
                <p>Datos Informativos</p>
              </div>
            </div>

            <div class="row">
              <div class="col-xl-6 col-md-12">
                <div class="card overflow-hidden">
                  <div class="card-content">
                    <div class="card-body cleartfix">
                      <div class="media align-items-stretch">
                        <div class="align-self-center">
                          <i class="icon-globe primary font-large-2 mr-2"></i>
                        </div>
                        <div class="media-body">
                          <h4>Opción general</h4>
                          <span>Opción general 2850 activada?</span>
                        </div>
                        <div class="align-self-center">
                          <h1
                            :class="
                              CondicionesGenerales.Debug != 'SI'
                                ? 'danger'
                                : 'success'
                            ">
                            {{ CondicionesGenerales.Debug }}
                          </h1>
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
                          <i
                            class="icon-game-controller warning font-large-2 mr-2"></i>
                        </div>
                        <div class="media-body">
                          <h4>Workflow</h4>
                          <span>Opción XWFV02 correlativo 1 activada</span>
                        </div>
                        <div class="align-self-center">
                          <h1
                            :class="
                              CondicionesGenerales.Opcionworflow != 'SI'
                                ? 'danger'
                                : 'success'
                            ">
                            {{ CondicionesGenerales.Opcionworflow }}
                          </h1>
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
                          <i class="icon-folder-alt info font-large-2 mr-2"></i>
                        </div>
                        <div class="media-body">
                          <h4>Reporteador</h4>
                          <span>Opción XWFV02 correlativo 4 activada</span>
                        </div>
                        <div class="align-self-center">
                          <h1
                            :class="
                              CondicionesGenerales.Parametrosgeneraleswf != 'SI'
                                ? 'danger'
                                : 'success'
                            ">
                            {{ CondicionesGenerales.Parametrosgeneraleswf }}
                          </h1>
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
                          <i
                            class="icon-briefcase secondary font-large-2 mr-2"></i>
                        </div>
                        <div class="media-body">
                          <h4>Empresas Iguales</h4>
                          <span>FST017 vs FST017CNL iguales?</span>
                        </div>
                        <div class="align-self-center">
                          <h1
                            :class="
                              CondicionesGenerales.Empresasiguales != 'SI'
                                ? 'danger'
                                : 'success'
                            ">
                            {{ CondicionesGenerales.Empresasiguales }}
                          </h1>
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
                          <i
                            class="icon-screen-desktop success font-large-2 mr-2"></i>
                        </div>
                        <div class="media-body">
                          <h4>Delta</h4>
                          <span>7x24 habilitado?</span>
                        </div>
                        <div class="align-self-center">
                          <h1
                            :class="
                              CondicionesGenerales.Opcion7x24 != 'SI'
                                ? 'danger'
                                : 'success'
                            ">
                            {{ CondicionesGenerales.Opcion7x24 }}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Delta Fail -->
              <div class="col-xl-6 col-md-12">
                <div class="card">
                  <div class="card-content">
                    <div class="card-body cleartfix">
                      <div class="media align-items-stretch">
                        <div class="align-self-center">
                          <i
                            class="icon-screen-desktop danger font-large-2 mr-2"></i>
                        </div>
                        <div class="media-body">
                          <h4>Delta</h4>
                          <span>Delta habilitado?</span>
                        </div>
                        <div class="align-self-center">
                          <h1
                            :class="
                              CondicionesGenerales.Opcionpae != 'SI'
                                ? 'danger'
                                : 'success'
                            ">
                            {{ CondicionesGenerales.Opcionpae }}
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
            <h4 class="text-uppercase">Fechas Ambiente</h4>
            <p>Listados de Fechas</p>
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
                      <h3 class="title">Fecha de apertura 7x24</h3>
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
                      <h3 class="title">Fecha de cierre 7x24</h3>
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
import moment from 'moment';
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
      await ApiService.getCondicionesGenerales().then((response) => {
        console.log(response);
        if (response.Erroresnegocio.BTErrorNegocio[0]) {
          this.message = response.Erroresnegocio.BTErrorNegocio[0].Descripcion;
        }
        //this.indices = response.sdtIndices.SdtBBTMONEDA;

        this.CondicionesGenerales = response.SdtCondicionesGenerales;
        this.chartData = {
          labels: ["Reglas de negocio", "PAE"],
          datasets: [
            {
              label: "Cantidad",
              backgroundColor: ["#41B883", "#E46651"],
              data: [
                response.SdtCondicionesGenerales.Cantidadreglas,
                response.SdtCondicionesGenerales.Cantidadpae
              ]
            }
          ]
        };
      });
    }
    //
    //
  },
  computed:{
    fechaApertura(){
      const fecha = moment(this.CondicionesGenerales.Fechaapertura);
      return fecha.format('DD/MM/YYYY');
    },
    fechaCierre(){
      const fecha = moment(this.CondicionesGenerales.Fechacierre);
      return fecha.format('DD/MM/YYYY');
    },
    fechaApertura7x24(){
      const fecha = moment(this.CondicionesGenerales.Fechaaperturacanales);
      return fecha.format('DD/MM/YYYY');
    },
    fechaCierre7x24(){
      const fecha = moment(this.CondicionesGenerales.Fechacierrecanales);
      return fecha.format('DD/MM/YYYY');
    }
  }
};
</script>

<style scoped>

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
