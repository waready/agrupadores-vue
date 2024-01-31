<template>
  <div class="container">
    <h2>Sucursales</h2>
    <div class="alert alert-warning" role="alert" v-show="message">
      {{ message + "!" }}
    </div>
    <div v-if="sucursales">
      <hr />
      <div class="row">
        <div class="col d-flex justify-content-center">
          <Pie id="my-chart-id" :options="chartOptions" :data="chartData" :style="myStyles" />
        </div>
      </div>
      <hr />

      <ul class="nav nav-tabs">
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
        <div class="col-md-12">
          <div class="card-body">
            <div v-show="sucursalA">
              <h3>Sucursales Abiertas</h3>
              <div class="row justify-content-end">
                <div class="col-md-4">
                  <div class="input-group is-invalid">
                    <input type="text" name="filter" class="form-control" v-model="TextoBuscado" placeholder="Busqueda"
                      id="filter" />
                  </div>
                </div>
              </div>
              <br />
              
              <div class="table-responsive">
                <table class="table table-striped tamleter">
                  <thead>
                    <tr>
                      <th style="width: 50%" class="w-75">#SUCURSAL</th>
                      <th style="width: 10%">TELEFONO</th>
                      <th style="width: 10%">DIRECCIÓN</th>
                      <th style="width: 10%">CAJAS ABIERTAS</th>
                      <th style="width: 10%">CAJAS CERRADAS</th>
                      <th style="width: 10%">MAPA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="sucursalesFilter[0]">
                      <tr v-for="(item, index) in sucursalesFilter" :key="index">
                        <th scope="row">{{ item.descripcion }}</th>
                        <td>{{ item.telefono }}</td>
                        <td>{{ item.direccion }}</td>
                        <td>
                          <span class="btn btn-secondary" @click="obtenerCajasA(item)">
                            {{ item.cantidadA }}</span>
                        </td>
                        <td>
                          <span class="btn btn-success" @click="obtenerCajasC(item)">
                            {{ item.cantidadC }}</span>
                        </td>
                        <td>
                          <button class="btn btn-info" data-toggle="modal"
                            @click="generarMapa(item.latitud, item.longitud)" data-target="#exampleModalCenter">
                            Mapa
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
            <div v-show="sucursalC">
              <h3>Sucursales Cerradas</h3>
              <div class="table-responsive">
                <table class="table table-striped tamleter">
                  <thead>
                    <tr>
                      <th scope="col">#SUCURSAL</th>
                      <th scope="col">TELEFONO</th>
                      <th scope="col">DIRECCIÓN</th>
                      <th scope="col">MAPA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="sucursalesCerradas[0]">
                      <tr v-for="(item, index) in sucursalesCerradas" :key="index">
                        <th scope="row">{{ item.descripcion }}</th>
                        <td>{{ item.telefono }}</td>
                        <td>{{ item.direccion }}</td>

                        <td>
                          <button class="btn btn-info" data-toggle="modal"
                            @click="generarMapa(item.latitud, item.longitud)" data-target="#exampleModalCenter">
                            Mapa
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
import ApiService from "@/utils/ApiService";
import loading from "@/components/Loading.vue";
// var reponsibe = document.getElementById("#my-chart-id")
// console.log(reponsibe)

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "sucursales",
  async mounted() {
    await AuthService.getSucursalesCajas().then((response) => {
      if (response.Erroresnegocio) {
        if (response.Erroresnegocio.BTErrorNegocio[0]) {
          this.message = response.Erroresnegocio.BTErrorNegocio[0].Descripcion;
          if (this.message == "Sesión inválida") {
            setTimeout(() => {
              AuthService.logout();
              this.$store.dispatch("logout");
              this.$router.push("/login");
            }, 3000);
          }
        }
      }
      this.sucursales = true;
      this.sucursalesAbiertas =
        response.sdtSucursalesCajas.listadoSucursalesA.SdtsBTSucursal;
      this.sucursalesCerradas =
        response.sdtSucursalesCajas.listadoSucursalesC.SdtsBTSucursal;
      this.cajasAbiertas = response.sdtSucursalesCajas.listadoCajasA.SdtsBTCaja;
      this.cajasCerradas = response.sdtSucursalesCajas.listadoCajasC.SdtsBTCaja;

      this.chartData = {
        labels: [`Abiertas`, `Cerradas`],
        datasets: [
          {
            // backgroundColor: ["#41B883", "#E46651"],
            backgroundColor: ["#525e5e", "#41B883"],
            data: [
              response.sdtSucursalesCajas.sucursalesAbiertas,
              response.sdtSucursalesCajas.sucursalesCerradas
            ]
          }
        ]
      };
    });

    let array = this.sucursalesAbiertas.map((item) => {
      let cajaA = this.cajasAbiertas.filter((filtro) => {
        return filtro.sucursalId == item.identificador;
      });
      let cajaC = this.cajasCerradas.filter((filtro) => {
        return filtro.sucursalId == item.identificador;
      });
      // item.cajasA = cajaA;
      // item.cajasC = cajaC;
      item.cantidadA = cajaA.length;
      item.cantidadC = cajaC.length;
      return item;
    });
    console.log(array);
    this.sucusalesPremiun = array;
    // },
  },
  components: { Pie, loading },
  data() {
    return {
      message: "",
      sucursalA: true,
      sucursalC: false,
      sucursales: false,
      TextoBuscado: "",
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
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true
      },
      columns: ['nombre', 'tipoCambio'],
    options: {
      sortable: ['nombre', 'tipoCambio'],
      sortIcon: {
          is: 'fa-sort', // utiliza iconos de Font Awesome
          base: 'fa',
          up: 'fa-sort-asc',
          down: 'fa-sort-desc',
        },
      // see the options API
      texts: {
          count:
            "Mostrando {from} a {to} de {count} registros |{count} registros|Un registro",
          first: "Primero",
          last: "Ultimo",
          filter: "Filtro:",
          filterPlaceholder: "Busqueda",
          limit: "Registros:",
          page: "Pagina:",
          noResults: "No hay registros coincidentes",
          noRequest:"Seleccione al menos un filtro para obtener resultados",
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
        nombre: "Nombre",
        tipoCambio: "Pasaje a histórico",
      },
       
      
    },
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
    }
  },
  computed: {
    myStyles() {
      return {
        height: `${325}px`
      };
    },
    sucursalesFilter() {
      var buscado = this.TextoBuscado.toUpperCase();
      return this.sucusalesPremiun.filter((objeto) => {
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
