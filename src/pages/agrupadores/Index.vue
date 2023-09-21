<template>
  <div class="mt-3">
    <h2>Agrupadores</h2>

    <hr />
    <div class="alert alert-warning" role="alert" v-show="message">
      {{ message + "!" }}
    </div>
    <!-- {{ agrupadores }} -->
    <div class="row">
      <template v-if="agrupadores">
        <div class="col-md-3 col-sm-5 mb-2" v-for="(item, index) in agrupadores" :key="index">
          <div class="card h-100 " @click="indicadorID(item.codigo)">
            <div class="card-body text-center">
              <h5 class="card-title">{{ item.descripcion }}</h5>
              <div>
                <i :class="[item.icon, 'mt-3']"></i>
              </div>
            </div>
          </div>
        </div>
      </template>
      <loading v-else></loading>
    </div>
  </div>
</template>
<script>
import ApiService from "@/utils/ApiService.js";
import AuthService from '@/utils/AuthService';
import Loading from "@/components/Loading.vue";

export default {
  // name: "MarketplaceIndex",
  components: { Loading },

  // directives
  // filters

  props: {
    //
  },

  data: () => ({
    agrupadores: null,
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
      await AuthService.GetAgrupadores().then((response) => {

        if (response.Erroresnegocio.BTErrorNegocio[0]) {
          this.message = response.Erroresnegocio.BTErrorNegocio[0].Descripcion;
          if (this.message == "Sesión inválida") {
            setTimeout(() => {
              AuthService.logout();
              this.$store.dispatch("logout");
              this.$router.push("/login");
            }, 3000)
          }
        }

        this.agrupadores = response.sdtAgrupadores.sBTAgrupador.map((item) => {
          switch (item.codigo) {
            case 100:
              // "Condiciones Generales"
              item.icon = "fas fa-wrench fa-5x primary";
              break;
            case 200:
              // "Cajas y Sucursales"
              item.icon = "fas fa-building fa-5x";
              break;
            case 300:
              // "Contabilidad"
              item.icon = "fas fa-file-contract fa-5x success";
              break;
            default:
              // sin icon
              item.icon = "";
              break;
          }
          console.log(item);
          return item;
        });
        if (!this.agrupadores[0]) {
          this.message = "No se encuentran registros!";
        }

      });
    },
    indicadorID(id) {
      this.$router.push({ path: `/indicador/${id}` });
      $(document).ready(function () {
        if(id == 100)
          $('.nav-list #links_0 a').trigger('click');
        if(id == 200)
          $('.nav-list #links_1 a').trigger('click');
        if(id == 300)
          $('.nav-list #links_2 a').trigger('click');
        
        $(".nav-list #links_0 a").on("click", function () {
          // removemos la clase 'active' de todos los elementos li
          $(".nav-list #links_0 a").css({
            "background-color": ""
          });
          // removemos el color rojo de todos los elementos span
          $(".nav-list #links_0 i").css({ color: "" });
          $(".nav-list #links_0 span").css({ color: "" });
          // agregamos la clase 'active' solo al elemento li clickeado
          $(this).css({
            "background-color": "rgb(245, 245, 245)"
          });
          // establecemos el color de fondo del elemento li clickeado a gris claro
          $(this).find("i").css({ color: "#3e2c42" });
          $(this).find("span").css({ color: "#3e2c42" });
        });
      });
    }
    //
    //
  }
};
</script>
<style scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.format {
  margin-bottom: 3%;
  position: absolute;
  bottom: 0;
}

.card {
  cursor: pointer;
}

.hover-underline-animation {
  position: relative;
  color: #0087ca;
}


.hover-underline-animation:after {
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #0087ca;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
