<template>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="{ active: $route.name == 'monedas' }"
          to="/monedas">
          Monedas
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="{ active: $route.name == 'indices' }"
          to="/monedas/indices">
          Indices
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