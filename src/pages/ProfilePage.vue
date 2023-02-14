<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2022-12-16 21:24 -->
<!-- Description: -->
<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-4 col-md-3">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          class="img-thumbnail"
          alt="" />
      </div>
      <div class="col">
        <div class="row mb-2">
          <div class="col">
            <input
              class="form-control-lg"
              type="text"
              disabled
              placeholder="Nombre de Planta" />
          </div>
        </div>
        <div class="row mb-2">
          <div class="col">
            <label for="">Region</label>
            <input class="form-control" type="text" disabled />
          </div>
          <div class="col">
            <label for="">Provincia</label>
            <input class="form-control" type="text" disabled />
          </div>
          <div class="col">
            <label for="">Distrito</label>
            <input class="form-control" type="text" disabled />
          </div>
        </div>
        <div class="row mb-2">
          <div class="col">
            <label for="">Comunidad</label>
            <input class="form-control" id="" type="text" name="" disabled="" />
          </div>
          <div class="col">
            <label for="">Georeferencia</label>
            <input class="form-control" id="" type="text" name="" disabled="" />
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-sm-4"><label for="">Representante</label></div>
      <div class="col">
        <input id="" class="form-control" type="text" name="" disabled />
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-sm-4"><label for="">RUC</label></div>
      <div class="col">
        <input id="" class="form-control" type="text" name="" disabled />
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-sm-4"><label for="">Tipo de Organizacion</label></div>
      <div class="col">
        <input id="" class="form-control" type="text" name="" disabled />
      </div>
    </div>
    <div class="row">
      <div class="col-6 mb-2">
        <div class="row">
          <div class="col"><label for="">Telefono</label></div>
          <div class="col">
            <input id="" class="form-control" type="text" name="" disabled />
          </div>
        </div>
      </div>
      <div class="col-6 mb-2">
        <div class="row">
          <div class="col"><label for="">Whatsapp</label></div>
          <div class="col">
            <input id="" class="form-control" type="text" name="" disabled />
          </div>
        </div>
      </div>
      <div class="col-6 mb-2">
        <div class="row">
          <div class="col"><label for="">Email</label></div>
          <div class="col">
            <input id="" class="form-control" type="text" name="" disabled />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* Script part */
export default {
  name: "ProfilePage",
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
