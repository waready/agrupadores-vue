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
        <div v-for="(item, index) in rubroBolsa" :key="index" class="col-lg-4 col-md-6 col-sm-12 mb-3">
          <div class="card shadow h-100">
            <div class="card-body">
              <h5 class="card-title">{{ item.servicio }}</h5>
              <p class="card-text text-muted">Método: {{ item.metodo }}</p>
              <p class="card-text text-muted">Cantidad de Ejecuciones: {{ item.cantidadEjecuciones }}</p>
              <div class="progress">
                <div class="progress-bar bg-primary" role="progressbar" :style="{ width: (item.cantidadEjecuciones / maxEjecuciones * 100) + '%' }" aria-valuenow="item.cantidadEjecuciones" aria-valuemin="0" :aria-valuemax="maxEjecuciones">{{ item.cantidadEjecuciones }}</div>
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
export default {
  name: "RubroBolsa",
  components: {
    loading
  },
  mounted() {
    this.getAllRubroBolsas();
  },
  data: () => ({
    mostrarClave: [],
    rubroBolsa: null,
    message: "",
    config: {
      options: [
        {
          value: "option 1"
        },
        {
          value: "option 2"
        },
        {
          value: "option 3"
        }
      ],
      placeholder: "Placeholder",
      backgroundColor: "#cde4f5",
      textColor: "black",
      borderRadius: "1.5em",
      border: "1px solid gray",
      width: 180
    }
  }),

  methods: {
    async getAllRubroBolsas() {
      await AuthService.getEjecucionPorServicio().then((response) => {
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

        this.rubroBolsa = response.sdtEjecucionesPorServicio.sBTEjecucionesPorServicio;

        if (!this.rubroBolsa[0]) {
          this.message = "No se encuentran registros!";
        }
      });
    },
    toggleClave(index) {
      this.mostrarClave[index] = typeof this.mostrarClave[index] === 'undefined' ? true : !this.mostrarClave[index];
    }
    //
    //
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

</style>