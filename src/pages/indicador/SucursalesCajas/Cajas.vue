<template>
  <div class="container">
    <div v-for="(item, index) in Sucursal" :key="index">
      <h2>Cajas Sucursal ( {{ item.descripcion }} )</h2>
      <hr>
      <div>
        <button class="btn btn-info" @click="generarSucursal(item.identificador)" data-toggle="modal"
          data-target="#exampleModalCenter">
          Sucursal
        </button>
      </div>
    </div>
    <div v-if="cajas">
      <hr />
      <div class="row">
        <div class="col d-flex justify-content-center">
          <Pie id="my-chart-id" :data="chartData" :style="myStyles" />
        </div>
      </div>
      <hr />

      <ul class="nav nav-tabs">
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
        <div class="col-md-12">
          <div class="card-body">
            <div v-show="cajasA">
              <h3>Cajas Abiertas</h3>
              <div class="row">
                <div class="col-md-4">
                  <div class="input-group is-invalid">
                    <input type="text" name="filter" class="form-control" v-model="TextoBuscado" id="filter" />
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="validatedInputGroupPrepend"><i class="fa fa-search"
                          aria-hidden="true"></i></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table table-striped tamleter tabla">
                  <thead>
                    <tr>
                      <th scope="col">USUARIO</th>
                      <th scope="col">NOMBRE</th>
                      <!-- <th scope="col">SUCURSAL</th> -->
                      <!-- <th scope="col">VER SUCURSAL</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="CajasFilter[0]">
                      <tr v-for="(item, index) in CajasFilter" :key="index">
                        <td>{{ item.usuario }}</td>
                        <td>{{ item.nombre }}</td>
                        <!-- <td>{{ item.Sucursal }}</td> -->
                        <!-- <td>
                          <button class="btn btn-info" @click="generarSucursal(item.sucursalId)" data-toggle="modal"
                            data-target="#exampleModalCenter">
                            Sucursal
                          </button>
                        </td> -->
                      </tr>
                    </template>

                    <template v-else>
                      <div class="alert alert-warning mt-1" role="alert">
                        {{ "No se encuentran registros!" }}
                      </div>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-show="cajasC">
              <h3>Cajas Cerradas</h3>
              <div class="table-responsive">
                <table class="table table-striped tamleter">
                  <thead>
                    <tr>
                      <th scope="col">USUARIO</th>
                      <th scope="col">NOMBRE</th>
                      <!-- <th scope="col">SUCURSAL</th> -->
                      <!-- <th scope="col">VER SUCURSAL</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="cajasCerradas[0]">
                      <tr v-for="(item, index) in cajasCerradas" :key="index">
                        <!-- <th scope="row">{{ item.identificador }}</th> -->
                        <td>{{ item.UsuarioCaja }}</td>
                        <td>{{ item.NombreCaja }}</td>
                        <!-- <td>{{ item.codigo }}</td> -->
                        <!-- <td>
                          <button class="btn btn-info" @click="generarSucursal(item.Codigo)" data-toggle="modal"
                            data-target="#exampleModalCenter">
                            Sucursal
                          </button>
                        </td> -->
                      </tr>
                    </template>
                    <template v-else>
                      <div class="alert alert-warning mt-1" role="alert">
                        {{ "No se encuentran registros!" }}
                      </div>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading v-else></loading>
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Sucursal de la Caja
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div>
              <div class="card" v-for="(item, index) in cajasSelect" :key="index">
                <div class="card-header text-center bg-secondary">
                  {{ item.descripcion }}
                </div>
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
              Close
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
import ApiService from "@/utils/ApiService";
import AuthService from "@/utils/AuthService";
import loading from "@/components/Loading.vue";
// var reponsibe = document.getElementById("#my-chart-id")
// console.log(reponsibe)

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "sucursales",
  mounted() {
    const datos = JSON.parse(this.$route.query.datos);
    const caja = JSON.parse(this.$route.query.caja);
    if (caja == 1) {
      this.cajasA = false;
      this.cajasC = true;
    }
    this.getSucursalesCajas(datos);
  },
  components: { Pie, loading },
  data() {
    return {
      //objeto: null,
      Sucursal: null,
      cajasA: true,
      cajasB: false,
      cajas: false,
      mostrar: false,
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
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  methods: {
    async getSucursalesCajas(id_sucursal) {
      await AuthService.getSucursalesCajas().then((r) => {
        /**recuperar sucursal**/
        this.Sucursal = r.sdtSucursalesCajas.listadoSucursalesA.SdtsBTSucursal.filter(item => item.identificador == id_sucursal);
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
          return cajas;
        });
        this.chartData = {
          labels: [`Abiertas`, `Cerradas`],
          datasets: [
            {
              backgroundColor: ["#525e5e", "#41B883"],
              data: [
                data.length,
                r.sdtSucursalesCajas.cajasCerradas
              ]
            }
          ]
        };
        this.cajasAbiertasPremiun = data;
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
      // if (this.$options.map) {
      //   // El mapa ya está inicializado, no hace falta hacerlo nuevamente
      //   return;
      // }
      // this.$options.markers = new Array();
      // const mymap = L.map(this.$refs.elMap).setView([lat, lng], 10);
      // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      //   attribution:
      //     'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      //   maxZoom: 18
      // }).addTo(mymap);
      // const marker = L.marker([lat, lng]).addTo(mymap);
      // this.$options.map = mymap;
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
        height: `${325}px`,
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
          this.generarMapa(newCajasSelect[0].latitud, newCajasSelect[0].longitud);
          this.$nextTick(() => {
            if (this.$options.map) {
              this.$options.map.invalidateSize();
            }
          });
        }
      }
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
