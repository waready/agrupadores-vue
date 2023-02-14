<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2022-12-16 17:48 -->
<!-- Description: -->
<template>
  <div class="row">
    <div class="col" v-if="marker">
      <div class="row mb-2">
        <div class="col">
          <input
            class="form-control-lg text-uppercase"
            type="text"
            :value="marker.name" />
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-lg-4">
          <div class="row mb-2">
            <div class="col">
              <div class="video-responsive">
                <iframe
                  :src="marker.videoSrc"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen></iframe>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <p class="form-control mb-0" readonly>{{ marker.slogan }}</p>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <ul class="list-group">
                <li
                  class="list-group-item d-flex justify-content-between align-items-center">
                  Ventas
                  <span class="badge bg-primary badge-pill">14</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <button class="btn btn-primary btn-lg me-1">
                <i class="fa-brands fa-facebook fa-lg"></i>
              </button>
              <button class="btn btn-success btn-lg me-1">
                <i class="fa-brands fa-whatsapp fa-lg"></i>
              </button>
              <button class="btn btn-info btn-lg me-1">
                <i class="fa-brands fa-facebook-messenger fa-lg"></i>
              </button>
              <button class="btn btn-outline-primary btn-lg me-1">
                <i class="fa-solid fa-phone"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="row mb-2">
            <div class="col">
              <div class="card border-primary">
                <div class="card-header">Descripcion</div>
                <div class="card-body">
                  <h4 class="card-title">Nuestra Historia</h4>
                  <p class="card-text">
                    {{ marker.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-4" v-for="(l, i) in marker.images" :key="i">
              <img :src="l.src" :alt="l.label" class="img-thumbnail shadow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import markers from "../components/demoMarkets.js";
import _ from "lodash";
export default {
  name: "MarkerViewPage",
  components: {
    //
  },

  // directives
  // filters

  props: {
    id: { require: true }
  },

  data: () => ({
    markerName: null,
    marker: null
  }),

  computed: {
    //
  },

  // watch: {},

  created() {
    var mark = _.head(markers.filter((x) => x.id == this.id));
    if (mark) {
      this.markerName = mark.name;
      this.marker = mark;
    }
  },

  methods: {
    //
    //
    //
  }
};
</script>
<style>
.video-responsive {
  height: 0;
  overflow: hidden;
  padding-bottom: 56.25%;
  padding-top: 30px;
  position: relative;
}
.video-responsive iframe,
.video-responsive object,
.video-responsive embed {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
