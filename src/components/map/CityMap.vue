<template>
  <v-main class="map-content" v-dragscroll.pass="true">
      <img src="@/assets/images/springfield-map.jpg" usemap="#image-map">
      <map name="image-map">
          <area @click="changeLocal('aeroporto')" alt="Aeroporto Internacional" title="Aeroporto Internacional" coords="679,146,878,183" shape="rect">
          <area @click="changeLocal('lago')" alt="Lago de Springfield" title="Lago de Springfield" coords="436,241,594,280" shape="rect">
          <area @click="changeLocal('usina')" alt="Usina Nuclear" title="Usina Nuclear" coords="1490,204,1622,241" shape="rect">
          <area @click="changeLocal('krusty')" alt="Krusty Burguer" title="Krusty Burguer" coords="1037,515,1138,562" shape="rect">
          <area @click="changeLocal('shopping')" alt="Shopping de Springfield" data-title="Shopping de Springfield" coords="565,877,740,925" shape="rect">
          <area @click="changeLocal('hospital')" alt="Hospital Geral" title="Hospital Geral" coords="1692,560,1861,612" shape="rect">
      </map>
      <local-dialog v-model="showDialog" :local="local"/>
  </v-main>
</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import LocalDialog from './LocalDialog'

export default {
  name: 'CityMap',
  directives: {
    dragscroll
  },
  components: {LocalDialog},
  data() {
    return {
      local: 'aeroporto',
      showDialog: false
    }
  },
  methods: {
    changeLocal(local){
      this.local = local
      this.showDialog = true
    }
  }
}
</script>

<style>
  .map-content{
    overflow: hidden;
    cursor: grab;
  }

  area{
    cursor: pointer;
    display: block;
  }

  img {
    display: block;
  }

</style>