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
        <div class="col-xl-4 col-sm-6 col-12">
          <div class="card">
            <div class="card-content">
              <div class="card-body">
                <div class="media d-flex">
                  <div class="align-self-center">
                    <i class="icon-graph success font-large-2 float-left"></i>
                  </div>
                  <div class="media-body text-right">
                    <h3>{{ transacciones.exito }}</h3>
                    <span>Contabilizadas con Exito</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-4 col-sm-6 col-12">
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

        <div class="col-xl-4 col-sm-6 col-12">
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
              <select v-model="busqueda" class="custom-select" id="inputGroupSelect01" placeholder="elegir">
                <option value="">(Elegir)</option>
                <option v-for="(item,index) in chartData.labels" :key="index" :value="item">{{item}}</option>
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
              class="list-group-item d-flex justify-content-between align-items-center mt-3">
              {{ item.descripcion }}
              <span :class="['badge', 'badge-pill', getClass(item)]">
                {{ item.cantidad }}
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
  Legend,
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
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  BarElement
);

import ApiService from "@/utils/ApiService.js";
import loading from "@/components/Loading.vue";
export default {
  name: "RubroBolsa",
  components: {
    Bar
  },
  mounted() {
    this.getAllTansaccionEstado();
  },
  data: () => ({
    busqueda:"",
    transacciones: null,
    message: "",
    transaccionesOrdenadas: [],
    chartData: {},
    chartOptions: {
      responsive: true
      // maintainAspectRatio: false
    }
  }),

  methods: {
    async getAllTansaccionEstado() {
      await ApiService.getTansaccionEstado().then((response) => {
        console.log(response);
        if (response.Erroresnegocio.BTErrorNegocio[0]) {
          this.message = response.Erroresnegocio.BTErrorNegocio[0].Descripcion;
        }
        //this.indices = response.sdtIndices.SdtBBTMONEDA;

        this.transacciones = response.sdtTransaccionesEstados;

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
          labels: [
            "(A)",
            "(B)",
            "(E)",
            "(H)",
            "(L)",
            "(M)",
            "(N)",
            "(P)",
            "(R)",
            "(S)",
            "(X)",
            "Sin especificar"
          ],
          datasets: [
            {
              label: "Cantidad",
              backgroundColor: "#f87979",
              data: [
                response.sdtTransaccionesEstados.transaccionA,
                response.sdtTransaccionesEstados.transaccionB,
                response.sdtTransaccionesEstados.transaccionE,
                response.sdtTransaccionesEstados.transaccionH,
                response.sdtTransaccionesEstados.transaccionL,
                response.sdtTransaccionesEstados.transaccionM,
                response.sdtTransaccionesEstados.transaccionN,
                response.sdtTransaccionesEstados.transaccionP,
                response.sdtTransaccionesEstados.transaccionR,
                response.sdtTransaccionesEstados.transaccionS,
                response.sdtTransaccionesEstados.transaccionX,
                response.sdtTransaccionesEstados.transaccionSP
              ]
            }
          ]
        };
      });
    },
    getClass(item) {
      switch (item.codigo) {
        case "transaccionA":
          return "badge-primary";
        case "transaccionB":
          return "badge-warning";
        case "transaccionE":
          return "badge-danger";
        case "transaccionH":
          return "badge-primary";
        case "transaccionL":
          return "badge-warning";
        case "transaccionM":
          return "badge-primary";
        case "transaccionN":
          return "badge-warning";
        case "transaccionP":
          return "badge-primary";
        case "transaccionR":
          return "badge-warning";
        case "transaccionS":
          return "medium-primary";
        case "transaccionSP":
          return "badge-primary";
        case "transaccionX":
          return "medium-info";
        default:
          return "";
      }
    }
  },
  computed: {
    transaccionFiltrada(){
       //var buscado = this.TextoBuscado.toUpperCase();
      return this.transaccionesOrdenadas.filter((objeto) => {
        const descripcion = objeto.descripcion;
        return descripcion.includes(this.busqueda)
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
