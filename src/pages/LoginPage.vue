<template>
  <div class="container">
    <div class="row justify-content-center align-items-center minh-100">
      <div class="col-6 card text-center">
        <div class="card-header bg-secondary">Login</div>
        <div class="card-body">
          <h5 class="card-title">Ingrese sus Accesos</h5>
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
            <button class="btn btn-info btn-md btn-block" type="submit">
              Submit
            </button>
            <div class="alert mt-3 alert-warning" v-show="message">
              {{ message }}
            </div>
          </form>
        </div>
        <div class="card-footer text-muted">
          <a href="#">Forgot Password?</a>
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
    username: "",
    password: "",
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
      var result = await AuthService.login(this.username, this.password);
      if (result.success) {
        this.registrar();
      } else {
        this.message = result.message;
      }
    },
    async registrar() {
      await this.$store.dispatch("login");
      this.$router.push("/");
    }
    //
    //
  }
};
</script>
<style scoped>
.minh-100 {
  height: 90vh;
}
</style>
