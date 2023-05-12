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

export default {
  name: "component.vue",
  mounted() {
    this.$refs.sidebarMenu.$el.querySelector("#my-scroll").style.margin =
      "6px 0px 0px";
    this.$refs.sidebarMenu.$el.querySelector("#my-scroll .nav-list").style.padding = "0.7rem";


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
  },
  components: { VueSidebarMenuAkahon },
  data() {
    return {
      menuItems: [
        {
          link: "/indicador/100",
          name: "Condiciones Generales",
          tooltip: "Condiciones Generales",
          icon: "bx-grid-alt"
        },
        {
          link: "/indicador/200",
          name: "Cajas Sucursales",
          tooltip: "Cajas Sucursales",
          icon: "bx-building"
        },
        {
          link: "/indicador/300",
          name: "Contabilidad",
          tooltip: "Contabilidad",
          icon: "bx-file"
        }
      ]
    };
  }
};
</script>
<style>
@media (min-width: 991.98px) {
  main {
    padding-left: 240px;
  }
}
</style>
