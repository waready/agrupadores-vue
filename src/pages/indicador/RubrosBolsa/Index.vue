<template>
  <div>
    <div class="alert alert-warning" role="alert" v-show="message" >
      {{ message + '!' }}
    </div>
    <div v-if="CuadreMonedas">
        <h2>Rubro Bolsas</h2>
        <pre>
            {{ CuadreMonedas }}
        </pre>
        <hr />
         <section id="services" class="services">
      <div class="container">
        <div class="section-title">
          <h2>Services</h2>
          <p>
            Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex
            aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos
            quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia
            fugiat sit in iste officiis commodi quidem hic quas.
          </p>
        </div>

        <div class="row">
          <div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up" v-for="(item,index) in CuadreMonedas" :key="index">
            <div class="icon"><i class="bi bi-briefcase"></i></div>
            <h4 class="title"><a href="">{{item.Nombremoneda}}</a></h4>
            <p class="description">
              Voluptatum deleniti atque corrupti quos dolores et quas molestias
              excepturi sint occaecati cupiditate non provident
            </p>
          </div>
          <!-- <div
            class="col-lg-4 col-md-6 icon-box"
            data-aos="fade-up"
            data-aos-delay="100">
            <div class="icon"><i class="bi bi-card-checklist"></i></div>
            <h4 class="title"><a href="">Dolor Sitema</a></h4>
            <p class="description">
              Minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat tarad limino ata
            </p>
          </div>
          <div
            class="col-lg-4 col-md-6 icon-box"
            data-aos="fade-up"
            data-aos-delay="200">
            <div class="icon"><i class="bi bi-bar-chart"></i></div>
            <h4 class="title"><a href="">Sed ut perspiciatis</a></h4>
            <p class="description">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur
            </p>
          </div>
          <div
            class="col-lg-4 col-md-6 icon-box"
            data-aos="fade-up"
            data-aos-delay="300">
            <div class="icon"><i class="bi bi-binoculars"></i></div>
            <h4 class="title"><a href="">Magni Dolores</a></h4>
            <p class="description">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum
            </p>
          </div>
          <div
            class="col-lg-4 col-md-6 icon-box"
            data-aos="fade-up"
            data-aos-delay="400">
            <div class="icon"><i class="bi bi-brightness-high"></i></div>
            <h4 class="title"><a href="">Nemo Enim</a></h4>
            <p class="description">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque
            </p>
          </div>
          <div
            class="col-lg-4 col-md-6 icon-box"
            data-aos="fade-up"
            data-aos-delay="500">
            <div class="icon"><i class="bi bi-calendar4-week"></i></div>
            <h4 class="title"><a href="">Eiusmod Tempor</a></h4>
            <p class="description">
              Et harum quidem rerum facilis est et expedita distinctio. Nam
              libero tempore, cum soluta nobis est eligendi
            </p>
          </div> -->
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
    console.log("hola")
    this.getAllCuadreMonedaSaldos();
  },
  data: () => ({
    CuadreMonedas: null,
    message: "",
  }),
  
  methods: {
    async getAllCuadreMonedaSaldos() {
      await ApiService.getCuadreMonedaSaldos().then((response) => {
        console.log(response);
        if (response.Erroresnegocio.BTErrorNegocio[0]) {
          this.message = response.Erroresnegocio.BTErrorNegocio[0].Descripcion;
        }
        //this.indices = response.sdtIndices.SdtBBTMONEDA;

        this.CuadreMonedas =response.sDTValanceMonedaSaldo.SdtsBTValanceMonedaSaldo;
      });
    }
    //
    //
  }
};
</script>

<style scoped>

/*--------------------------------------------------------------
# Services
--------------------------------------------------------------*/
.services .icon-box {
  margin-bottom: 20px;
}

.services .icon {
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  background: #149ddd;
  border-radius: 50%;
  transition: 0.5s;
  border: 1px solid #149ddd;
}

.services .icon i {
  color: #fff;
  font-size: 24px;
  line-height: 0;
}

.services .icon-box:hover .icon {
  background: #fff;
}

.services .icon-box:hover .icon i {
  color: #149ddd;
}

.services .title {
  margin-left: 80px;
  font-weight: 700;
  margin-bottom: 15px;
  font-size: 18px;
}

.services .title a {
  color: #343a40;
}

.services .title a:hover {
  color: #149ddd;
}

.services .description {
  margin-left: 80px;
  line-height: 24px;
  font-size: 14px;
}
</style>
