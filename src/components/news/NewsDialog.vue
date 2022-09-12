<template>
  <v-row justify="center">
    <v-dialog
      v-model="isOpen"
      max-width="600px"
      persistent
    >

      <v-card>
        <v-card-title>
          <span class="text-h5">{{ isCreate ? 'Criar Nova' : 'Editar' }} Notícia</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form
            ref="form"
            lazy-validation
            >
              <v-text-field
                  v-model="news.title"
                  label="Nome da Notícia*"
                  required
                  :validate-on-blur="true"
                  :rules="[v => !!v || 'Nome é obrigatório!']"
                  prepend-icon="mdi-format-title"
                  outlined
              ></v-text-field>
              <v-textarea
                  v-model="news.description"
                  label="Descrição da Notícia*"
                  required
                  :validate-on-blur="true"
                  :rules="[v => !!v || 'Descrição é obrigatório!']"
                  prepend-icon="mdi-format-text"
                  outlined
                  no-resize
              ></v-textarea>
              <v-text-field
                  v-model="news.author"
                  label="Nome do Autor*"
                  required
                  :validate-on-blur="true"
                  :rules="[v => !!v || 'Nome do Autor é obrigatório!']"
                  prepend-icon="mdi-format-title"
                  outlined
              ></v-text-field>
              <v-text-field
                v-model="news.date"
                type="date"
                :validate-on-blur="true"
                prepend-icon="mdi-format-calendar"
                :rules="[
                v => !!v || 'Data é obrigatório!']"
                outlined
              ></v-text-field>
              <v-file-input
              v-model="image"
              accept="image/*"
              label="Banner da Notícia*"
              prepend-icon="mdi-camera"
              @change="showPreview"
              @click:clear="() => { news.banner = null; hasImage = false }"
              outlined
              ></v-file-input>
              <v-img :src="news.banner" v-if="hasImage"></v-img>
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
  name: 'NewsDialog',
  props:['value', 'selectedNews', 'isCreate'],
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
      news: {},
      image: null,
      hasImage: false,
    }
  },
  methods: {
    save() {
      if(!this.$refs.form.validate()){
        this.$toasted.global.defaultError({msg: 'Erro de validação'})
        return
      } 

      const method = this.news.id ? 'put' : 'post'
      const id = this.news.id ? `/${this.news.id}` : ''

      this.$http[method](`news${id}`, {
        title: this.news.title,
        description: this.news.description,
        banner: this.news.banner,
        author: this.news.author,
        date: `${this.news.date}T03:00:00.000Z`
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
    onLoad() {
      if (!this.isCreate) {
        this.news = {
          id: this.selectedNews.id,
          title: this.selectedNews.title,
          description: this.selectedNews.description,
          banner: this.selectedNews.banner,
          author: this.selectedNews.author,
          date: moment(this.selectedNews.date).format('YYYY-MM-DD'),
        }
        this.hasImage = true;

      } else {
        this.news = {
          title: '',
          description: '',
          banner: '',
          author: '',
          date: ''
        }
        this.hasImage = false

      }
    },
    showPreview(){
        if(!this.image){
          return
        }
        const reader = new FileReader()
        reader.readAsDataURL(this.image)
        reader.onload = () => {
           this.news.banner = reader.result
           this.hasImage = true
        }
      }
  }
}
</script>

<style scoped>

</style>