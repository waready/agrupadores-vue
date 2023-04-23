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
    this.$refs.sidebarMenu.$el.querySelector('#my-scroll').style.margin = '6px 0px 0px';
    this.$refs.sidebarMenu.$el.querySelector('#my-scroll .nav-list').style.paddingLeft = '0.7rem';
  },
  components: { VueSidebarMenuAkahon },
  data() {
    return {
     menuItems: [
    {
      link: '/indicador/100',
      name: 'Condiciones Generales',
      tooltip: 'Condiciones Generales',
      icon: 'bx-grid-alt',
    },
    {
      link: '/indicador/200',
      name: 'Cajas Sucursales',
      tooltip: 'Cajas Sucursales',
      icon: 'bx-user',
      
    },
    {
      link: '/indicador/300',
      name: 'Contabilidad',
      tooltip: 'Contabilidad',
      icon: 'bx-chat',
    },
  
   ]
  }
}
}
</script>
<style >
@media (min-width: 991.98px) {
  main {
    padding-left: 240px;
  }
}
</style>
