<template>
  <div>
    <!-- <div class="spinner-border" style="width: 1rem; height: 1rem" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-border" style="width: 2rem; height: 2rem" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-border" style="width: 3rem; height: 3rem" role="status">
      <span class="sr-only">Loading...</span>
    </div> -->
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <!-- <div class="modal-header">
                <slot name="header">
                  default header
                </slot>
              </div> -->

            <div class="modal-body text-white">
              <slot name="body"> Espere un momento porfavor!! </slot>
              <br />
              <!-- <div
                class="spinner-grow text-info"
                style="width: 1rem; height: 1rem"
                role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div
                class="spinner-grow text-info"
                style="width: 1rem; height: 1rem"
                role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div
                class="spinner-grow text-info"
                style="width: 1rem; height: 1rem"
                role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div
                class="spinner-grow text-info"
                style="width: 1rem; height: 1rem"
                role="status">
                <span class="sr-only">Loading...</span>
              </div> -->
              <div class="splash-title">
                <div class="lds-facebook">
                  <div></div>
                  <div></div> 
                  <div></div> 
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showModal: true
    };
  }
};
</script>
<style scoped>
.lds-facebook {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 10px;
  background: #0bd174;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 56px;
  animation-delay: -0.48s;
}
.lds-facebook div:nth-child(2) {
  left: 80px;
  animation-delay: -0.36s;
}
.lds-facebook div:nth-child(3) {
  left: 104px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(4) {
  left: 128px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(5) {
  left: 152px;
  animation-delay: 0s;
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%,
  100% {
    top: 24px;
    height: 32px;
  }
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  /* background-color: #fff; */
  border-radius: 2px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33); */
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
