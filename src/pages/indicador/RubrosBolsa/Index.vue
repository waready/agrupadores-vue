<template>
  <div>
    <div v-if="rubroBolsa">
      <div class="row">
        <div class="col-12 mt-3 mb-1">
          <h3 class="text-uppercase">Rubro Bolsas</h3>
          <p>Información de los Rubros Bolsas</p>
          <hr />
        </div>
      </div>
      <div class="alert alert-warning" role="alert" v-show="message">
        {{ message + "!" }}
      </div>
      <div class="container">
        <div class="row">
          <div
            class="col-xl-6 col-md-12"
            v-for="(item, index) in rubroBolsa"
            :key="index">
            <div class="card">
              <div class="card-body">
                <div class="media align-items-stretch">
                  <div class="align-self-center">
                    <i class="fa fa-archive info font-large-4 mr-2"></i>
                  </div>
                  <div class="media-body text-right">
                    <h2>{{ item.descripcion }}</h2>
                    <h4>{{ item.rubro }}</h4>
                  </div>
                </div>
                <div class="card-text letter">
                  <hr />
                  <h5>Clave</h5>
                  <ul class="list-unstyled">
                    <li>Empresa: {{ item.nombreEmpresa }}</li>
                    <li>Sucursal: {{ item.nombreSucursal }}</li>
                    <li>Cuenta: {{ item.cuentaCliente }}</li>
                    <li>Operación: {{ item.operacion }}</li>
                    <li>Sub Operación: {{ item.subOperacion }}</li>
                    <li>Moneda: {{ item.signoMoneda }}</li>
                    <li>Papel: {{ item.nombrePapel }}</li>
                  </ul>
                  <hr />
                  <h5 class="mb-1"><span> Ocurrencias </span></h5>
                  <span>{{ item.ocurrencias }} </span>
                </div>
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
import ApiService from "@/utils/ApiService.js";
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
      await ApiService.getRubroBolsas().then((response) => {
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
        //this.indices = response.sdtIndices.SdtBBTMONEDA;

        this.rubroBolsa = response.sdtRubrosBolsa.sBTRubroBolsa;
        
        if (!this.rubroBolsa[0]) {
          this.message = "No se encuentran registros!";
        }
      });
    }
    //
    //
  }
};
</script>

<style scoped>
.card {
  position: relative;
}
.letter {
  font-size: 1.2rem;
}
</style>
