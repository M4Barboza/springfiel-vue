<template>
  <v-app>
    <v-navigation-drawer
      app
      color="#033C16"
      permanent
      mini-variant
      touchless
      expand-on-hover
    >
      <v-list-item>
        <v-img src="@/assets/images/SpringfieldMont.png"></v-img>
      </v-list-item>

      <v-list class="mt-5">
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.to"
          active-class="border"
        >
          <v-list-item-icon>
            <v-icon color='white'>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="menu-font white--text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      drawer: null,
      items: [
        { title: 'Início', icon: 'mdi-home-variant', to: '/' },
        { title: 'Clima', icon: 'mdi-cloud', to: '/weather' },
        { title: 'Mapa', icon: 'mdi-map', to: '/map' },
        { title: 'Eventos', icon: 'mdi-calendar-multiple', to: '/events' },
        { title: 'Notícias', icon: 'mdi-newspaper', to: '/news' },
        { title: 'Contatos', icon: 'mdi-account-box-multiple', to: '/contacts' },
      ],
    }
  }
}
</script>

<style scoped>
  .menu-font{
    font-family: 'simpson';
    font-size: 24px;
  }

  .border {
    border-right: 4px solid white;
  }
</style>