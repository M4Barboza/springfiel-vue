<template>
  <v-dialog
        v-model="isOpen"
        max-width="500px"
      >
        <v-card>
            <v-img
            height="200"
            :src="require(`@/assets/images/images-map/${locals[local].image}`)"
            ></v-img>
            <v-card-title>{{locals[local].title}}</v-card-title>
            <v-card-text>
                <v-row 
                    align="center"
                    class="mx-0 mb-4"
                >
                    <v-rating
                    :value="locals[local].rating"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                    ></v-rating>
                    <div class="grey--text ms-4">{{locals[local].rating}}</div>
                </v-row>
                <v-row align="center" class="mx-0 mb-2 break-line">
                    <v-icon color="pink">mdi-map-marker-outline</v-icon>
                    <span class="ml-2">{{locals[local].address}}</span>
                </v-row>
                <v-row align="center" class="mx-0 mb-2">
                    <v-icon color="pink">mdi-phone-outline</v-icon>
                    <span class="ml-2">{{locals[local].phone}}</span>
                </v-row>
                <v-row align="center" class="mx-0">
                    <v-icon color="pink">mdi-clock-outline</v-icon>
                    <span class="ml-2">{{locals[local].open}}</span>
                </v-row>
               
            </v-card-text>
            <v-divider class="mx-4 mt-1"></v-divider>
            <v-card-title>Descrição</v-card-title>
            <v-card-text>
                <div>{{locals[local].description}}</div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="pink"
                    text
                    @click="isOpen = false"
                >
                    Fechar
                </v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>
import locals from '@/data/locals'
export default {
    name: 'LocalDialog',
    props:['value', 'local'],
    data(){
        return {
            locals: {}
        }
    },

    computed:{
         isOpen : {
            get() {
                return this.value
            },
            set(val){
                this.$emit('input', val)
            }
        }
    },

    created(){
        this.locals = locals.locals   
    },
}
</script>

<style scoped>
    .break-line{
        flex-wrap: nowrap;
    }
</style>