<template>
  <div class="container mt-3">
    <div v-if="CuadreMonedas">
      <section id="minimal-statistics">
        <div class="row">
          <div class="col-12 mt-3 mb-1">
            <h4 class="text-uppercase">Cierre de Saldo por Monedas</h4>
            <p>Información de los Balances</p>
            <hr />
          </div>
        </div>
      
        <div class="row">
          <div class="col-md-6">
            <div class="input-group is-invalid">
              <input
                type="text"
                name="filter"
                class="form-control"
                placeholder="Búsqueda"
                v-model="TextoBuscado"
                id="filter" />
              <div class="input-group-prepend">
                <span class="input-group-text" id="validatedInputGroupPrepend"
                  ><i class="fa fa-search" aria-hidden="true"></i
                ></span>
              </div>
            </div>
          </div>
        </div>

        <div class="alert alert-warning mt-2" role="alert" v-show="message">
          {{ message + "!" }}
        </div>

        <div class="row mt-4">
          <div
            class="col-xl-4 col-sm-6 col-12"
            v-for="(item, index) in filterCuadreMoneda"
            :key="index">
            <div class="card custom-card ">
              <div class="card-content">
                <div class="card-body">
                  <div class="media d-flex">
                    <div class="media-body text-left">
                      <h4 :class="item.saldo != 0 ? 'danger' : 'success'">
                        {{ item.signo }}
                      </h4>
                    </div>

                    <div
                      :class="[
                        'align-self-center',
                        item.saldo != 0 ? 'danger' : 'success'
                      ]"
                      style="font-size: 17px">
                      {{ formattedNumber(item.saldo) }}
                    </div>
                  </div>
                  <div>
                    <span class="name">{{ item.nombre.toUpperCase() }}</span>
                  </div>
                  <div class="progress mt-1 mb-0" style="height: 7px">
                    <br />
                    <div
                      :class="[
                        item.saldo != 0 ? 'bg-danger' : 'bg-success',
                        'progressbar'
                      ]"
                      role="progressbar"
                      style="width: 100%"
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <loading v-else></loading>
  </div>
</template>

<script>
import AuthService from "@/utils/AuthService";
import ApiService from "@/utils/ApiService.js";
import loading from "@/components/Loading.vue";
import { ServerTable } from "v-tables-3";
export default {
  // name: "MarketplaceIndex",
  components: {
    loading,
    ServerTable
  },

  // directives
  // filters

  props: {
    //
  },

  data: () => ({
    CuadreMonedas: null,
    message: "",
    TextoBuscado: "",
    timeoutId:null
  }),

  computed: {
    //
  },

  // watch: {},

  mounted() {
    this.fetchCuadreMonedaSaldos();
  },
  beforeDestroy() {
    clearTimeout(this.timeoutId);
  },
  beforeRouteLeave(to, from, next) {
    clearTimeout(this.timeoutId);
    next();
  },

  methods: {
    async fetchCuadreMonedaSaldos() {
      await this.getAllCuadreMonedaSaldos();
      this.timeoutId = setTimeout(this.fetchCuadreMonedaSaldos, 5 * 60 * 1000);
    },
    async getAllCuadreMonedaSaldos() {
      await AuthService.getCuadreMonedaSaldos().then((response) => {
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

        this.CuadreMonedas =
          response.sdtBalanceMonedaSaldos.sBTBalanceMonedaSaldo;

        if (!this.CuadreMonedas[0]) {
          this.message = "No se encuentran registros!";
        }
      });
    },
    formattedNumber(numero) {
      const formatter = new Intl.NumberFormat("es", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
        //notation: 'compact'
      });
      return formatter.format(numero);
    }
    //
    //
  },
  computed: {
    filterCuadreMoneda() {
      var buscado = this.TextoBuscado.toUpperCase();
      return this.CuadreMonedas.filter((objeto) => {
        return (
          // String(objeto.saldo).toUpperCase().includes(buscado)
          objeto.nombre.toUpperCase().includes(buscado) ||
          objeto.signo.toUpperCase().includes(buscado)
        );
      })
      .sort((a, b) => {
        // Ordenar por saldo != 0 primero
        if (a.saldo !== 0 && b.saldo === 0) {
          return -1;
        } else if (a.saldo === 0 && b.saldo !== 0) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }
};
</script>
<style scoped>
/* .letter {
  font-size: 1.1rem;
} */

.custom-card {
  height: 130px; /* Puedes ajustar la altura según tus necesidades */
}

.name{
  font-size: 14px;
}
</style>
