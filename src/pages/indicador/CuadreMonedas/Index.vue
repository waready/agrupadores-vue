<template>
  <div class="container mt-3">
    <div class="alert alert-warning" role="alert" v-show="message">
      {{ message + "!" }}
    </div>
    <div v-if="CuadreMonedas">
      <section id="minimal-statistics">
        <div class="row">
          <div class="col-12 mt-3 mb-1">
            <h4 class="text-uppercase">Balance Monedas Saldo</h4>
            <p>Información de los Balances</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="input-group is-invalid">
              <input type="text" name="filter" class="form-control" v-model="TextoBuscado" id="filter" />
              <div class="input-group-prepend">
                <span class="input-group-text" id="validatedInputGroupPrepend"><i class="fa fa-search"
                    aria-hidden="true"></i></span>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-xl-4 col-sm-6 col-12" v-for="(item, index) in filterCuadreMoneda" :key="index">
            <div class="card">
              <div class="card-content">
                <div class="card-body">
                  <div class="media d-flex">
                    <div class="media-body text-left">
                      <h3 :class="item.saldo != 0 ? 'danger' : 'success'">
                        {{ item.signo }}
                      </h3>
                      
                    </div>
                    
                    <div :class="[
                      'align-self-center',
                      item.saldo != 0 ? 'danger' : 'success'
                    ]" style=" font-size: 20px;" >
                      {{ formattedNumber(item.saldo) }}
                    </div>
                  </div>
                  <div>
                    <span>{{item.nombre.toUpperCase()}}</span>
                  </div>
                  <div class="progress mt-1 mb-0" style="height: 7px">
                    <br>
                    <div :class="[
                      item.saldo != 0 ? 'bg-danger' : 'bg-success',
                      'progressbar'
                    ]" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0"
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
    TextoBuscado: ""
  }),

  computed: {
    //
  },

  // watch: {},

  mounted() {
    this.getAllCuadreMonedaSaldos();
  },

  methods: {
    async getAllCuadreMonedaSaldos() {
      await ApiService.getCuadreMonedaSaldos().then((response) => {
        console.log(response);
        if (response.Erroresnegocio.BTErrorNegocio[0]) {
          this.message = response.Erroresnegocio.BTErrorNegocio[0].Descripcion;
        }
        //this.indices = response.sdtIndices.SdtBBTMONEDA;

        this.CuadreMonedas =
          response.SdtBalanceMonedaSaldos.SdtsBTBalanceMonedaSaldo;
      });
    },
    formattedNumber(numero) {
      const formatter = new Intl.NumberFormat('es', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
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
          objeto.nombre.toUpperCase().includes(buscado)
          ||
          objeto.signo.toUpperCase().includes(buscado)

        );
      });
    },

  }
};
</script>
<style scoped></style>
