<template>
  <div class="container">
    <h2>Sucursales</h2>
    <div class="alert alert-warning" role="alert" v-show="message">
      {{ message + "!" }}
    </div>
    <div v-if="sucursales">
      <hr />
      <div class="row">
        <div class="col-7 d-flex justify-content-center">
          <Pie id="my-chart-id" :data="chartData" :style="myStyles" :options="chartOptions" />
        </div>
        <div class="col-5">
          <div class="col-12">
            <div class="card">
              <div class="card-content">
                <div class="card-body">
                  <div class="media d-flex">
                    <div class="align-self-center">
                      <i class="icon-pie-chart dark font-large-1 float-left"></i>
                    </div>
                    <div class="media-body text-right">
                      <h4>{{ sucursalcantA }}</h4>
                      <span>Sucursales Abiertas</span>
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
                      <i class="icon-pie-chart success font-large-1 float-left"></i>
                    </div>
                    <div class="media-body text-right">
                      <h4>{{ sucursalcantC }}</h4>
                      <span>Sucursales Cerradas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <ul class="nav nav-tabs mb-1">
        <li class="nav-item">
          <a class="nav-link" @click="selecionar(1)" :class="{ active: sucursalA == true }">
            Sucursales Abiertas
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="selecionar(2)" :class="{ active: sucursalC == true }">
            Sucursales Cerradas
          </a>
        </li>
      </ul>
      <div class="row">
        <div class="col-md-12 card">
          <div class="card-body">
            <div v-show="sucursalA">
              <h3>Sucursales Abiertas</h3>
              <div class="">
                <template v-if="sucusalesPremiun[0]">
                  <v-client-table ref="table" :data="sucusalesPremiun" :columns="columns" :options="options">
                    <template v-slot:direccion="item">
                      <p> {{ item.row.direccion }}
                        <a data-toggle="modal"
                          data-placement="top" title="Ver mapa" 
                          @click="generarMapa(item.row.latitud, item.row.longitud)"
                          data-target="#exampleModalCenter"
                          :class="['letter', 'badge badge-primary ml-1 font-weight-bold']">
                          <i class="fas fa-map-marker-alt text-white"></i>
                        </a>
                      </p>
                    </template>
                    <template v-slot:cantidadA="item">
                      <a @click="obtenerCajasA(item.row)"
                      data-toggle="tooltip" data-placement="top" title="Ver cajas"
                      :class="[
                        'letter',
                        'badge badge-secondary text-white font-weight-bold'
                      ]">
                        {{ item.row.cantidadA }}
                        <i class="fas fa-eye text-white ml-1"></i>
                      </a>
                    </template>
                    <template v-slot:cantidadC="item">
                      <a @click="obtenerCajasC(item.row)"
                      data-toggle="tooltip" data-placement="top" title="Ver cajas" 
                      :class="[
                        'letter',
                        'badge badge-success  text-white font-weight-bold'
                      ]">
                        {{ item.row.cantidadC }}
                        <i class="fas fa-eye text-white ml-1"></i>
                      </a>
                    </template>
                  </v-client-table>
                </template>
                <template v-else>
                  <div class="alert alert-warning mt-1" role="alert">
                    {{ "No se encuentran registros!" }}
                  </div>
                </template>
              </div>
            </div>
            <div v-show="sucursalC">
              <h3>Sucursales Cerradas</h3>
              <template v-if="sucursalesCerradas[0]">
                <v-client-table ref="table" :data="sucursalesCerradas" :columns="optionc.columns" :options="optionc">
                  <template v-slot:direccion="item">
                    <p> {{ item.row.direccion }}
                      <a data-toggle="modal" @click="generarMapa(item.row.latitud, item.row.longitud)"
                        data-target="#exampleModalCenter"
                        :class="['letter', 'badge badge-primary ml-1 font-weight-bold']">
                        <i class="fas fa-map-marker-alt text-white"></i>
                      </a>
                    </p>
                  </template>
                  <template v-slot:cantidadA="item">
                    <a @click="obtenerCajasA(item.row)" :class="[
                      'letter',
                      'badge badge-secondary  text-white font-weight-bold'
                    ]">
                      {{ item.row.cantidadA }}</a>
                  </template>
                  <template v-slot:cantidadC="item">
                    <a @click="obtenerCajasC(item.row)" :class="[
                      'letter',
                      'badge badge-success  text-white font-weight-bold'
                    ]">
                      {{ item.row.cantidadC }}</a>
                  </template>
                </v-client-table>
              </template>
              <template v-else>
                <div class="alert alert-warning mt-1" role="alert">
                  {{ "No se encuentran registros!" }}
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Mapa geolocalización
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div ref="elMap" class="app-store-map"></div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
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
import { ServerTable } from "v-tables-3";
import loading from "@/components/Loading.vue";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "sucursales",
  mounted() {
    this.getAllsucursales();
  },

  components: { Pie, loading, ServerTable },
  data() {
    return {
      sucursalcantA:"",
      sucursalcantC:"",
      sucursal: "",
      message: "",
      sucursalA: true,
      sucursalC: false,
      sucursales: false,
      TextoBuscado: "",
      chartOptions: {
        maintainAspectRatio: false
      },
      sucursalesAbiertas: [],
      sucusalesPremiun: [],
      sucursalesCerradas: [],
      cajasAbiertas: [],
      cajasCerradas: [],
      chartData: {
        labels: ["January", "February", "March"],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
            data: [40, 20, 12]
          }
        ]
      },
      columns: [
        "descripcion",
        "telefono",
        "direccion",
        "cantidadA",
        "cantidadC",
      ],
      options: {
        columnsClasses: {
          // Asignamos la clase ancho-columna para establecer un ancho específico
          cantidadA: 'ancho-columna',
          cantidadC: 'ancho-columna',
          descripcion: 'ancho-columna1',
          direccion: 'ancho-columna1'
          // Puedes agregar más columnas y clases según sea necesario
        },
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
          descripcion: "NOMBRE",
          telefono: "TELÉFONO",
          direccion: "DIRECCIÓN",
          cantidadA: "CAJAS ABIERTAS",
          cantidadC: "CAJAS CERRADAS"
        }
      },

      optionc: {
        columns: ["descripcion", "telefono", "direccion"],
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
          descripcion: "SUCURSAL",
          telefono: "TELEFONO",
          direccion: "DIRECCIÓN"
        }
      }
    };
  },
  methods: {
    generarMapa(lat, lng) {
      this.$options.markers = new Array();
      var mapas = this.$refs.elMap;
      setTimeout(function () {
        const mymap = L.map(mapas).setView([lat, lng], 10);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
          maxZoom: 18
        }).addTo(mymap);

        const marker = L.marker([lat, lng]).addTo(mymap);
      }, 1000);
    },
    obtenerCajasA(item) {
      console.log(item.identificador);
      this.$router.push({
        name: "Cajas",
        query: { datos: item.identificador, caja: 0 }
      });
    },
    obtenerCajasC(item) {
      console.log(item.identificador);
      this.$router.push({
        name: "Cajas",
        query: { datos: item.identificador, caja: 1 }
      });
    },
    selecionar(id) {
      if (id == 1) {
        this.sucursalA = true;
        this.sucursalC = false;
      }
      if (id == 2) {
        this.sucursalA = false;
        this.sucursalC = true;
      }
    },
    async getAllsucursales() {
      try {
        const response = await AuthService.getSucursalesCajas();
        this.sucursalcantA = response.sdtSucursalesCajas.sucursalesAbiertas;
        this.sucursalcantC = response.sdtSucursalesCajas.sucursalesCerradas
        if (
          response.Erroresnegocio &&
          response.Erroresnegocio.BTErrorNegocio[0]
        ) {
          this.message = response.Erroresnegocio.BTErrorNegocio[0].Descripcion;

          if (this.message === "Sesión inválida") {
            setTimeout(() => {
              AuthService.logout();
              this.$store.dispatch("logout");
              this.$router.push("/login");
            }, 3000);
          }
        }

        this.sucursales = true;
        this.sucursalesAbiertas =
          response.sdtSucursalesCajas.listadoSucursalesA.SdtsBTSucursal;
        this.sucursalesCerradas =
          response.sdtSucursalesCajas.listadoSucursalesC.SdtsBTSucursal;
        this.cajasAbiertas =
          response.sdtSucursalesCajas.listadoCajasA.SdtsBTCaja;
        this.cajasCerradas =
          response.sdtSucursalesCajas.listadoCajasC.SdtsBTCaja;

        this.chartData = {
          labels: [`Abiertas`, `Cerradas`],
          datasets: [
            {
              backgroundColor: ["#525e5e", "#41B883"],
              data: [
                response.sdtSucursalesCajas.sucursalesAbiertas,
                response.sdtSucursalesCajas.sucursalesCerradas
              ]
            }
          ]
        };

        let array = this.sucursalesAbiertas.map((item) => {
          let cajaA = this.cajasAbiertas.filter(
            (filtro) => filtro.sucursalId === item.identificador
          );
          let cajaC = this.cajasCerradas.filter(
            (filtro) => filtro.sucursalId === item.identificador
          );

          item.cantidadA = cajaA.length;
          item.cantidadC = cajaC.length;
          return item;
        });

        this.sucusalesPremiun = array;

        $(document).ready(function () {
          $(".VuePagination__count").text(function (i, text) {
            return text.replace("Un registro", "1 registro");
          });
          $(".VueTables__search-field label").hide();
          //$(".VueTables__search").addClass("float-right");
          $(".VueTables__limit-field label").hide();
          $(".VuePagination__pagination").addClass("justify-content-center");
        });
      } catch (error) {
        console.error("Error al obtener sucursales y cajas:", error);
        // Manejar el error según tus necesidades
      }
    }
  },
  computed: {
    myStyles() {
      return {
        height: `${325}px`
      };
    }
  }
};
</script>
<style >
.app-store-map {
  width: 100%;
  height: 500px;
}

.letter {
  font-size: 14px;
}

/* Clase para quitar márgenes y rellenos */
.sin-margin-padding {
  margin: 0;
  padding: 0;
}

/* Clase para establecer un ancho específico */
.ancho-columna {
  width: 10px;
  /* Puedes ajustar este valor según sea necesario */
}

.ancho-columna1 {
  width: 300px;
  /* Puedes ajustar este valor según sea necesario */
}

.ancho-columna2 {
  width: 2px;
  /* Puedes ajustar este valor según sea necesario */
  padding: 0px;
}
</style>
