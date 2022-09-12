<template>
  <v-menu
    v-model="isOpen"
    :close-on-content-click="false"
    :close-on-click="false"
    :activator="selectedElement"
    offset-x
  >
    <v-card color="grey lighten-4" width="300px" flat>
      <v-toolbar :color="selectedEvent.color" dark>
        <v-btn 
        icon
        @click="$emit('edit')"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
      </v-toolbar>
      <v-img
        height="250"
        :src="selectedEvent.banner"
      ></v-img>
      <v-card-text>
        {{ selectedEvent.details }}
      </v-card-text>
      <v-card-text>
        Horário: {{ selectedEvent.start.slice(11,16) }}
      </v-card-text>
      <v-card-actions class="justify-space-between">
        <v-btn text color="secondary" @click="isOpen = false">
          Cancel
        </v-btn>
        <v-dialog v-model="confirmDelete" max-width="290">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="error" v-bind="attrs" v-on="on"> Excluir </v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h5">
              Deseja mesmo excluir esse evento ?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="gray darken-1" text @click="confirmDelete = false">
                Cancelar
              </v-btn>
              <v-btn color="red darken-1" text @click="deleteEvent">
                Confirmar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { showError } from '@/config/error'

export default {
  name: "EventMenu",
  props: ['value', 'selectedEvent', 'selectedElement'],
  computed: {
    isOpen : {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  data() {
    return {
      confirmDelete: false
    }
  },
  methods: {
    deleteEvent() {
      if(!this.selectedEvent.id){
        return 
      } 
      this.$http.delete(`events/${this.selectedEvent.id}`)
        .then(() => {
          this.$emit('excluiu')
          this.isOpen = false;
          this.$toasted.global.defaultSuccess()
        }) .catch(showError)
    }
  }
};
</script>

<style>
</style>