<template>
    <v-main class="pb-6">
        <h1 class="news-title">{{ message }}</h1>
            <v-container class="container">
                <v-card class="d-flex flex-column flex-sm-row mb-4" elevation="10"
                    v-for="item in news" :key="item.id">
                    <div class="d-flex p-0 pt-sm-6 px-sm-3">
                        <v-img class="elevation-5 rounded-sm" :src="item.banner" height="150px" width="150px"></v-img>
                    </div>
                    <v-divider class="my-4 d-none d-sm-block" vertical></v-divider>
                    <div class="card-content">
                        <v-card-title>{{ item.title }}</v-card-title>
                        <v-card-text>{{ item.description }}</v-card-text>
                        <div class="d-flex align-center">
                            <v-card-subtitle class="grey--text text--darken-1">
                                {{ item.author }}
                                <br>
                                {{ new Date(item.date).toLocaleDateString() }}
                            </v-card-subtitle>
                            <v-spacer></v-spacer>
                            <v-card-actions class="pr-6">
                                <v-icon 
                                v-ripple
                                class="warning pa-2 mr-2 rounded-lg elevation-3 icon" 
                                color="white"
                                @click="() => {openDialog = true; selectedNews = item}"
                                >
                                mdi-pencil
                                </v-icon>
                                <v-icon 
                                v-ripple
                                class="error pa-2 rounded-lg elevation-3 icon"
                                color="white"
                                @click="() => { confirmDelete = true; selectedNews = item}"
                                >
                                mdi-delete
                                </v-icon>
                            </v-card-actions>
                        </div>
                    </div>
                </v-card>
            </v-container>
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
            <v-dialog 
            v-model="confirmDelete"
            max-width="290" 
            :retain-focus="false"
            >
                <v-card>
                    <v-card-title class="text-h5">
                        Deseja mesmo excluir esse notícia ?
                    </v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="gray darken-1" text @click="confirmDelete = false">
                        Cancelar
                        </v-btn>
                        <v-btn color="red darken-1" text @click="deleteNews">
                        Confirmar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <news-dialog
                v-model="openDialog"
                :selectedNews="selectedNews"
                :isCreate="isCreate"
                @cancel="isCreate = false"
                @atualizou="loadNews"
            />
            

    </v-main>
</template>

<script>
import { showError } from '@/config/error'
import NewsDialog from './NewsDialog'

export default {
    name: 'News',
    components: {NewsDialog},
    data(){
        return{
            news:[],
            message:'',
            isCreate: false,
            openDialog: false,
            confirmDelete: false,
            selectedNews:{
                id:null,
                title:'',
                description:'',
                banner:'',
                author:'',
                date:null
            },
        }
    },
    methods:{
        loadNews() {
            this.$http.get('news').then(res => {
                this.message = res.data.message
                this.news = res.data.data
            })
        },
        deleteNews() {
            if(!this.selectedNews.id){
                return
            }
            this.$http.delete(`news/${this.selectedNews.id}`)
                .then(() => {
                this.confirmDelete = false
                this.$toasted.global.defaultSuccess()
                this.loadNews()
                }) .catch(showError)
        }
    },
    mounted(){
        this.loadNews()
    }
}
</script>
<style scoped>
    main{
        background-image: url('@/assets/images/news-background.png');
        background-size: contain;
        background-repeat: repeat-y;
    }

    .news-title{
        text-align: center;
        font-family: 'simpson';
        font-size: 96px;
        color: #FF81C1;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: #000;
    }

    @media(max-width: 760px){
        .news-title{
            font-size: 4.5rem;
        }
    }

    .container{
        max-width: 600px;
    } 

    .card-content{
        width: 100%;
        min-height: 200px;
    }

</style>