<template>
  <div class="container">
    <h2>Métodos Ejecutados de {{ this.objeto }}</h2>
    <div v-if="cajas">
      <hr />
      <div class="row">
        <div class="col-6 d-flex justify-content-center">
          <Pie id="my-chart-id" :data="chartData" :style="myStyles" :options="optionsChar" />
        </div>
        <div class="col-6">
          <div class="row">
            <div class="col-6 text-truncate" v-for="(item, index) in ServiciosEjecutados" :key="item.servicio">
              <div class="card mb-3">
                <div class="card-content">
                  <div class="card-body">
                    <div class="media d-flex">
                      <div class="align-self-center">
                        <i class="icon-pie-chart font-large-1 float-left" :style="{ color: getOrderedColor(index) }"></i>
                      </div>
                      <div class="media-body">
                        <span class="d-inline-block text-truncate" style="max-width: 140px; font-size: smaller;">{{ item.metodo }}</span>
                        <p class="ml-3"> {{ item.cantidadEjecuciones }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-md-12 card">
          <div class="card-body">
            <h3>Detalle de Métodos</h3>
            <div class="">
              <v-client-table ref="table" :data="ServiciosEjecutados" :columns="columns" :options="options">
                <!-- <template v-slot:tiempoMaximo="item">
                  <a :class="[
                    'badge badge-danger  text-white font-weight-bold',
                    'letter'
                  ]">
                    {{ item.row.tiempoMaximo }}</a>
                </template>
                <template v-slot:tiempoMinimo="item">
                  <a :class="[
                    'badge badge-succes  text-white font-weight-bold',
                    'letter'
                  ]">
                    {{ item.row.tiempoMinimo }}</a>
                </template>
                <template v-slot:tiempoPromedio="item">
                  <a :class="[
                    'badge badge-warning  text-white font-weight-bold',
                    'letter'
                  ]">
                    {{ item.row.tiempoPromedio }}</a>
                </template> -->
              </v-client-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading v-else></loading>
  </div>
</template>
<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";
import AuthService from "@/utils/AuthService";
import loading from "@/components/Loading.vue";
import { ServerTable } from "v-tables-3";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "metodos",
  mounted() {
    this.objeto = this.$route.query.datos;
    //console.log('Datos recibidos:', this.objeto);
    this.fetchMetodos();
  },
  beforeDestroy() {
    clearTimeout(this.timeoutId);
  },
  beforeRouteLeave(to, from, next) {
    clearTimeout(this.timeoutId);
    next();
  },
  components: { Pie, loading, ServerTable },
  data() {
    return {
      objeto: null,
      Sucursal: null,
      cajasA: true,
      cajasB: false,
      cajas: false,
      ServiciosEjecutados: [],
      mostrar: false,
      sesiones: null,
      TextoBuscado: "",
      cajasSelect: null,
      cajasAbiertas: [],
      cajasCerradas: [],
      cajasAbiertasPremiun: [],
      cajasCerradasPremiun: [],
      optionsChar: {
        maintainAspectRatio: false
      },
      chartData: {
        labels: ["January", "February", "March"],
        datasets: [
          {
            //backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
            data: [40, 20, 12]
          }
        ]
      },
      columns: [
        "metodo",
        "cantidadEjecuciones",
        "tiempoPromedio",
        "tiempoMaximo",
        "tiempoMinimo",
      ],
      options: {
        sortIcon: {
          is: "fa-sort", // utiliza iconos de Font Awesome
          base: "fa",
          up: "fa-sort-asc",
          down: "fa-sort-desc"
        },
        // see the options API
        texts: {
          count:
            "Mostrando {from} a {to} de {count} registros |{count} registros|Un registro",
          first: "Primero",
          last: "Ultimo",
          filter: "Filtro:",
          filterPlaceholder: "Búsqueda",
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
        perPage: 10,
        perPageValues: [10, 25, 50, 100, 500],
        headings: {
          // id: 'ID',
          metodo: "Nombre",
          tiempoMaximo: "Tiempo máx",
          tiempoMinimo: "Tiempo mín",
          tiempoPromedio: "Tiempo promedio",
          cantidadEjecuciones: "Cantidad ejecuciones",
        }
      }
    };
  },
  methods: {
    getAdjustedColor(color) {
      const colorNum = Math.max(0, parseInt(color.slice(1), 16) - 50);
      const adjustedColor = `#${colorNum.toString(16).padStart(6, '0').toUpperCase()}`;
      return adjustedColor;
    }, 
    getOrderedColor(index) {
      const colors = ['#FF5454', '#FFFF90', '#60C1FF', '#FFC670', '#8CC76D', '#C187E8', '#5D5A5D']; // rojo, amarillo, azul, naranja, verde, violeta, negro
      let color = colors[index % colors.length];
      // Ajustar el color si es repetido
      if (index >= colors.length) {
        color = this.getAdjustedColor(color);
      }
      return color;
    },
    async fetchMetodos() {
      await this.getAllMetodos();
      this.timeoutId = setTimeout(this.fetchMetodos, 5 * 60 * 1000);
    },
    async getAllMetodos() {
      await AuthService.getMetodosMasEjecutados(this.objeto).then((response) => {
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
        this.cajas = true;
        this.ServiciosEjecutados = response.sdtEstadisticasMetodos.sBTEstadisticasMetodo;

        this.chartData = {
          //labels: this.ServiciosEjecutados.map(servicio => servicio.metodo),
          datasets: [
            {
              label: 'Cantidad de Ejecuciones',
              backgroundColor: this.ServiciosEjecutados.map((_, index) => this.getOrderedColor(index)),
              data: this.ServiciosEjecutados.map(servicio => servicio.cantidadEjecuciones)
            }
          ]
        };

        $(document).ready(function () {
          $(".VuePagination__count").text(function (i, text) {
            return text.replace("Un registro", "1 registro");
          });
          $(".VueTables__search-field label").hide();
          //$(".VueTables__search").addClass("float-right");
          $(".VueTables__limit-field label").hide();
          $(".VuePagination__pagination").addClass("justify-content-center");
        });
      });
    }
  },
  computed: {
    myStyles() {
      return {
        height: `${500}px`
        //position: "relative"
      };
    }
  },
};
</script>
<style scoped>
.app-store-map {
  width: 100%;
  height: 500px;
}
</style>
