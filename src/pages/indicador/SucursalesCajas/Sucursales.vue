<template>
  <div class="container">
    <h2>Sucursales</h2>
    <hr />
    <div class="row">
      <div class="col d-flex justify-content-center">
        <Pie
          id="my-chart-id"
          :options="chartOptions"
          :data="chartData"
          :style="myStyles" />
      </div>
    </div>
    <hr />
    <h3>Sucursales Abiertas</h3>
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
            <span class="input-group-text" id="validatedInputGroupPrepend"
              ><i class="fa fa-search" aria-hidden="true"></i></span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <!-- <th scope="col">identificador</th> -->
            <th scope="col"># Sucursal</th>
            <th scope="col">telefono</th>
            <th scope="col">direccion</th>
            <th scope="col">mapa</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in sucursalesFilter" :key="index">
            <!-- <th scope="row">{{ item.identificador }}</th> -->
            <th scope="row">{{ item.descripcion }}</th>
            <td>{{ item.telefono }}</td>
            <td>{{ item.direccion }}</td>
            <td>
              <button
                class="btn btn-info"
                data-toggle="modal"
                @click="generarMapa(item.latitud, item.longitud)"
                data-target="#exampleModalCenter">
                Mapa
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr />
    <h3>Sucursales Cerradas</h3>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <!-- <th scope="col">identificador</th> -->
            <th scope="col"># Sucursal</th>
            <th scope="col">telefono</th>
            <th scope="col">direccion</th>
            <th scope="col">mapa</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in sucursalesCerradas" :key="index">
            <!-- <th scope="row">{{ item.identificador }}</th> -->
            <th scope="row">{{ item.descripcion }}</th>
            <td>{{ item.telefono }}</td>
            <td>{{ item.direccion }}</td>
            <td>
              <button
                class="btn btn-info"
                data-toggle="modal"
                @click="generarMapa(item.latitud, item.longitud)"
                data-target="#exampleModalCenter">
                Mapa
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
              Mapa geolocalizacion
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
// var reponsibe = document.getElementById("#my-chart-id")
// console.log(reponsibe)

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "sucursales",
  async mounted() {
    // this.getSucursalesCajas();
    // async getSucursalesCajas() {
    await ApiService.getSucursalesCajas().then((r) => {
      console.log(r);
      this.sucursalesAbiertas =
        r.detalle.sucursales.sdtSucursalesAbiertas.sBTSucursal;
      this.sucursalesCerradas =
        r.detalle.sucursales.sdtSucursalesCerradas.sBTSucursal;
      this.chartData = {
        labels: [`abiertas`, `cerradas`],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651"],
            data: [r.detalle.sucursales.abiertas, r.detalle.sucursales.cerradas]
          }
        ]
      };
    });
    // },
  },
  components: { Pie },
  data() {
    return {
      sucursales: null,
      TextoBuscado: "",
      sucursalesAbiertas: [],
      sucursalesCerradas: [],
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
        maintainAspectRatio: true
      }
    };
  },
  methods: {
    generarMapa(lat, lng) {
      this.$options.markers = new Array();
      // https://www.google.com/maps?ll=-15.322977,-70.028362&z=8&t=m&hl=es-ES&gl=US&mapclient=apiv3
      const uluru = { lat: lat, lng: lng };
      const map = new window.google.maps.Map(this.$refs.elMap, {
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
    sucursalesFilter() {
      var buscado = this.TextoBuscado.toUpperCase();
      return this.sucursalesAbiertas.filter((objeto) => {
        return (
          objeto.descripcion.toUpperCase().includes(buscado) ||
          objeto.identificador == parseInt(buscado)
        );
      });
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
