<template>
  <div>
    <div class="alert alert-warning" role="alert" v-show="message">
      {{ message + "!" }}
    </div>
    <div v-if="transacciones">
      <h2>Estado Transacciones</h2>
      <hr />
      <div class="row">
        <div class="col-12 mt-3 mb-1">
          <h4 class="text-uppercase">Resumen</h4>
          <p>Resumen General</p>
        </div>

        <div class="col-xl-3 col-sm-6 col-12">
          <div class="card">
            <div class="card-content">
              <div class="card-body">
                <div class="media d-flex">
                  <div class="align-self-center">
                    <i class="icon-graph info font-large-2 float-left"></i>
                  </div>
                  <div class="media-body text-right">
                    <h3>
                      {{
                        transacciones.exito +
                        transacciones.error +
                        transacciones.otros
                      }}
                    </h3>
                    <span>Total de Transacciones</span>
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
                    <i class="icon-graph success font-large-2 float-left"></i>
                  </div>
                  <div class="media-body text-right">
                    <h3>{{ transacciones.exito }}</h3>
                    <span>Contabilizadas con Éxito</span>
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
                    <i class="icon-graph danger font-large-2 float-left"></i>
                  </div>
                  <div class="media-body text-right">
                    <h3>{{ transacciones.error }}</h3>
                    <span>Contabilizadas con Error</span>
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
                    <i class="icon-graph warning font-large-2 float-left"></i>
                  </div>
                  <div class="media-body text-right">
                    <h3>{{ transacciones.otros }}</h3>
                    <span>Otros</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 mt-3 mb-1">
        <h4 class="text-uppercase">Detalle</h4>
        <p>Detalle Transacciones</p>
      </div>

      <div class="row">
        <div class="col-12 mb-3">
          <Bar
            id="my-chart-id"
            :options="chartOptions"
            :data="chartData"
            class="mb-2" />
        </div>
      </div>

      <div class="row mt-2 justify-content-md-center">
        <div class="col-md-7">
          <div class="form-group" data-select2-id="52">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01"
                  >Movimiento</label
                >
              </div>
              <select
                v-model="busqueda"
                class="custom-select"
                id="inputGroupSelect01"
                placeholder="elegir">
                <option value="">(Elegir)</option>
                <option
                  v-for="(item, index) in labels"
                  :key="index"
                  :value="item.id">
                  {{ item.description }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-md-center">
        <div class="col-md-7 mt-1">
          <ul class="list-group">
            <li
              v-for="(item, index) in transaccionFiltrada"
              :key="index"
              class="d-flex justify-content-between align-items-center mt-3">
              <span style="font-size: 15px">{{ item.descripcion }}</span>
              <span style="font-size: 18px">
                <p>{{ item.cantidad }}</p>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <loading v-else></loading>
  </div>
</template>
<script>
import { Bar } from "vue-chartjs";

import {
  Chart as ChartJS,
  Title,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  BarElement
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  BarElement
);
import AuthService from "@/utils/AuthService";
import ApiService from "@/utils/ApiService.js";
import loading from "@/components/Loading.vue";
export default {
  name: "RubroBolsa",
  components: {
    Bar,
    loading
  },
  mounted() {
    this.getAllTansaccionEstado();
  },
  data: () => ({
    busqueda: "",
    transacciones: null,
    message: "",
    transaccionesOrdenadas: [],
    chartData: {},
    labels: [
      { id: "(A)", description: "Movimiento autorizado sin contabilizar" },
      {
        id: "(B)",
        description: "Movimiento de ingreso batch no contabilizado"
      },
      { id: "(E)", description: "Movimiento con errores" },
      {
        id: "(H)",
        description: "Movimiento contabilizado y pasado al histórico"
      },
      {
        id: "(L)",
        description: "Movimiento de ingreso libre no contabilizado"
      },
      { id: "(M)", description: "Movimiento con autorizaciones pendientes" },
      {
        id: "(N)",
        description:
          "Movimiento ingresado por el transaccional no contabilizado"
      },
      {
        id: "(P)",
        description:
          "Movimiento contabilizado, pasado al histórico, con archivos de saldos históricos actualizados"
      },
      { id: "(R)", description: "Movimiento con autorizaciones denegadas" },
      {
        id: "(S)",
        description: "Movimiento contabilizado sin pasar al histórico"
      },
      {
        id: "(X)",
        description:
          "Movimiento con autoriz. p/tipo cambio ingresado, para ser retomado"
      },
      { id: "Sin especificar", description: "Sin especificar" }
    ],

    chartOptions: {
      responsive: true,
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  }),

  methods: {
    async getAllTansaccionEstado() {
      await AuthService.getTansaccionEstado().then((response) => {
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

        this.transacciones = response.sdtTransaccionesEstados;
        if (!this.transacciones) {
          this.message = "No se encuentran registros!";
        }
        this.transaccionesOrdenadas = Object.keys(this.transacciones)
          .filter((key) => key.includes("transaccion"))
          .map((key) => {
            const transaccion = {
              codigo: key,
              descripcion: "",
              cantidad: this.transacciones[key]
            };
            switch (key) {
              case "transaccionA":
                transaccion.descripcion =
                  "Movimiento autorizado sin contabilizar(A)";
                break;
              case "transaccionB":
                transaccion.descripcion =
                  "Movimiento de ingreso batch no contabilizado(B)";
                break;
              case "transaccionE":
                transaccion.descripcion = "Movimiento con errores(E)";
                break;
              case "transaccionH":
                transaccion.descripcion =
                  "Movimiento contabilizado y pasado al histórico(H)";
                break;
              case "transaccionL":
                transaccion.descripcion =
                  "Movimiento de ingreso libre no contabilizado(L)";
                break;
              case "transaccionM":
                transaccion.descripcion =
                  "Movimiento con autorizaciones pendientes(M)";
                break;
              case "transaccionN":
                transaccion.descripcion =
                  "Movimiento ingresado por el transaccional no contabilizado(N)";
                break;
              case "transaccionP":
                transaccion.descripcion =
                  "Movimiento contabilizado, pasado al histórico, con archivos de saldos históricos actualizados(P)";
                break;
              case "transaccionR":
                transaccion.descripcion =
                  "Movimiento con autorizaciones denegadas(R)";
                break;
              case "transaccionS":
                transaccion.descripcion =
                  "Movimiento contabilizado sin pasar al histórico(S)";
                break;
              case "transaccionSP":
                transaccion.descripcion = "Sin especificar";
                break;
              case "transaccionX":
                transaccion.descripcion =
                  "Movimiento con autoriz. p/tipo cambio ingresado, para ser retomado(X)";
                break;
            }

            return transaccion;
          })
          .sort((a, b) => {
            if (a.codigo === "transaccionSP") return 1;
            if (b.codigo === "transaccionSP") return -1;
            return a.codigo.localeCompare(b.codigo);
          });

        this.chartData = {
          labels: [],
          datasets: [
            {
              label: "Cantidad",
              backgroundColor: [],
              data: []
            }
          ]
        };
        for (const [key, value] of Object.entries(
          response.sdtTransaccionesEstados
        )) {
          if (value !== null && value !== 0 && key.startsWith("transaccion")) {
            let label = key.slice(11);
            if (
              label === "A" ||
              label === "B" ||
              label === "L" ||
              label === "N" ||
              label === "S" ||
              label === "X" ||
              label === "SP"
            ) {
              this.chartData.datasets[0].backgroundColor.push("#f0ad4e");
            }
            if (label === "E" || label === "R") {
              this.chartData.datasets[0].backgroundColor.push("#22bb33");
            }
            if (label === "H" || label === "M" || label === "P") {
              this.chartData.datasets[0].backgroundColor.push("#bb2124");
            }

            if (label === "SP") {
              label = "Sin especificar";
            }
            this.chartData.labels.push(label);

            this.chartData.datasets[0].data.push(value);
          }
        }
      });
    },
    getClass(item) {
      switch (item.codigo) {
        // case "transaccionA":
        //   return "badge-warning";
        // case "transaccionB":
        //   return "badge-warning";
        // case "transaccionE":
        //   return "badge-danger";
        // case "transaccionH":
        //   return "badge-success";
        // case "transaccionL":
        //   return "badge-warning";
        // case "transaccionM":
        //   return "badge-success";
        // case "transaccionN":
        //   return "badge-warning";
        // case "transaccionP":
        //   return "badge-success";
        // case "transaccionR":
        //   return "badge-danger";
        // case "transaccionS":
        //   return "badge-warning";
        // case "transaccionSP":
        //   return "badge-success";
        // case "transaccionX":
        //   return "badge-warning";
        // case "Sin especificar":
        //   return "badge-warning";
        default:
          return "";
      }
    }
  },
  computed: {
    transaccionFiltrada() {
      //var buscado = this.TextoBuscado.toUpperCase();
      console.log(this.busqueda);
      return this.transaccionesOrdenadas.filter((objeto) => {
        const descripcion = objeto.descripcion;
        return descripcion.includes(this.busqueda);
        // return (
        // objeto.descripcion.toUpperCase().includes(buscado) ||
        // objeto.identificador == parseInt(buscado)
        //)
      });
    }
  }
};
</script>

<style scoped>
.list-group-item {
  background-color: #fff;
  color: black;
}
</style>
