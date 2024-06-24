<template>
  <div class="container">
    <div v-for="(item, index) in Sucursal" :key="index">
      <h2>Cajas de la Sucursal ( {{ item.descripcion }} )
        <a class="btn btn-info mb-1" @click="generarSucursal(item.identificador)" data-toggle="modal"
          data-placement="top" title="Ver mapa" data-target="#exampleModalCenter">
          <i class="fas fa-map-marker-alt text-white fa-xl"></i>
        </a>
      </h2>
    </div>
    <div v-if="cajas">
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
                      <i class="icon-pie-chart  font-large-2 float-left"></i>
                    </div>
                    <div class="media-body text-right">
                      <h4>{{ cajasAbiertas.length }}</h4>
                      <span>Cajas Abiertas</span>
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
                      <i class="icon-pie-chart success font-large-2 float-left"></i>
                    </div>
                    <div class="media-body text-right">
                      <h4>{{ cajasCerradas.length }}</h4>
                      <span>Cajas Cerradas</span>
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
          <a class="nav-link" @click="selecionar(1)" :class="{ active: cajasA == true }">
            Cajas Abiertas
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="selecionar(2)" :class="{ active: cajasC == true }">
            Cajas Cerradas
          </a>
        </li>
      </ul>

      <div class="row">
        <div class="col-md-12 card">
          <div class="card-body">
            <div v-show="cajasA">
              <h3>Cajas Abiertas</h3>
              <template v-if="cajasAbiertasPremiun[0]">
                <v-client-table ref="table" :data="cajasAbiertasPremiun" :columns="columns" :options="options">
                  <template v-slot:sesiones="item">
                    <a :class="[ 
                      item.row.sesiones != '1'
                        ? 'badge badge-danger text-white font-weight-bold'
                        : 'badge badge-success  text-white font-weight-bold',
                      'letter'
                    ]">
                      {{ item.row.sesiones }}</a>
                  </template>
                </v-client-table>
              </template>
              <template v-else>
                <div class="alert alert-warning mt-1" role="alert">
                  {{ "No se encuentran registros!" }}
                </div>
              </template>
            </div>
            <div v-show="cajasC">
              <h3>Cajas Cerradas</h3>
              <template v-if="cajasCerradasPremiun[0]">
                <v-client-table ref="table" :data="cajasCerradasPremiun" :columns="columns" :options="options">
                  <template v-slot:sesiones="item">
                    <a :class="[
                      item.row.sesiones != '0'
                        ? 'badge badge-danger text-white font-weight-bold'
                        : 'badge badge-success  text-white font-weight-bold',
                      'letter'
                    ]">
                      {{ item.row.sesiones }}</a>
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
    </div>
    <loading v-else></loading>
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div v-for="(item, index) in Sucursal" :key="index">
              <h5>Sucursal: ( {{ item.descripcion }} )</h5>
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div>
              <div class="card" v-for="(item, index) in cajasSelect" :key="index">
                <div class="card-body">
                  <p class="card-title">
                    <i class="fa fa-phone" aria-hidden="true"></i>
                    {{ item.telefono }}
                  </p>
                  <p class="card-text">
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                    {{ item.direccion }}
                  </p>
                  <!-- <button class="btn btn-primary">Mostrar Mapa</button> -->
                </div>
              </div>
            </div>
            <div ref="elMap" class="app-store-map"></div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";
import AuthService from "@/utils/AuthService";
import loading from "@/components/Loading.vue";
import { ServerTable } from "v-tables-3";
// var reponsibe = document.getElementById("#my-chart-id")
// console.log(reponsibe)

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "sucursales",
  mounted() {
    this.getAllSeciones();
    const datos = JSON.parse(this.$route.query.datos);
    const caja = JSON.parse(this.$route.query.caja);
    if (caja == 1) {
      this.cajasA = false;
      this.cajasC = true;
    }
    this.getSucursalesCajas(datos);
  },
  components: { Pie, loading, ServerTable },
  data() {
    return {
      //objeto: null,
      Sucursal: null,
      cajasA: true,
      cajasB: false,
      cajas: false,
      mostrar: false,
      sesiones: null,
      TextoBuscado: "",
      cajasSelect: null,
      cajasAbiertas: [],
      cajasCerradas: [],
      cajasAbiertasPremiun: [],
      cajasCerradasPremiun: [],
      chartData: {
        labels: ["January", "February", "March"],
        datasets: [
          {
            //backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
            data: [40, 20, 12]
          }
        ]
      },
      chartOptions: {
        maintainAspectRatio: false
      },
      columns: ["indicador", "usuario", "nombre", "sesiones"],
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
          indicador: '# CAJA',
          usuario: "USUARIO",
          nombre: "NOMBRE",
          sesiones: "SESIONES"
        }
      }
    };
  },
  methods: {
    async getAllSeciones() {
      await AuthService.getSesionesPorUsuario().then((response) => {
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

        this.sesiones = response.sdtSesionesPorUsuario.sBTSesionesPorUsuario;

        if (!this.sesiones[0]) {
          this.message = "No se encuentran registros!";
        } else {

        }
      });
    },
    async getSucursalesCajas(id_sucursal) {
      await AuthService.getSucursalesCajas().then((r) => {
        /**recuperar sucursal**/
        this.Sucursal =
          r.sdtSucursalesCajas.listadoSucursalesA.SdtsBTSucursal.filter(
            (item) => item.identificador == id_sucursal
          );
        // console.log(this.Sucursal[0])
        /**listados cajas**/
        this.cajas = true;
        this.cajasAbiertas =
          r.sdtSucursalesCajas.listadoCajasA.SdtsBTCaja.filter((item) => {
            return item.sucursalId == id_sucursal;
          });
        this.cajasCerradas =
          r.sdtSucursalesCajas.listadoCajasC.SdtsBTCaja.filter((item) => {
            return item.sucursalId == id_sucursal;
          });

        let data = this.cajasAbiertas.map((cajas) => {
          var cajasSelect = null;
          cajasSelect =
            r.sdtSucursalesCajas.listadoSucursalesC.SdtsBTSucursal.filter(
              (item) => item.identificador == cajas.sucursalId
            );
          if (!this.cajasSelect) {
            cajasSelect =
              r.sdtSucursalesCajas.listadoSucursalesA.SdtsBTSucursal.filter(
                (item) => item.identificador == cajas.sucursalId
              );
          }

          cajas.Sucursal = cajasSelect[0].descripcion;
          // Añadir la cantidad de sesiones
          const sesionData = this.sesiones.find(s => s.usuario === cajas.usuario);
          cajas.sesiones = sesionData ? sesionData.cantidadSesiones : 0;

          return cajas;
        });

        // Añadir la cantidad de sesiones a cajas cerradas
        this.cajasCerradasPremiun = this.cajasCerradas.map((caja) => {
          let cajasSelect = r.sdtSucursalesCajas.listadoSucursalesC.SdtsBTSucursal.filter(
            (item) => item.identificador == caja.sucursalId
          );
          if (!cajasSelect.length) {
            cajasSelect = r.sdtSucursalesCajas.listadoSucursalesA.SdtsBTSucursal.filter(
              (item) => item.identificador == caja.sucursalId
            );
          }
          caja.Sucursal = cajasSelect[0].descripcion;

          // Añadir la cantidad de sesiones
          const sesionData = this.sesiones.find(s => s.usuario === caja.usuario);
          caja.sesiones = sesionData ? sesionData.cantidadSesiones : 0;

          return caja;
        });

        this.chartData = {
          labels: [`Abiertas`, `Cerradas`],
          datasets: [
            {
              backgroundColor: ["#525e5e", "#41B883"],
              data: [data.length, r.sdtSucursalesCajas.cajasCerradas]
            }
          ]
        };
        this.cajasAbiertasPremiun = data;
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
    },
    async generarSucursal(idScurusal) {
      await AuthService.getSucursalesCajas().then((r) => {
        this.cajasSelect =
          r.sdtSucursalesCajas.listadoSucursalesC.SdtsBTSucursal.filter(
            (item) => item.identificador == idScurusal
          );
        if (!this.cajasSelect[0]) {
          this.cajasSelect =
            r.sdtSucursalesCajas.listadoSucursalesA.SdtsBTSucursal.filter(
              (item) => item.identificador == idScurusal
            );
        }
      });
      //await this.generarMapa()
      await this.generarMapa(
        this.cajasSelect[0].latitud,
        this.cajasSelect[0].longitud
      );
    },
    async generarMapa(lat, lng) {
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
    selecionar(id) {
      if (id == 1) {
        this.cajasA = true;
        this.cajasC = false;
      }
      if (id == 2) {
        this.cajasA = false;
        this.cajasC = true;
      }
    }
  },
  computed: {
    myStyles() {
      return {
        height: `${325}px`
        //position: "relative"
      };
    },
    CajasFilter() {
      var buscado = this.TextoBuscado.toUpperCase();
      return this.cajasAbiertasPremiun.filter((objeto) => {
        return (
          objeto.nombre.toUpperCase().includes(buscado) ||
          objeto.Sucursal.toUpperCase().includes(buscado)
        );
      });
      //return this.cajasAbiertasPremiun
    }
  },
  watch: {
    cajasSelect: {
      deep: true,
      handler(newCajasSelect) {
        console.log("cambios");
        if (newCajasSelect.length > 0) {
          this.generarMapa(
            newCajasSelect[0].latitud,
            newCajasSelect[0].longitud
          );
          this.$nextTick(() => {
            if (this.$options.map) {
              this.$options.map.invalidateSize();
            }
          });
        }
      }
    }
  }
};
</script>
<style scoped>
.app-store-map {
  width: 100%;
  height: 500px;
}
</style>
