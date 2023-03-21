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
    <h3>Cajas Abiertas</h3>
    <div class="table-responsive">
      <table class="table table-striped tabla">
        <thead>
          <tr>
            <!-- <th scope="col">identificador</th> -->
            <th scope="col">Usuario</th>
            <th scope="col">Nombre</th>
            <th scope="col">Sucursal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cajasAbiertas" :key="index">
            <!-- <th scope="row">{{ item.identificador }}</th> -->
            <td>{{ item.Usuariocaja }}</td>
            <td>{{ item.Nombrecaja }}</td>
            <td>
              <button
                class="btn btn-info"
                @click="generarSucursal(item.Codigo)"
                data-toggle="modal"
                data-target="#exampleModalCenter">
                Sucursal
              </button>
              <!-- <button
                class="btn btn-info"
               @click="generarMapa(item.sucursalId)"
               
                data-toggle="modal"
                data-target="#exampleModalCenter">
                Sucursal
              </button> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr />
    <h3>Cajas Cerradas</h3>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <!-- <th scope="col">identificador</th> -->
            <th scope="col">Usuario</th>
            <th scope="col">Nombre</th>
            <th scope="col">Sucursal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cajasCerradas" :key="index">
            <!-- <th scope="row">{{ item.identificador }}</th> -->
            <td>{{ item.Usuariocaja }}</td>
            <td>{{ item.Nombrecaja }}</td>
            <td>
              <button
                class="btn btn-info"
               @click="generarSucursal(item.Codigo)"
                data-toggle="modal"
                data-target="#exampleModalCenter">
                Sucursal
              </button>
              <!-- <button
                class="btn btn-info"
               @click="generarMapa(item.sucursalId)"
               
                data-toggle="modal"
                data-target="#exampleModalCenter">
                Sucursal
              </button> -->
            </td>
          </tr>
        </tbody>
      </table>
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
              <div class="card" v-for="(item,index) in cajasSelect" :key="index">
                <div class="card-header text-center bg-secondary ">
                  {{ item.descripcion }}
                </div>
                <div class="card-body">
                  <p class="card-title"><i class="fa fa-phone" aria-hidden="true"></i> {{ item.telefono }}</p>
                  <p class="card-text"><i class="fa fa-map-marker" aria-hidden="true"></i> {{ item.direccion }} </p>
                  <button class="btn btn-primary" >Mostrar mapa</button>
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
    this.getSucursalesCajas();
  },
  components: { Pie,loading },
  data() {
    return {
      cajas:false,
      mostrar:false,
      cajasSelect: null,
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
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  methods: {
    async getSucursalesCajas() {
      await ApiService.getSucursalesCajas().then((r) => {
        this.cajas = true
        this.cajasAbiertas = r.SdtSucursalesCajas.Listadocajasa.SdtsBtCaja;
        this.cajasCerradas = r.SdtSucursalesCajas.Listadocajasc.SdtsBtCaja;
        this.chartData = {
          labels: [`abiertas`, `cerradas`],
          datasets: [
            {
              backgroundColor: ["#41B883", "#E46651"],
              data: [r.SdtSucursalesCajas.Cajasabiertas, r.SdtSucursalesCajas.Cajascerradas]
            }
          ]
        };
      });
    },
    async generarSucursal(idScurusal) {
      await ApiService.getSucursalesCajas().then((r) => {
        this.cajasSelect =
          r.SdtSucursalesCajas.Listadosucursalesc.SdtsBTSucursal.filter(
            (item) => item.Identificador == idScurusal
          );
        if (!this.cajasSelect[0]) {
          this.cajasSelect =
            r.SdtSucursalesCajas.Listadosucursalesa.SdtsBTSucursal.filter(
              (item) => item.Identificador == idScurusal
            );
        }
      });
      //await this.generarMapa()
       await this.generarMapa(this.cajasSelect[0].latitud, this.cajasSelect[0].longitud)
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
    }
  },
  computed: {
    myStyles() {
      return {
        height: `${400}px`,
        position: "relative"
      };
    },
  
  }
};
</script>
<style scoped>
.app-store-map {
  width: 100%;
  height: 500px;
}
</style>
