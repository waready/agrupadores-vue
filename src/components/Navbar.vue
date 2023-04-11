<template>
  <!-- Navbar -->
      <!-- Navbar -->
      <nav
        id="main-navbar"
        class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
        <!-- Container wrapper -->
        <div class="container-fluid">
          <!-- Toggle button -->
          <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <i class="fas fa-bars"></i>
          </button>

          <!-- Brand -->
          <a class="navbar-brand" href="#">
            <img
              src="data:image/png;base64,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"
              height="30"
              alt="MDB Logo"
              loading="lazy" /> 
          </a>
          <!-- Search form -->
          <!-- <form class="d-none d-md-flex input-group w-auto my-auto">
            <input
            autocomplete="off"
            type="search"
            class="form-control rounded"
            placeholder='Search (ctrl + "/" to focus)'
            style="min-width: 225px;"
            />
            <span class="input-group-text border-0"><i class="fas fa-search"></i></span>
        </form> -->

          <!-- Right links -->
          <ul class="navbar-nav ms-auto d-flex flex-row">
            <!-- Notification dropdown -->
            <li class="nav-item dropdown">
              <a
                class="nav-link me-3 me-lg-0 dropdown-toggle hidden-arrow"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false">
                <i class="fas fa-bell"></i>
                <span class="badge rounded-pill badge-notification bg-danger"
                  >1</span
                >
              </a>
              <ul
                class="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink">
                <li>
                  <a class="dropdown-item" href="#">Some news</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">Another news</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">Something else here</a>
                </li>
              </ul>
            </li>

            <!-- Icon -->
            <li class="nav-item">
              <a class="nav-link me-3 me-lg-0" href="#">
                <i class="fas fa-fill-drip"></i>
              </a>
            </li>
            <!-- Icon -->
            <li class="nav-item me-3 me-lg-0">
              <a class="nav-link" href="#">
                <i class="fab fa-github"></i>
              </a>
            </li>

            <!-- Icon dropdown -->
            <li class="nav-item dropdown">
              <a
                class="nav-link me-3 me-lg-0 dropdown-toggle hidden-arrow"
                href="#"
                id="navbarDropdown"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false">
                <i class="flag-united-kingdom flag m-0"></i>
              </a>
              <ul
                class="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown">
                <li>
                  <a class="dropdown-item" href="#"
                    ><i class="flag-united-kingdom flag"></i>English
                    <i class="fa fa-check text-success ms-2"></i
                  ></a>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="#"
                    ><i class="flag-poland flag"></i>Polski</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="#"
                    ><i class="flag-china flag"></i>中文</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="#"
                    ><i class="flag-japan flag"></i>日本語</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="#"
                    ><i class="flag-germany flag"></i>Deutsch</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="#"
                    ><i class="flag-france flag"></i>Français</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="#"
                    ><i class="flag-spain flag"></i>Español</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="#"
                    ><i class="flag-russia flag"></i>Русский</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="#"
                    ><i class="flag-portugal flag"></i>Português</a
                  >
                </li>
              </ul>
            </li>

            <!-- Avatar -->
            <li class="nav-item dropdown">
              <a
                class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                  class="rounded-circle"
                  height="22"
                  alt="Avatar"
                  loading="lazy" />
              </a>
              <ul
              class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <a class="dropdown-item" href="#">My profile</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">Settings</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">Logout</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <!-- Container wrapper -->
      </nav>
      <!-- Navbar -->
  <!-- Navbar -->
</template>
<script>
/* Script part */
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
    //
    //
    //
  }
};
</script>
<style scoped></style>
