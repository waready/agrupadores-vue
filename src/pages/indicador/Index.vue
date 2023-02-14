<template>
  <div class="mt-3">
    <h2>Indicadores</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col"># Orden</th>
          <th scope="col">indicador</th>
          <th scope="col">Descripcíon</th>
          <th scope="col">Habilitado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in indicadores" :key="index">
          <th scope="row">{{ item.orden }}</th>
          <td>{{ item.indicador }}</td>
          <td>{{ item.descripcion }}</td>
          <td>SI</td>
          <td>
            <button
              class="btn btn-info"
              @click="indicadorID(item.indicador)"
              data-toggle="modal"
              data-target="#modal-fullscreen-xl">
              Visualizar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <div class="row">
      <div class="col-3">
        <ul
          class="list-group"
          v-for="(item, index) in indicadores"
          :key="index">
          
            <li
              class="list-group-item d-flex justify-content-between align-items-center mb-2">
              <a href="" @click="indicadorID(item.indicador)">
              {{ item.descripcion }}
              </a>
              <span class="badge badge-primary badge-pill">{{
                item.indicador
              }}</span>
             
            </li>
        </ul>
      </div>
      <div class="col-9">
        holi
      </div>
    </div> -->
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
    indicadores: null
  }),

  computed: {
    //
  },

  // watch: {},

  mounted() {
    this.getAllAgrupadores(this.$route.params.id);
  },

  methods: {
    async getAllAgrupadores(idIndicador) {
      await ApiService.GetIndicadores(idIndicador).then((response) => {
        this.indicadores = response.indicadores.sBTIndicador;
      });
    },
    indicadorID(id) {
      if (id == 201) this.$router.push({ path: `/indicador/sucursales` });
      if (id == 106) this.$router.push({ path: `/marketplace` });
    }
    //
    //
  }
};
</script>
<style scoped></style>
