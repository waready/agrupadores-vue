<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <Navbar></Navbar>
          <Sidebar></Sidebar>
          <router-view class="mltam" />          
        </div>
      </div>
    </div>
    <Footer class=""></Footer>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import Footer from "@/components/Footer.vue";
/* Script part */
export default {
  name: "IndexPage",
  components: {
    Sidebar,
    Navbar,
    Footer
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
  .mltam {
    margin-left: 50px;
  }

</style>
