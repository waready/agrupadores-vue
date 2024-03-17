<template>
  <div class="row">
    <div class="col-md-3">
      <figure>
        <header>
          APERTURA CORE
        </header>
        <section>
          {{ fechaA }}
        </section>
      </figure>
    </div>
    <div class="col-md-3">
      <figure>
        <header>
          CIERRE CORE
        </header>
        <section>
          {{ fechaC }}
        </section>
      </figure>
    </div>
    <div class="col-md-3">
      <figure>
        <header>
          APERTURA 24X7
        </header>
        <section>
          {{ fecha7x24A }}
        </section>
      </figure>
    </div>
    <div class="col-md-3">
      <figure>
        <header>
          CIERRE 24X7
        </header>
        <section>
          {{ fecha7x24C }}
        </section>
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  props: ["fechaA", "fechaC", "fecha7x24A", "fecha7x24C"]
};
</script>

<style scoped>
/* @group Mixins */

figure {
  margin: 30px auto;

  width: 128px;
  height: 111px;

  /* background-image: -webkit-linear-gradient(#08111b 0%, #e5e5e5 100%); */
  /* background-image: -moz-linear-gradient(#193b5e 0%, #e5e5e5 100%); */
  /* background-image: -o-linear-gradient(#18436f 0%, #e5e5e5 100%); */
  background-image: linear-gradient(#fafbfb 0%, #e5e5e5 100%);

  border-radius: 10px;

  position: relative;

  &:before {
    content: '';
    display: block;

    width: 128px;
    height: 65px;

    border-radius: 10px 10px 0 0;

    background-image: -webkit-linear-gradient(white 0%, #edeeef 100%);
    background-image: -moz-linear-gradient(white 0%, #edeeef 100%);
    background-image: -o-linear-gradient(white 0%, #edeeef 100%);
    background-image: linear-gradient(white 0%, #edeeef 100%);

  }

  header {
    width: 128px;
    height: 27px;

    position: absolute;
    top: -1px;

    background-color: #fa565a;
    border-radius: 10px 10px 0 0;
    border-bottom: 3px solid #e5e5e5;

    font:  13px/25px Arial, Helvetica, Geneva, sans-serif;
    letter-spacing: 0.5px;
    color: #fff;

    text-align: center;
  }

  section {
    width: 128px;
    height: 80px;

    position: absolute;
    top: 45%;

    font: 26px "Helvetica Neue", Arial, Helvetica, Geneva, sans-serif;
    letter-spacing: -2px;
    color: #4c566b; /* color de fuente */

    text-align: center;

    z-index: 10;
  }
}

/* @end */

</style>