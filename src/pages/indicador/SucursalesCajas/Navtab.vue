<template>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="{ active: $route.name == 'Sucursales' }"
          to="/sucursales">
          Sucursales
        </router-link>
      </li>
      <li class="nav-item" v-if="$route.name == 'Cajas'">
        <router-link
          class="nav-link"
          :class="{ active: $route.name == 'Cajas' }"
          to="/sucursales/cajas">
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