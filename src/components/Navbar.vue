<template>
  <!-- Navbar -->
      <!-- Navbar -->
      <nav
        id="main-navbar"
        class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
        <!-- Container wrapper -->
        <div class="container-fluid">
          <!-- Toggle button -->
          <!-- <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <i class="fas fa-bars"></i>
          </button> -->

          <!-- Brand -->
          <a class="navbar-brand" href="#">
            <img
              src="@/assets/logoB.png"
              height="30"
              alt="MDB Logo"
              loading="lazy" /> 
          </a>

          <!-- Right links -->
          <ul class="navbar-nav  flex-row">
            <a class="btn btn-secondary text-white" @click="logout()">Salir <i class="ml-1 fa-solid fa-right-from-bracket"></i></a>
            <!-- Notification dropdown -->
            <!-- Avatar -->
            <!--li class="nav-item dropdown">
              <a
                 class="nav-link ml-4  dropdown-toggle hidden-arrow" role="button"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                <i class="fas fa-user fa-lg"></i>
                <span class="badge rounded-pill badge-notification bg-danger"
                  >1</span
                > 
              </a>
              <ul
              class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <a class="dropdown-item" @click="logout()">Logout</a>
                </li>
              </ul>
            </li> -->
          </ul>
        </div>
        <!-- Container wrapper -->
      </nav>
      <!-- Navbar -->
  <!-- Navbar -->
</template>
<script>
/* Script part */
import AuthService from '@/utils/AuthService';
export default {
  name: "NavbarEl",
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
    async logout(){
      console.log("salir")
      await AuthService.logout();
      await this.$store.dispatch("logout");
      this.$router.push("/login");
    }
    //
    //
  }
};
</script>
<style scoped></style>
