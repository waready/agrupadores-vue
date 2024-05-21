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
      <div class="row">
        <div>
          <v-client-table :columns="columns" :data="tableData" :options="options">
          </v-client-table>
        </div>
        <div v-for="(item, index) in rubroBolsa" :key="index" class="col-lg-4 col-md-6 col-sm-12 mb-3">
          <div class="card shadow h-100">
            <div class="card-body">
              <h5 class="card-title">
                <i class="fas fa-user mr-2"></i>{{ item.usuario }}
              </h5>
              <p class="card-text text-muted">Cantidad de Sesiones: {{ item.cantidadSesiones }}</p>
              <div class="progress">
                <div class="progress-bar bg-primary" role="progressbar" :style="{ width: item.cantidadSesiones + '%' }"
                  aria-valuenow="item.cantidadSesiones" aria-valuemin="0" aria-valuemax="100">{{ item.cantidadSesiones
                  }}%</div>
              </div>
            </div>
          </div>
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
  name: "RubroBolsa",
  components: {
    loading,
    ServerTable
  },
  mounted() {
    this.getAllRubroBolsas();
  },
  data: () => ({
    mostrarClave: [],
    rubroBolsa: null,
    message: "",
    columns: ['usuario', 'cantidadSesiones'],
    indices: null,
    monedas: null,
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
        nombre: "Nombre",
        tipoCambio: "Pasaje a histórico"
      }
    }
  }),

  methods: {
    async getAllRubroBolsas() {
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
        //this.indices = response.sdtIndices.SdtBBTMONEDA;

        this.rubroBolsa = response.sdtSesionesPorUsuario.sBTSesionesPorUsuario;

        if (!this.rubroBolsa[0]) {
          this.message = "No se encuentran registros!";
        }
      });
    },

    toggleClave(index) {
      this.mostrarClave[index] = typeof this.mostrarClave[index] === 'undefined' ? true : !this.mostrarClave[index];
    }
  },

  computed: {
    tableData() {
      return this.rubroBolsa;
    }
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