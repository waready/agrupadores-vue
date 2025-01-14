<template>
  <div>
    <div v-if="SesionesUsuarios">
      <div class="row">
        <div class="col-12 mt-3 mb-1">
          <h3 class="text-uppercase">Cantidad de sesiones por Usuario</h3>
          <p class="text-muted">Información detallada sobre la cantidad de sesiones por Usuario</p>
          <hr />
        </div>
      </div>
      <div class="row">
        <div>
          <v-client-table :columns="columns" :data="tableData" :options="options">
            <template v-slot:cantidadSesiones="item">
              <a :class="[
                  parseInt(item.row.cantidadSesiones) > 1
                    ? 'badge badge-danger text-white font-weight-bold'
                    : 'badge badge-success  text-white font-weight-bold',
                  'letter'
                ]">
                {{ item.row.cantidadSesiones }}</a>
            </template>
          </v-client-table>
        </div>
      </div>
    </div>
    <loading v-else></loading>
  </div>
</template>

<script>
import AuthService from "@/utils/AuthService";
import loading from "@/components/Loading.vue";
import { ServerTable } from "v-tables-3";

export default {
  name: "SesionesUsuarios",
  components: {
    loading,
    ServerTable
  },
  data: () => ({
    mostrarClave: [],
    SesionesUsuarios: null,
    message: "",
    columns: ['usuario', 'cantidadSesiones'],
    options: {
      texts: {
        count: "Mostrando {from} a {to} de {count} registros |{count} registros|Un registro",
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
      sortIcon: {
        is: "fa-sort", // utiliza iconos de Font Awesome
        base: "fa",
        up: "fa-sort-asc",
        down: "fa-sort-desc"
      },
      perPage: 10,
      perPageValues: [10, 25, 50, 100, 500],
      headings: {
        usuario: "USUARIO",
        cantidadSesiones: "CANTIDAD SESIONES"
      }
    },
    timeoutId: null
  }),
  mounted() {
    this.fetchSesionesPorUsuario();
  },
  beforeDestroy() {
    clearTimeout(this.timeoutId);
  },
  beforeRouteLeave(to, from, next) {
    clearTimeout(this.timeoutId);
    next();
  },
  methods: {
    async fetchSesionesPorUsuario() {
      await this.getAllSesionesPorUsuario();
      this.timeoutId = setTimeout(this.fetchSesionesPorUsuario, 5 * 60 * 1000);
    },
    async getAllSesionesPorUsuario() {
      await AuthService.getSesionesPorUsuario().then((response) => {
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
        $(document).ready(function () {
          $(".VuePagination__count").text(function (i, text) {
            return text.replace("Un registro", "1 registro");
          });
          $(".VueTables__search-field label").hide();
          $(".VueTables__limit-field label").hide();
          $(".VuePagination__pagination").addClass("justify-content-center");
        });

        this.SesionesUsuarios = response.sdtSesionesPorUsuario.sBTSesionesPorUsuario;

        if (!this.SesionesUsuarios[0]) {
          this.message = "No se encuentran registros!";
        }
      });
    }
  },
  computed: {
    tableData() {
      return this.SesionesUsuarios;
    }
  }
};
</script>

<style scoped>
.sortable-header {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.sortable-header .sort-icon {
  position: absolute;
  top: 50%;
  right: -20px;
  transform: translateY(-50%);
}

.sortable-header .sort-icon.fa-sort {
  opacity: 0.5;
}
</style>
