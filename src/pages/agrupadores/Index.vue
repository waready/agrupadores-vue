<template>
  <div class="mt-3">
    <h2>Agrupadores</h2>
    <!-- <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col"># Codigo</th>
          <th scope="col">Descripcíon</th>
          <th scope="col">Habilitado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in agrupadores" :key="index">
          <th scope="row">{{ item.codigo }}</th>
          <td>{{ item.descripcion }}</td>
          <td>SI</td>
          <td>
            <button class="btn btn-info" @click="indicadorID(item.codigo)">
              Indicador
            </button>
          </td>
        </tr>
      </tbody>
    </table> -->
    <hr />
    <div class="row">
      <div class="col-md-4 col-sm-5 mb-2" v-for="(item, index) in agrupadores" :key="index">
        <div class="card" >
          <div class="card-body text-center">
            <h5 class="card-title mb-2"> {{ item.descripcion }}</h5>
            <i :class="item.icon"></i>
            <p class="card-text mt-2">
              Indicador N° <a href="#" class="card-link">{{ item.codigo }}</a>
            </p>
            <button class="btn btn-info" @click="indicadorID(item.codigo)">
              Indicador
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-5 mb-2" v-for="(item, index) in agrupadores" :key="index">
        <div class="card" >
          <div class="card-body text-center">
            <h5 class="card-title mb-2"> {{ item.descripcion }}</h5>
            <i :class="item.icon"></i>
            <p class="card-text mt-2">
              Indicador N° <a href="#" class="card-link">{{ item.codigo }}</a>
            </p>
            <button class="btn btn-info" @click="indicadorID(item.codigo)">
              Indicador
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-5 mb-2" v-for="(item, index) in agrupadores" :key="index">
        <div class="card" >
          <div class="card-body text-center">
            <h5 class="card-title mb-2"> {{ item.descripcion }}</h5>
            <i :class="item.icon"></i>
            <p class="card-text mt-2">
              Indicador N° <a href="#" class="card-link">{{ item.codigo }}</a>
            </p>
            <button class="btn btn-info" @click="indicadorID(item.codigo)">
              Indicador
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ApiService from "@/utils/ApiService.js";

export default {
  // name: "MarketplaceIndex",
  components: {},

  // directives
  // filters

  props: {
    //
  },

  data: () => ({
    agrupadores: null
  }),

  computed: {
    //
  },

  // watch: {},

  mounted() {
    this.getAllAgrupadores();
  },

  methods: {
    async getAllAgrupadores() {
      await ApiService.GetAgrupadores().then((response) => {
        this.agrupadores = response.agrupadores.sBTAgrupador.map( (item) => {
          switch (item.codigo) {
            case 100:
              // "Condiciones Generales"
              item.icon = "fas fa-wrench fa-5x"
              break;
            case 200:
              // "Cajas y Sucursales"
              item.icon = "fas fa-building fa-5x"
              break;
            case 300:
              // "Contabilidad"
              item.icon = "fas fa-file-contract fa-5x"
              break;
            default:
              // sin icon
              item.icon = ""
              break;
          }
          console.log(item)
          return item
          
        }) ;

      });
    },
    indicadorID(id) {
      this.$router.push({ path: `/indicador/${id}` });
    }
    //
    //
  }
};
</script>
<style scoped></style>
