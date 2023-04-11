<template>
  <div class="container">
    <div class="row justify-content-center align-items-center minh-100">
      <div class="col-11 col-md-6 card shadow-lg rounded text-center">
        <div class="card-header">
          <img
            class="mt-3"
            width="250"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkB2xhIVe2Re3oGukKSxSvsO1ZZe1w33R1l_VOCfu4VeYE_SjzeWZ7XNbHBVi0klm3_g&usqp=CAU" />
        </div>
        <div class="card-body">
          <!-- <h5 class="card-title">Ingrese sus Accesos</h5> -->
          <form @submit.prevent="login()" action="">
            <div class="mb-3">
              <!-- <label for="">Email</label> -->
              <input
                class="form-control"
                type="text"
                v-model="username"
                placeholder="E-mail" />
            </div>
            <div class="mb-3">
              <!-- <label for="">Password</label> -->
              <input
                class="form-control"
                type="password"
                v-model="password"
                placeholder="Contraseña" />
            </div>
            <button class="btn btn-danger btn-md btn-block" type="submit">
              Ingresar
            </button>
            <div class="alert mt-3 alert-warning" v-show="message">
              {{ message }}
            </div>
          </form>
        </div>
        <div class="card-footer text-muted">
          <a href="" class="h6"
            >Bantotal 2023 - Todos los derechos reservados</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AuthService from "@/utils/AuthService.js";
/* Script part */
export default {
  name: "LoginPage",
  components: {
    //
  },

  // directives
  // filters

  props: {
    //
  },

  data: () => ({
    username: "instalador",
    password: "Bantotal2015",
    loading: false,
    message: ""
  }),

  computed: {
    //
  },

  // watch: {},

  mounted() {
    //
  },

  methods: {
    async login() {
      var result = await AuthService.login(
        this.username.toUpperCase(),
        this.password
      );

      if(!result.success){
        this.message = result.message;
        setTimeout(() => this.message = false, 3500);
      }else{
        if (!result.data.Erroresnegocio.BTErrorNegocio[0]) {
          this.registrar(result.data);
        } else {
          this.message = result.data.Erroresnegocio.BTErrorNegocio[0].Descripcion;
          setTimeout(() => this.message = false, 3500);
        }
      }
    },
    async registrar(user) {
      await this.$store.dispatch("login",user);
      this.$router.push("/");
    }
  }
};
</script>
<style scoped>
.minh-100 {
  height: 90vh;
}
</style>
