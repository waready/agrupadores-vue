<template>
  <div>
    <div class="alert alert-warning" role="alert" v-show="message">
      {{ message + "!" }}
    </div>
    <div v-if="transacciones">
      <h2>Estado Transacciones</h2>
      <hr />
      <!-- <div class="row">
        <div class="col-12 mt-3 mb-1">
          <h4 class="text-uppercase">Resumen</h4>
          <p>Resumen General</p>
        </div>

        <div class="col-xl-3 col-sm-6 col-12">
          <div class="card h-80">
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
          <div class="card h-80">
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
          <div class="card h-80">
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
          <div class="card h-80">
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
      </div> -->
      <div class="col-12 mt-3 mb-1">
        <h4 class="text-uppercase">Detalle</h4>
        <p>Detalle Transacciones</p>
      </div>
      
      <div class="row">
        <div class="col-7 d-flex justify-content-center">
          <Pie id="my-chart-id" :data="chartData" :style="myStyles" />
        </div>
        <div class="col-5">
          <div class="col-12">
          <div class="card">
            <div class="card-content">
              <div class="card-body">
                <div class="media d-flex">
                  <div class="align-self-center">
                    <i class="icon-graph info font-large-2 float-left"></i>
                  </div>
                  <div class="media-body text-right">
                    <h4>
                      {{
                        transacciones.exito +
                        transacciones.error +
                        transacciones.otros
                      }}
                    </h4>
                    <span>Total de Transacciones</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          <div class="col-12">
            <div class="card v-10">
              <div class="card-content">
                <div class="card-body">
                  <div class="media d-flex">
                    <div class="align-self-center">
                      <i class="icon-graph success font-large-2 float-left"></i>
                    </div>
                    <div class="media-body text-right">
                      <h4>{{ transacciones.exito }}</h4>
                      <span>Contabilizadas con Éxito</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12">
            <div class="card">
              <div class="card-content">
                <div class="card-body">
                  <div class="media d-flex">
                    <div class="align-self-center">
                      <i class="icon-graph danger font-large-2 float-left"></i>
                    </div>
                    <div class="media-body text-right">
                      <h4>{{ transacciones.error }}</h4>
                      <span>Contabilizadas con Error</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12">
            <div class="card">
              <div class="card-content">
                <div class="card-body">
                  <div class="media d-flex">
                    <div class="align-self-center">
                      <i class="icon-graph warning font-large-2 float-left"></i>
                    </div>
                    <div class="media-body text-right">
                      <h4>{{ transacciones.otros }}</h4>
                      <span>Otros</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <div class="container mt-2">
        <div class="row justify-content-md-center">
          <div class="col-md-7">
            <div class="form-group">
              <label for="inputGroupSelect01">Movimiento</label>
              <select v-model="busqueda" class="custom-select" id="inputGroupSelect01" placeholder="elegir">
                <option value="">(Elegir)</option>
                <option v-for="(item, index) in labels" :key="index" :value="item.id">{{ item.description }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="row justify-content-md-center">
          <div class="col-md-12 mt-1">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Movimiento</th>
                  <th scope="col">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in transaccionFiltrada" :key="index">
                  <td>{{ item.descripcion }}</td>
                  <td :class="isPrimaryBadge(item.descripcion)">{{ item.cantidad }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
    <loading v-else></loading>
  </div>
</template>
<script>
import { Bar } from "vue-chartjs";
import { Pie } from "vue-chartjs";
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
  BarElement,
  Legend
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
import AuthService from "@/utils/AuthService";
import ApiService from "@/utils/ApiService.js";
import loading from "@/components/Loading.vue";
export default {
  name: "RubroBolsa",
  components: {
    Bar,
    Pie,
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
    isPrimaryBadge(description) {
      const labelscolor = ["A", "B", "L", "N", "X", "SP"];
      const labelscolorRed = ["E", "R"];
      const labelscolorGreen = ["H", "(S)"];

      if (labelscolor.some(label => description.includes(label))) {
        return 'table-warning';
      } else if (labelscolorRed.some(label => description.includes(label))) {
        return 'table-danger'; // Assuming red for these labels
      } else if (labelscolorGreen.some(label => description.includes(label))) {
        return 'table-success'; // Assuming green for these labels
      }
      return 'table-warning'; // Default case
    },
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

        const exito = response.sdtTransaccionesEstados.exito || 0;
        const error = response.sdtTransaccionesEstados.error || 0;
        const otros = response.sdtTransaccionesEstados.otros || 0;

        this.chartData = {
          labels: ["Éxito", "Error", "Otros"],
          datasets: [
            {
              label: "Cantidad",
              backgroundColor: ["#16d39a", "#ff7588", "#ffa87d"], // Puedes cambiar los colores según tus preferencias
              data: [exito, error, otros],
            },
          ],
        };
      });
    }
  },
  computed: {
    myStyles() {
      return {
        height: `${400}px`,
        //position: "relative"
      };
    },
    transaccionFiltrada() {
  // Crear subarrays para cada grupo
  const grupo1 = [];
  const grupo2 = [];
  const grupo3 = [];

  // Filtrar y asignar cada objeto al grupo correspondiente
  this.transaccionesOrdenadas.forEach(objeto => {
    const ultimaLetra = objeto.codigo.slice(-1);

    if (["A", "B", "L", "N", "X", "SP", "M", "P"].includes(ultimaLetra)) {
      grupo1.push(objeto);
    } else if (["E", "R"].includes(ultimaLetra)) {
      grupo2.push(objeto);
    } else if (["H", "S"].includes(ultimaLetra)) {
      grupo3.push(objeto);
    }
  });

  // Ordenar cada grupo por cantidad de mayor a menor
  grupo1.sort((a, b) => b.cantidad - a.cantidad);
  grupo2.sort((a, b) => b.cantidad - a.cantidad);
  grupo3.sort((a, b) => b.cantidad - a.cantidad);

  // Concatenar los subarrays en un solo array ordenado
  const transaccionesFiltradas = [...grupo1, ...grupo2, ...grupo3];

  // Filtrar nuevamente según la búsqueda
  const resultadoFinal = transaccionesFiltradas.filter(objeto => {
    const descripcion = objeto.descripcion;
    return descripcion.includes(this.busqueda);
  });

  return resultadoFinal;
}


  }
};
</script>
