<template>
  <v-main>
    <div class="home-title">
      <h1>Springfield App</h1>
    </div>
    <v-carousel
      height="100vh"
      hide-delimiters
      :show-arrows="false"
      cycle
      touchless
      interval="5000"
    >
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="require(`@/assets/images/${item}.png`)"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
  </v-main>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      items: [ 'city-view', 'city-view-2', 'room' ]
    };
  }
};
</script>

<style scoped>
  .home-title{
    display: flex;
    position: absolute;
    z-index: 1;
    text-align: center;
    justify-content: center;
    width: calc(100vw - 56px);
  }

  .home-title h1{
    width: 800px;
    font-family: 'simpson';
    font-size: 12rem;
    line-height: normal;
    color:#F8DB27;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #000;
  }

  @media (max-width: 760px) {
    .home-title h1 {
      font-size: 4.5rem;
    }
  }

</style>