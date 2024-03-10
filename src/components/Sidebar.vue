<template>
  <div>
    <VueSidebarMenuAkahon
      :isUsedVueRouter="true"
      @menu-item-clicked="fnRouteTo(link)"
      style="margin-top: 58px"
      :isMenuOpen="true"
      :menuTitle="'Agrupadores'"
      :menuIcon="''"
      :bgColor="'#3e2c42'"
      :isSearch="false"
      :menuItems="menuItems"
      ref="sidebarMenu">
    </VueSidebarMenuAkahon>
    <!--Main layout-->
    <main style="margin-top: 58px">
      <div class="container pt-4"></div>
    </main>
    <!--Main layout-->
  </div>
</template>

<script>
import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";
import AuthService from "@/utils/AuthService";
export default {
  name: "component.vue",
  mounted() {
    this.getAllAgrupadores();
  },
  components: { VueSidebarMenuAkahon },
  data() {
    return {
      menuItems: [
        // {
        //   link: "/indicador/100",
        //   name: "Condiciones Generales",
        //   tooltip: "Condiciones Generales",
        //   icon: "bx-grid-alt"
        // },
        // {
        //   link: "/indicador/200",
        //   name: "Cajas Sucursales",
        //   tooltip: "Cajas Sucursales",
        //   icon: "bx-building"
        // },
        // {
        //   link: "/indicador/300",
        //   name: "Contabilidad",
        //   tooltip: "Contabilidad",
        //   icon: "bx-file"
        // }
      ],
      agrupadores: null
    };
  },
  methods: {
    async getAllAgrupadores() {
      await AuthService.GetAgrupadores().then((response) => {
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

        this.agrupadores = response.sdtAgrupadores.sBTAgrupador.map((item) => {
          switch (item.codigo) {
            case 100:
              // "Condiciones Generales"
              item.icon = "bx-grid-alt";
              break;
            case 200:
              // "Cajas y Sucursales"
              item.icon = "bx-building";
              break;
            case 300:
              // "Contabilidad"
              item.icon = "bx-file";
              break;
            default:
              // sin icon
              item.icon = "";
              break;
          }

          return {
            link: `/indicador/${item.codigo}`,
            name: `${item.descripcion}`,
            tooltip: `${item.descripcion}`,
            icon: `${item.icon}`
          };
        });

        this.menuItems = this.agrupadores;
        if (!this.agrupadores[0]) {
          this.message = "No se encuentran registros!";
        }
      });
    }
  },
  watch: {
    menuItems: {
      handler() {
        // Manipula los estilos y eventos del menú aquí
        this.$nextTick(() => {
          ///toido este codigo no funciona
          this.$refs.sidebarMenu.$el.querySelector("#my-scroll").style.margin =
            "6px 0px 0px";
          this.$refs.sidebarMenu.$el.querySelector(
            "#my-scroll .nav-list"
          ).style.padding = "0.7rem";
          const spanElements = this.$refs.sidebarMenu.$el.querySelectorAll(
            ".nav-list span.links_name"
          );
          for (let i = 0; i < spanElements.length; i++) {
            spanElements[i].style.fontSize = "12px";
          }
          $(document).ready(function () {
            $(".nav-list a").on("click", function () {
              // removemos la clase 'active' de todos los elementos li
              $(".nav-list a").css({
                "background-color": ""
              });
              // removemos el color rojo de todos los elementos span
              $(".nav-list i").css({ color: "" });
              $(".nav-list span").css({ color: "" });
              // agregamos la clase 'active' solo al elemento li clickeado
              $(this).css({
                "background-color": "rgb(245, 245, 245)"
              });
              // establecemos el color de fondo del elemento li clickeado a gris claro
              $(this).find("i").css({ color: "#3e2c42" });
              $(this).find("span").css({ color: "#3e2c42" });
            });
          });
        });
      },
      immediate: true // Ejecuta el watcher inmediatamente después de montar el componente
    }
  }
};
</script>
<style scoped></style>
