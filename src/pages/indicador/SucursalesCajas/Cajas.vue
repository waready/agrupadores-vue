<template>
  <div class="container">
    <h2>Cajas</h2>

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
          <a
            class="nav-link"
            @click="selecionar(1)"
            :class="{ active: cajasA == true }">
            Cajas Abiertas
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            @click="selecionar(2)"
            :class="{ active: cajasC == true }">
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
                    <input
                      type="text"
                      name="filter"
                      class="form-control"
                      v-model="TextoBuscado"
                      id="filter" />
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text"
                        id="validatedInputGroupPrepend"
                        ><i class="fa fa-search" aria-hidden="true"></i
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table table-striped tabla">
                  <thead>
                    <tr>
                      <!-- <th scope="col">identificador</th> -->
                      <th scope="col">Usuario</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Sucursal</th>

                      <th scope="col">Ver Sucursal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="CajasFilter[0]">
                      <tr v-for="(item, index) in CajasFilter" :key="index">
                        <!-- <th scope="row">{{ item.identificador }}</th> -->
                        <td>{{ item.usuario }}</td>
                        <td>{{ item.nombre }}</td>
                        <td>{{ item.Sucursal }}</td>
                        <td>
                          <button
                            class="btn btn-info"
                            @click="generarSucursal(item.sucursalId)"
                            data-toggle="modal"
                            data-target="#exampleModalCenter">
                            Sucursal
                          </button>
                        </td>
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
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <!-- <th scope="col">identificador</th> -->
                      <th scope="col">Usuario</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Id Sucursal</th>
                      <th scope="col">Sucursal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="cajasCerradas[0]">
                      <tr v-for="(item, index) in cajasCerradas" :key="index">
                        <!-- <th scope="row">{{ item.identificador }}</th> -->
                        <td>{{ item.UsuarioCaja }}</td>
                        <td>{{ item.NombreCaja }}</td>
                        <td>{{ item.codigo }}</td>
                        <td>
                          <button
                            class="btn btn-info"
                            @click="generarSucursal(item.Codigo)"
                            data-toggle="modal"
                            data-target="#exampleModalCenter">
                            Sucursal
                          </button>
                        </td>
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
    <div
      class="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Sucursal de la Caja
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div>
              <div
                class="card"
                v-for="(item, index) in cajasSelect"
                :key="index">
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
                  <button class="btn btn-primary">Mostrar mapa</button>
                </div>
              </div>
            </div>
            <div ref="elMap" class="app-store-map"></div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
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
import loading from "@/components/Loading.vue";
// var reponsibe = document.getElementById("#my-chart-id")
// console.log(reponsibe)

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "sucursales",
  mounted() {
    const datos = JSON.parse(this.$route.query.datos);
    this.getSucursalesCajas(datos);
  },
  components: { Pie, loading },
  data() {
    return {
      //objeto: null,
      cajasA:true,
      cajasB:false,
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
            backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
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
      await ApiService.getSucursalesCajas().then((r) => {
        this.cajas = true;
        this.cajasAbiertas =
          r.sdtSucursalesCajas.ListadoCajasA.SdtsBTCaja.filter((item) => {
            return item.sucursalId == id_sucursal;
          });
        this.cajasCerradas =
          r.sdtSucursalesCajas.ListadoCajasC.SdtsBTCaja.filter((item) => {
            return item.sucursalId == id_sucursal;
          });
        this.chartData = {
          labels: [`abiertas`, `cerradas`],
          datasets: [
            {
              backgroundColor: ["#41B883", "#000"],
              data: [
                r.sdtSucursalesCajas.cajasAbiertas,
                r.sdtSucursalesCajas.cajasCerradas
              ]
            }
          ]
        };

        let data = this.cajasAbiertas.map((cajas) => {
          var cajasSelect = null;
          cajasSelect =
            r.sdtSucursalesCajas.ListadoSucursalesC.SdtsBTSucursal.filter(
              (item) => item.identificador == cajas.sucursalId
            );
          if (!this.cajasSelect) {
            cajasSelect =
              r.sdtSucursalesCajas.ListadoSucursalesA.SdtsBTSucursal.filter(
                (item) => item.identificador == cajas.sucursalId
              );
          }
          //console.log(cajasSelect)
          cajas.Sucursal = cajasSelect[0].descripcion;
          return cajas;
        });

        this.cajasAbiertasPremiun = data;
      });
    },
    async generarSucursal(idScurusal) {
      await ApiService.getSucursalesCajas().then((r) => {
        this.cajasSelect =
          r.sdtSucursalesCajas.ListadoSucursalesC.SdtsBTSucursal.filter(
            (item) => item.identificador == idScurusal
          );
        if (!this.cajasSelect[0]) {
          this.cajasSelect =
            r.sdtSucursalesCajas.ListadoSucursalesA.SdtsBTSucursal.filter(
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
      // https://www.google.com/maps?ll=-15.322977,-70.028362&z=8&t=m&hl=es-ES&gl=US&mapclient=apiv3
      const uluru = { lat: lat, lng: lng };
      const map = await new window.google.maps.Map(this.$refs.elMap, {
        zoom: 10,
        center: uluru
      });
      this.$options.map = map;
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map
      });
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
        height: `${400}px`,
        position: "relative"
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
  }
};
</script>
<style scoped>
.app-store-map {
  width: 100%;
  height: 500px;
}
</style>
