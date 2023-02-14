<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2022-12-16 20:51 -->
<!-- Description: -->
<template>
  <div
    class="btn-group w-100"
    role="group"
    aria-label="Basic checkbox toggle button group">
    <router-link class="btn btn-primary" to="/">
      <i class="fa-solid fa-home"></i>
      Principal
    </router-link>
    <router-link class="btn btn-primary" to="/profile">
      <i class="fa-solid fa-user"></i>
      Perfil
    </router-link>
    <router-link class="btn btn-primary" to="/store">
      <i class="fa-solid fa-store"></i>
      Marketplace
    </router-link>
    <router-link class="btn btn-primary" to="/about">
      <i class="fa-solid fa-question"></i>
      Ayuda
    </router-link>
  </div>
</template>
<script>
/* Script part */
export default {
  name: "TopNavbar",
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
