<template>
  <div>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a
          class="nav-link"
          @click="selecionar(1)"
          :class="{ active: moneda == true }">
          Monedas
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          @click="selecionar(2)"
          :class="{ active: indice == true }">
          Especies
        </a>
      </li>
    </ul>
    <div class="alert alert-warning" role="alert" v-show="message">
      {{ message + "!" }}
    </div>
    <div v-if="monedas || indices">
      <div class="card mt-2">
        <div class="row">
          <div class="col-md-12">
            <div class="card-body">
              <monedas :data="monedas" v-if="moneda"></monedas>
              <indices :data="indices" v-if="indice"></indices>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading v-else></loading>
  </div>
</template>
<script>
import loading from "@/components/Loading.vue";
import Monedas from "./Monedas.vue";
import Indices from "./Indices.vue";
import AuthService from "@/utils/AuthService";
import ApiService from "@/utils/ApiService.js";
export default {
  components: {
    Monedas,
    Indices,
    loading
  },

  // directives
  // filters

  props: {
    //
  },

  data: () => ({
    monedas: null,
    indices: null,
    moneda: true,
    indice: false,
    message: ""
  }),

  computed: {
    //
  },

  // watch: {},

  mounted() {
    this.getAllAgrupadores();
  },

  methods: {
    async getAllAgrupadores() {
      await AuthService.getCotizaciones().then((response) => {
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
        this.indices = response.sdtIndices.sBTMonedaIndice;
        this.monedas = response.sdtMonedas.sBTMonedaIndice;
        if (!this.indices[0] || !this.monedas[0]) {
          this.message = "No se encuentran registros!";
        }
      });
    },
    selecionar(id) {
      if (id == 1) {
        this.moneda = true;
        this.indice = false;
      }
      if (id == 2) {
        this.moneda = false;
        this.indice = true;
      }
    }
  }
};
</script>

<style scoped></style>
