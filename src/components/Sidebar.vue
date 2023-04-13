<template>
  <div>
    <!--Main Navigation-->
    <header>
       <!-- Sidebar -->
      <nav
        id="sidebarMenu"
        class="collapse d-lg-block sidebar collapse bg-color"
      >
        <div class="position-sticky">
          <div
            class="list-group bg-color text-white list-group-flush mx-3 mt-4"
          >
          <!--  @click="routerPadre()" -->
            <a
             
              class="list-group-item list-group-item-action py-2 ripple active"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fas fa-chart-area fa-fw me-3"></i><span>Agrupadores</span>
            </a>
            <!-- Dropdown -->
            <div class="dropdown">
              <ul
                class="dropdown-menu list-group-item list-group-item-action py-2 ripple active"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <a @click="router(100)" class=" dropdown-item">Condiciones Generales</a>
                </li>
                <li>
                  <a @click="router(200)" class=" dropdown-item">Cajas y Sucursales</a>
                </li>
                <li>
                  <a @click="router(300)" class=" dropdown-item">Contabilidad</a>
                </li>
              </ul>
            </div>
            <!-- Dropdown -->
          </div>
        </div>
      </nav>
      <!-- Sidebar -->
    </header>
    <!--Main Navigation-->

    <!--Main layout-->
    <main style="margin-top: 58px">
      <div class="container pt-4"></div>
    </main>
    <!--Main layout-->
  </div>
</template>
<script>
export default {
  methods: {
    routerPadre(){
      this.$router.push("/");      
    },
    router(id){
      this.$router.push("/indicador/"+id);   
    }

  },
}
</script>

<style>
body {
  background-color: #fbfbfb;
}
@media (min-width: 991.98px) {
  main {
    padding-left: 240px;
  }
}

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  padding: 58px 0 0; 
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
  width: 240px;
  z-index: 600;
}

@media (max-width: 991.98px) {
  .sidebar {
    width: 100%;
  }
} 
 .sidebar .active {
  border-radius: 5px;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;
}

.bg-color{
  background-color: rgb(56, 26, 56);
}


.list-group-item {background-color: rgb(56, 26, 56); color: #fbfbfb;  border:0;}
</style>
