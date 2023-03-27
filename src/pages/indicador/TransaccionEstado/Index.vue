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
                    <h3>{{ transacciones.Exito }}</h3>
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
                    <h3>{{ transacciones.Error }}</h3>
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
                    <h3>{{ transacciones.Otros }}</h3>
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
        <div class="col-12">
          <LineChartGenerator
        :options="chartOptions"
        :data="chartData"
        class="mb-2" />
        </div>
        <div class="col-12">
          <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
        </div>
        <!-- <div class="col-12">
          <Doughnut :options="chartOptions" :data="chartData"  />
        </div> -->
        <div class="col-12">
          <Radar :options="chartOptions" :data="chartData" />
        </div>
      </div>
      <div class="row justify-content-md-center">
        <div class="col-md-7 mt-3">
          <ul class="list-group">
            <li
              class="list-group-item d-flex justify-content-between align-items-center">
              Movimiento autorizado sin contabilizar(A)
              <span class="badge badge-primary badge-pill">
                {{ transacciones.Transacciona }}
              </span>
            </li>
            <li
              class="list-group-item d-flex justify-content-between align-items-center">
              Movimiento de ingreso batch no contabilizado(B)
              <span class="badge badge-warning badge-pill">
                {{ transacciones.Transaccionb }}
              </span>
            </li>
            <li
              class="list-group-item d-flex justify-content-between align-items-center">
              Movimiento con errores(E)
              <span class="badge badge-danger badge-pill">
                {{ transacciones.Transaccione }}
              </span>
            </li>

            <li
              class="list-group-item d-flex justify-content-between align-items-center">
              Movimiento contabilizado y pasado al histórico(H)
              <span class="badge badge-primary badge-pill">
                {{ transacciones.Transaccionh }}
              </span>
            </li>
            <li
              class="list-group-item d-flex justify-content-between align-items-center">
              Movimiento de ingreso libre no contabilizado(L)
              <span class="badge badge-warning badge-pill">
                {{ transacciones.Transaccionl }}
              </span>
            </li>
            <li
              class="list-group-item d-flex justify-content-between align-items-center">
              Movimiento con autorizaciones pendientes(M)
              <span class="badge badge-primary badge-pill">
                {{ transacciones.Transaccionm }}
              </span>
            </li>
            <li
              class="list-group-item d-flex justify-content-between align-items-center">
              Movimiento ingresado por el transaccional no contabilizado(N)
              <span class="badge badge-warning badge-pill">
                {{ transacciones.Transaccionn }}
              </span>
            </li>
            <li
              class="list-group-item d-flex justify-content-between align-items-center">
              Movimiento contabilizado, pasado al histórico, con archivos de
              saldos históricos actualizados(P)
              <span class="badge badge-primary badge-pill">
                {{ transacciones.Transaccionp }}
              </span>
            </li>
            <li
              class="list-group-item d-flex justify-content-between align-items-center">
              Movimiento con autorizaciones denegadas(R)
              <span class="badge badge-warning badge-pill">
                {{ transacciones.Transaccionr }}
              </span>
            </li>
            <li
              class="list-group-item d-flex justify-content-between align-items-center">
              Movimiento contabilizado sin pasar al histórico(S)
              <span class="badge badge-primary badge-pill">
                {{ transacciones.Transaccions }}
              </span>
            </li>
            <li
              class="list-group-item d-flex justify-content-between align-items-center">
              Movimiento con autoriz. p/tipo cambio ingresado, para ser
              retomado(X)
              <span class="badge badge-primary badge-pill">
                {{ transacciones.Transaccionx }}
              </span>
            </li>
            <li
              class="list-group-item d-flex justify-content-between align-items-center">
              Sin especificar
              <span class="badge badge-info badge-pill">
                {{ transacciones.Transaccionsp }}
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
import { Line as LineChartGenerator } from "vue-chartjs";
import { Bar } from "vue-chartjs";
import { Doughnut } from 'vue-chartjs'
import { Radar } from 'vue-chartjs'
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
  BarElement,
 
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
    loading,
    LineChartGenerator,
    Bar,
    Doughnut,
    Radar
  },
  mounted() {
    this.getAllTansaccionEstado();
  },
  data: () => ({
    transacciones: null,
    message: "",

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

        this.transacciones = response.sDTTransaccionesEstados;
        this.chartData = {
          labels: [
            "Movimiento autorizado sin contabilizar(A)",
            "Movimiento de ingreso batch no contabilizado(B)",
            "Movimiento con errores(E)",
            "Movimiento contabilizado y pasado al histórico(H)",
            "Movimiento de ingreso libre no contabilizado(L)",
            "Movimiento con autorizaciones pendientes(M)",
            "Movimiento ingresado por el transaccional no contabilizado(N)",
            "Movimiento contabilizado, pasado al histórico, con archivos de saldos históricos actualizados(P)",
            "Movimiento con autorizaciones denegadas(R)",
            "Movimiento contabilizado sin pasar al histórico(S)",
            "Movimiento con autoriz. p/tipo cambio ingresado, para ser retomado(X)",
            "Sin especificar"
          ],
          datasets: [
            {
              label: "Cantidad",
              backgroundColor: "#f87979",
              data: [
                response.sDTTransaccionesEstados.Transacciona,
                response.sDTTransaccionesEstados.Transaccionb,
                response.sDTTransaccionesEstados.Transaccione,
                response.sDTTransaccionesEstados.Transaccionh,
                response.sDTTransaccionesEstados.Transaccionl,
                response.sDTTransaccionesEstados.Transaccionm,
                response.sDTTransaccionesEstados.Transaccionn,
                response.sDTTransaccionesEstados.Transaccionp,
                response.sDTTransaccionesEstados.Transaccionr,
                response.sDTTransaccionesEstados.Transaccions,
                response.sDTTransaccionesEstados.Transaccionx,
                response.sDTTransaccionesEstados.Transaccionsp
              ]
            }
          ]
        };
      });
    }
    //
    //
  },
};
</script>

<style scoped>
.list-group-item {
  background-color: #fff;
  color: black;
}
</style>
