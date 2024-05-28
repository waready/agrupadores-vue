<template>
  <div>
    <div v-if="rubroBolsa">
      <div class="row">
        <div class="col-12 mt-3 mb-1">
          <h3 class="text-uppercase">Ejecuciones por Servicios</h3>
          <p class="text-muted">Información detallada sobre las ejecuciones por servicios</p>
          <hr />
        </div>
      </div>
      <!-- Sección nueva para mostrar la agrupación de ejecuciones por servicio -->
      <div class="row">
        <div class="col-12 mt-2 mb-3">
          <h3 class="text-center">RESUMEN</h3>
        </div>
        <div v-for="(item, index) in agrupacionServicios" :key="index" class="col-lg-4 col-md-6 col-sm-12 mb-3">
          <div class="card shadow h-100">
            <div class="card-body">
              <h5 class="card-title">{{ item.servicio }}</h5>
              <p class="card-text text-muted">Total de Ejecuciones: {{ item.cantidadEjecuciones }}</p>
              <div class="progress">
                <div class="progress-bar bg-success" role="progressbar"
                  :style="{ width: (item.cantidadEjecuciones / maxAgrupadas * 100) + '%' }"
                  aria-valuenow="item.cantidadEjecuciones" aria-valuemin="0" :aria-valuemax="maxAgrupadas">{{
                    item.cantidadEjecuciones }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Fin de la nueva sección -->
      <div class="row">
        <div class="col-12 mt-2 mb-3">
          <h3 class="text-center">LISTADO DE SERVICIOS POR EJECUCIONES</h3>
        </div>
        <Bar id="my-chart-id" :data="chartData" :options="options" />
        <!-- <div v-for="(item, index) in rubroBolsa" :key="index" class="col-lg-4 col-md-6 col-sm-12 mb-3">
          <div class="card shadow h-100">
            <div class="card-body">
              <h5 class="card-title">{{ item.servicio }}</h5>
              <p class="card-text text-muted">Método: {{ item.metodo }}</p>
              <p class="card-text text-muted">Cantidad de Ejecuciones: {{ item.cantidadEjecuciones }}</p>
              <div class="progress">
                <div class="progress-bar bg-primary" role="progressbar"
                  :style="{ width: (item.cantidadEjecuciones / maxEjecuciones * 100) + '%' }"
                  aria-valuenow="item.cantidadEjecuciones" aria-valuemin="0" :aria-valuemax="maxEjecuciones">{{
                    item.cantidadEjecuciones }}</div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <loading v-else></loading>
  </div>
</template>

<script>
import AuthService from "@/utils/AuthService";
import loading from "@/components/Loading.vue";
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

export default {
  name: "RubroBolsa",
  components: {
    loading,
    Bar,
  },
  mounted() {
    this.getAllRubroBolsas();
  },
  data: () => ({
    mostrarClave: [],
    rubroBolsa: null,
    agrupacionServicios: [],
    message: "",
    maxEjecuciones: 0,
    maxAgrupadas: 0,
    options: {
      plugins: {
        legend: {
          display: false
        }
      }
    }
  }),

  methods: {
    async getAllRubroBolsas() {
      await AuthService.getEjecucionPorServicio().then((response) => {
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

        this.rubroBolsa = response.sdtEjecucionesPorServicio.sBTEjecucionesPorServicio;

        if (!this.rubroBolsa[0]) {
          this.message = "No se encuentran registros!";
        } else {
          this.maxEjecuciones = Math.max(...this.rubroBolsa.map(item => item.cantidadEjecuciones));
          this.agruparEjecucionesPorServicio();
        }
      });
    },

    agruparEjecucionesPorServicio() {
      const agrupacion = {};

      this.rubroBolsa.forEach(item => {
        if (agrupacion[item.servicio]) {
          agrupacion[item.servicio] += item.cantidadEjecuciones;
        } else {
          agrupacion[item.servicio] = item.cantidadEjecuciones;
        }
      });

      this.agrupacionServicios = Object.keys(agrupacion).map(servicio => {
        return {
          servicio: servicio,
          cantidadEjecuciones: agrupacion[servicio]
        };
      });

      this.maxAgrupadas = Math.max(...this.agrupacionServicios.map(item => item.cantidadEjecuciones));
    },

    generateRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  },

  computed: {
    chartData() {
      const labels = this.rubroBolsa.map(item => `${item.metodo} `);
      const data = this.rubroBolsa.map(item => item.cantidadEjecuciones);
      const backgroundColors = this.rubroBolsa.map(() => this.generateRandomColor());

      return {
        labels: labels,
        datasets: [
          {
            label: 'Cantidad de Ejecuciones',
            backgroundColor: '#acd4f4',
            borderColor: '#2596be',
            borderWidth: 2,
            data: data
          }
        ]
      };
    },
  }
};
</script>

<style scoped>
.card {
  border: none;
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.25rem;
}

.card-text {
  font-size: 1rem;
}

.progress {
  height: 25px;
  margin-top: 10px;
}

.progress-bar {
  font-size: 0.875rem;
}
</style>
