<template>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="{ active: $route.name == 'configuracion_especialidades' }"
          to="/indicador/sucursales">
          Sucursales
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="{ active: $route.name == 'configuracion_capitulos' }"
          to="/indicador/cajas">
          Cajas
        </router-link>
      </li>
    </ul>
  </template>
  <script>
  export default {
    components: {
      //
    },
  
    // directives
    // filters
  
    props: {
      //
    },
  
    data: () => ({
      //
    }),
  
    computed: {
      //
    },
  
    // watch: {},
  
    mounted() {
      //
    },
  
    methods: {
      //
      //
      //
    }
  };
  </script>
  
  <style scoped></style>