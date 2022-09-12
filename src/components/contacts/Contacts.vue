<template>
  <v-main>
    <h1 class="contacts-title">{{ message }}</h1>
    <v-row justify="center" no-gutters>
      <v-list :max-width="$vuetify.breakpoint.xs ? 300 : ''" min-width="70vw" class="list">
        <v-list-item
          v-for="(contact, i) in contacts"
          :key="contact.id"
          :class="[i % 2 == 0 ? 'white' : 'blue lighten-3', 'mb-5', 'rounded-lg']"
        >
          <v-list-item-avatar>
            <v-img
              :alt="`${contact.name} avatar`"
              src="http://placeimg.com/40/40/person"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="contact.name"></v-list-item-title>
            <span class="mt-2 mt-sm-0">{{ contact.phone }}</span>
            <span class="responsive-email mt-2 mt-sm-0 d-block d-sm-none">{{ contact.email }}</span>
          </v-list-item-content>

          <v-list-item-content class="responsive-email d-none d-sm-block">
            {{ contact.email }}
          </v-list-item-content>
          
          <v-list-item-action class="flex-sm-row align-center">
            <v-icon 
              v-ripple
              class="warning pa-2 mb-2 mb-sm-0 mr-sm-2 rounded-lg elevation-3 icon" 
              color="white"
              @click="() => {openDialog = true; selectedContact = contact}"
            >
              mdi-pencil
            </v-icon>

            <v-icon 
              v-ripple
              class="error pa-2 rounded-lg elevation-3 icon"
              color="white"
              @click="() => {confirmDelete = true; selectedContact = contact}"
            >
              mdi-delete
            </v-icon>

          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-dialog 
        v-model="confirmDelete"
        max-width="290" 
        :retain-focus="false"
      >
        <v-card>
          <v-card-title class="text-h5">
            Deseja mesmo excluir esse contato ?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="gray darken-1" text @click="confirmDelete = false">
              Cancelar
            </v-btn>
            <v-btn color="red darken-1" text @click="deleteContact">
              Confirmar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <template>
        <v-btn
          fab
          color="#87D4FE"
          bottom
          right
          fixed
          @click="() => {openDialog = true; isCreate = true}"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
    </v-row>

    <contact-dialog
      v-model="openDialog"
      :isCreate="isCreate"
      :selectedContact="selectedContact"
      @cancel="isCreate = false"
      @atualizou="loadContacts"
    ></contact-dialog>
  </v-main>
</template>

<script>
import { showError } from '@/config/error'
import ContactDialog from './ContactDialog'

export default {
  name: 'Contacts',
  components: { ContactDialog },
  data() {
    return {
      confirmDelete: false,
      message: null,
      contacts: [],
      selectedContact: {
        id: '',
        name: '',
        phone: '',
        email: ''
      },
      openDialog: false,
      isCreate: false
    }
  },
  methods: {
    loadContacts() {
      this.$http.get('contacts').then(res => {
        this.message = res.data.message
        this.contacts = res.data.data
      })
    },
    deleteContact() {
      if(!this.selectedContact.id){
        return
      }

      this.$http.delete(`contacts/${this.selectedContact.id}`)
        .then(() => {
          this.confirmDelete = false
          this.$toasted.global.defaultSuccess()
          this.loadContacts()
        }) .catch(showError)
    }
  },
  mounted() {
    this.loadContacts()
  }
}
</script>

<style scoped>
  main {
    background-color: #e5e5e5;
  }

  .contacts-title{
    text-align: center;
    font-family: 'simpson';
    font-size: 96px;
    color: #FF81C1;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #000;
  }

  .responsive-email {
    word-break: break-all;
  }

  @media (max-width: 760px) {
    .contacts-title {
      font-size: 4.5rem;
    }
  }

  .list {
    background: transparent;
  }

  .icon:hover {
    cursor: pointer;
  }
</style>