<template>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="{ active: $route.name == 'Servicios' }"
          to="/EjecucionesPorServicio">
          Servicios
        </router-link>
      </li>
      <li class="nav-item" v-if="$route.name == 'Metodos'">
        <router-link
          class="nav-link"
          :class="{ active: $route.name == 'Metodos' }"
          to="/EjecucionesPorServicio/metodos">
          Métodos
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