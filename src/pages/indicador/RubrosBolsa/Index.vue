<template>
  <div>
    <div class="alert alert-warning" role="alert" v-show="message">
      {{ message + "!" }}
    </div>
    <div v-if="CuadreMonedas">
      <h2>Rubro Bolsas</h2>
      <pre>
            {{ CuadreMonedas }}
        </pre
      >
      <hr />
      <section id="services" class="services">
        <div class="container">
          <div class="row">
            <div
              class="col-lg-4 col-md-6 icon-box"
              data-aos="fade-up"
              v-for="(item, index) in CuadreMonedas"
              :key="index">
              <div class="icon">
                <i class="fas fa-euro"></i>
              </div>
              <h4 class="title">
                <a href="">{{ item.Nombremoneda }}</a>
              </h4>
              <p class="description">
                <a
                  :class="
                    item.Saldo < 0
                      ? 'badge badge-danger'
                      : 'badge badge-success'
                  ">
                  {{ item.Saldo }}
                </a>
              </p>
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
export default {
  name: "RubroBolsa",
  components: {
    loading
  },
  mounted() {
    console.log("hola");
    this.getAllCuadreMonedaSaldos();
  },
  data: () => ({
    CuadreMonedas: null,
    message: ""
  }),

  methods: {
    async getAllCuadreMonedaSaldos() {
      await ApiService.getCuadreMonedaSaldos().then((response) => {
        console.log(response);
        if (response.Erroresnegocio.BTErrorNegocio[0]) {
          this.message = response.Erroresnegocio.BTErrorNegocio[0].Descripcion;
        }
        //this.indices = response.sdtIndices.SdtBBTMONEDA;

        this.CuadreMonedas =
          response.sDTValanceMonedaSaldo.SdtsBTValanceMonedaSaldo;
      });
    }
    //
    //
  }
};
</script>

<style scoped></style>
