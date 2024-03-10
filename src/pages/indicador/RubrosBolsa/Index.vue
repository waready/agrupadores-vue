<template>
  <div>
    <div v-if="rubroBolsa">
      <div class="row">
        <div class="col-12 mt-3 mb-1">
          <h3 class="text-uppercase">Posibles rubros centralizados</h3>
          <p>Información de los posibles rubros centralizados</p>
          <hr />
        </div>
      </div>
      <div class="alert alert-warning" role="alert" v-show="message">
        {{ message + "!" }}
      </div>
      <div class="">
        <div class="row">
          <div class="col-xl-6 col-lg-12" v-for="(item, index) in rubroBolsa" :key="index">
            <div class="card">
              <div class="card-body">
                <div class="media align-items-stretch">
                  <div class="align-self-center">
                    <i class="fa fa-archive info font-large-4 mr-2"></i>
                  </div>
                  <div class="media-body text-left">
                    <h3>
                      {{ item.rubro }}
                      <a class="mb-1" @click="toggleClave(index)" data-toggle="tooltip" data-placement="top" title="Ver clave">
                        <i class="fas fa-eye text-secondary"></i>
                      </a>
                    </h3>
                    <p class="text-truncate tam-letter"><em>{{ item.descripcion }}</em></p>
                  </div>
                </div>
                <div class="card-text letter">
                  <div v-if="mostrarClave[index]">
                    <hr />
                    <h5>Clave</h5>
                    <ul class="list-unstyled">
                      <li>Empresa: <strong> {{ item.empresa }} - {{ item.nombreEmpresa }} </strong></li>
                      <li>Sucursal: <strong> {{ item.sucursal }} - {{ item.nombreSucursal }}</strong> </li>
                      <li>Cuenta: <strong> {{ item.cuentaCliente }} - {{ item.nombreCuenta }}</strong></li>
                      <li>Modulo: <strong> {{ item.nombreModulo }} </strong> </li>
                      <li>Operación: <strong> {{ item.operacion }} - {{ item.nombreOperacion }} </strong> </li>
                      <li>Sub Operación: <strong> {{ item.subOperacion }} </strong> </li>
                      <li>Moneda: <strong> {{ item.moneda }} - {{ item.signoMoneda }} </strong> </li>
                      <li>Especie: <strong>{{ item.papel }} - {{ item.nombrePapel }}</strong></li>
                    </ul>
                    <hr />
                  </div>
                  <h5 class="mb-1"><span> Ocurrencias </span></h5>
                  <span> <strong> {{ item.ocurrencias }} </strong> </span>
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
      await AuthService.getRubroBolsas().then((response) => {
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

        this.rubroBolsa = response.sdtRubrosBolsa.sBTRubroBolsa;

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
  position: relative;
  /* height: 39vh;  */
}

/* .letter {
  font-size: 1.2rem;
} */
.tam-letter {
  font-size: 15px;
}
</style>
