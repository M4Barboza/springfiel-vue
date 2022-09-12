<template>
  <v-row justify="center">
    <v-dialog
      v-model="isOpen"
      max-width="600px"
      persistent
    >

      <v-card>
        <v-card-title>
          <span class="text-h5">{{ isCreate ? 'Criar Novo' : 'Editar' }} Evento</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form
            ref="form"
            lazy-validation
            >
              <v-text-field
                  v-model="event.title"
                  label="Título do Evento*"
                  required
                  :validate-on-blur="true"
                  :rules="[v => !!v || 'Título é obrigatório!']"
                  prepend-icon="mdi-format-title"
                  outlined
              ></v-text-field>
              <v-textarea
                  v-model="event.description"
                  label="Descrição do Evento*"
                  required
                  :validate-on-blur="true"
                  :rules="[v => !!v || 'Descrição é obrigatório!']"
                  prepend-icon="mdi-comment-text"
                  no-resize
                  outlined
              ></v-textarea>
              <v-text-field
                v-model="event.date"
                type="datetime-local"
                :validate-on-blur="true"
                prepend-icon="mdi-format-title"
                :rules="[
                v => !!v || 'Data é obrigatório!',
                v =>  !invalidDate(v) || 'Precisa ser uma data futura']"
                outlined
              ></v-text-field>
              <v-file-input
              v-model="image"
              accept="image/*"
              label="Banner do Evento*"
              prepend-icon="mdi-camera"
              @change="showPreview"
              @click:clear="() => { event.banner = null; hasImage = false }"
              outlined
              ></v-file-input>
              <v-img :src="event.banner" v-if="hasImage"></v-img>
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
import moment from 'moment';

export default {
    name: "CreateEventDialog",
    props:['value', 'selectedEvent', 'isCreate'],
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
    data: function(){
        return {
          event: {},
          image:null,
          hasImage: false
        }
    },
    methods:{
      save(){
        if(!this.$refs.form.validate()){
          this.$toasted.global.defaultError({msg: 'Erro de validação'})
          return
        } 

        const method = this.event.id ? 'put' : 'post'
        const id = this.event.id ? `/${this.event.id}` : ''

        this.$http[method](`events${id}`, {
          title: this.event.title,
          description: this.event.description,
          date: new Date(this.event.date).toISOString(),
          banner: this.event.banner
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
        this.image = null
      },
      showPreview(){
        if(!this.image){
          return
        }
        const reader = new FileReader()
        reader.readAsDataURL(this.image)
        reader.onload = () => {
           this.event.banner = reader.result
           this.hasImage = true
        }
      },
      onLoad() {
        if (!this.isCreate) {
          this.event = {
            id: this.selectedEvent.id,
            title: this.selectedEvent.name,
            description: this.selectedEvent.details,
            date: this.selectedEvent.start,
            banner: this.selectedEvent.banner
          }

          this.hasImage = true
        } else {
          this.event = {
            title: '',
            description: '',
            date: moment().format('YYYY-MM-DDTHH:mm'),
            banner: null
          }

          this.hasImage = false
        }
      },
      invalidDate(v){
        const pickedDate = moment(v)
        const now = moment().seconds(0).milliseconds(0)
        if(pickedDate < now) {
          return true
        }
        return false
      }
    }
}    
</script>

<style>

</style>