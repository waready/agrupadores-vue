<template>
  <div class="wrapper">
    <!-- Footer -->
    <footer class="text-center text-lg-start bg-light text-muted mt-2 footer">
      <!-- Copyright -->
      <div
        class="text-center p-4"
        style="background-color: rgba(0, 0, 0, 0.05)">
        © 2023 Copyright:
        <a class="text-reset fw-bold" href="https://www.bantotal.com/"
          >Bantotal - Todos los derechos reservados</a
        >
      </div>
      <!-- Copyright -->
    </footer>
  </div>
  <!-- Footer -->
</template>
<script>
/* Script part */
export default {
  name: "FooterEl",
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
<style scoped>
.wrapper {
  position: relative;
  min-height: 70vh;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
