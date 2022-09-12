<template>
  <v-row justify="center">
    <v-dialog
      v-model="isOpen"
      max-width="600px"
      persistent
    >

      <v-card>
        <v-card-title>
          <span class="text-h5">{{ isCreate ? 'Criar Novo' : 'Editar' }} Contato</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form
            ref="form"
            lazy-validation
            >
              <v-text-field
                  v-model="contact.name"
                  label="Nome do Contato*"
                  required
                  :validate-on-blur="true"
                  :rules="[v => !!v || 'Nome é obrigatório!']"
                  prepend-icon="mdi-format-title"
                  outlined
              ></v-text-field>
              <v-text-field
                  v-model="contact.phone"
                  type="tel"
                  label="Telefone do Contato*"
                  required
                  :validate-on-blur="true"
                  :rules="[
                    v => !!v || 'Telefone é obrigatório!',
                    v => isCreate ? (regPhone.test(v) || 'Telefone deve ser (xx) 9xxxx-xxxx') : true]"
                  prepend-icon="mdi-phone-outline"
                  outlined
                  v-maska="isCreate ? '(##) #####-####' : { mask: 'Z*', tokens: { 'Z': { pattern: /[\sxX0-9().-]/ }}}"
                  
              ></v-text-field>
              <v-text-field
                v-model="contact.email"
                type="email"
                label="Email do Contato*"
                required
                :validate-on-blur="true"
                :rules="[
                  v => !!v || 'Email é obrigatório!',
                  v => regEmail.test(v) || 'Email inválido']"
                prepend-icon="mdi-at"
                outlined
              ></v-text-field>
            </v-form>
          </v-container>
          <small>*campos obrigatórios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn 
                color="gray darken-1" 
                text 
                @click="reset"
                >
                Cancelar
            </v-btn>
            <v-btn 
                color="primary" 
                class="white--text"
                @click="save"
                >
                Salvar
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { showError } from '@/config/error'
import { maska } from 'maska'

export default {
  name: 'ContactDialog',
  props:['value', 'selectedContact', 'isCreate'],
  directives: { maska },
  computed: {
    isOpen : {
      get() {
        return this.value
      },
      set(val){
        this.$emit('input', val)
      }
    }
  },
  watch: {
    value() {
      this.onLoad()
    }
  },
  data() {
    return {
      contact: {},
      regEmail: new RegExp('[a-z0-9]+@[a-z]+\\.[a-z]{2,3}'),
      regPhone: new RegExp('^\\([1-9]{2}\\) (?:[2-8]|9[1-9])[0-9]{3}\\-[0-9]{4}$')
    }
  },
  methods: {
    save() {
      if(!this.$refs.form.validate()){
        this.$toasted.global.defaultError({msg: 'Erro de validação'})
        return
      } 

      const method = this.contact.id ? 'put' : 'post'
      const id = this.contact.id ? `/${this.contact.id}` : ''

      this.$http[method](`contacts${id}`, {
        name: this.contact.name,
        phone: this.contact.phone,
        email: this.contact.email
      })
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.reset()
          this.$emit('atualizou')
        })
        .catch(showError)
    },
    reset(){
      this.$emit('cancel')
      this.$refs.form.resetValidation()
      this.isOpen = false
    },
    onLoad() {
      if (!this.isCreate) {
        this.contact = {
          id: this.selectedContact.id,
          name: this.selectedContact.name,
          phone: this.selectedContact.phone,
          email: this.selectedContact.email
        }
      } else {
        this.contact = {
          name: '',
          phone: '',
          email: ''
        }
      }
    }
  }
}
</script>

<style scoped>

</style>