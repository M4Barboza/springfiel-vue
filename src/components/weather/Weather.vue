<template>
  <div class="weather-content">
    <h1>{{ message }}</h1> 
    <div class="cards">
      <div class="today-card">
        <div class="today-info">
          <h2>Springfield</h2>
          <div class="daily">
            <img
              :src="require(`@/assets/weather-elements/${todayWeather.weather}.svg`)"
              width="220px"
              alt="Icon Weather"
            />
            <p>{{ todayWeather.temperature }}ºC</p>
          </div>
          <p>{{ todayWeather.weather }}</p>
        </div>
        <div class="today-details">
          <div class="humity">
            <img width="64" src="@/assets/weather-elements/humity.png" alt />
            62%
          </div>
          <div class="wind">
            <img width="64" src="@/assets/weather-elements/wind.png" alt />
            {{ todayWeather.wind_sppeed }} km/h
          </div>
        </div>
      </div>
      <div class="next-days d-none d-md-flex">
        <template v-for="w in weathers">
          <div class="day" :key="w.id">
            <p>{{ Intl.DateTimeFormat('pt-BR', { weekday: 'long'}).format(new Date(w.date)) }}</p>
            <img
                :src="require(`@/assets/weather-elements/${w.weather}.svg`)"
                width="100px"
                alt="Icon Weather"
            />
            <p>{{ w.weather }}</p>
            <p>{{ w.temperature }}ºC</p>  
          </div>
        </template>
      </div>
      <v-carousel
        height="273px"
        hide-delimiter-background
        hide-delimiters
        light
        class="carousel-next-days d-md-none"
      >
      <template v-slot:prev="{ on, attrs }">
        <v-btn
        color="white"
          height="36px"
          width="36px"
          min-width="36px"
          v-bind="attrs"
          v-on="on"
          class="rounded-circle"
        >
          <v-icon size="36px">mdi-chevron-left</v-icon>
        </v-btn>
      </template>
      <template v-slot:next="{ on, attrs }">
        <v-btn
        color="white"
          height="36px"
          width="36px"
          min-width="36px"
          v-bind="attrs"
          v-on="on"
          class="rounded-circle"
        >
          <v-icon size="36px">mdi-chevron-right</v-icon>
        </v-btn>
      </template>
        <v-carousel-item
          v-for="w in weathers"
          :key="w.id"
        >
          <v-sheet class="day" height="100%">
            <p>{{ Intl.DateTimeFormat('pt-BR', { weekday: 'long'}).format(new Date(w.date)) }}</p>
            <img
                :src="require(`@/assets/weather-elements/${w.weather}.svg`)"
                width="100px"
                alt="Icon Weather"
            />
            <p>{{ w.weather }}</p>
            <p>{{ w.temperature }}ºC</p>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Weather',
  data() {
    return {
      todayWeather: {
        weather: 'Limpo'
      },
      weathers: [],
      message: null
    }
  },
  methods: {
    loadWeather() {
      this.$http.get('weather').then(res => {
        this.message = res.data.message
        this.todayWeather = res.data.data[0]
        this.weathers = res.data.data.slice(1)
      })
    }
  },
  mounted() {
    this.loadWeather()
  }
};
</script>

<style scoped>
.weather-content {
  font-family: 'simpson';
  min-height: 100vh;
  background-image: url("@/assets/images/sky-simpsons.jpg");
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 56px;
}

h1{
  color: #f8db27;
  font-size: 96px;
  text-align: center;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #000;
}

.cards {
  display: flex;
  width: 60vw;
  margin: 20px 0;
  flex-direction: column;
  align-items: center;
}

.today-card{
  display: flex;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.daily {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 70px;
}

.today-info{
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 2rem;
}

.today-info > p {
  font-size: 3rem;
}

.today-details{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1.75rem;
}

.humity, .wind{
  display: flex;
  align-items: center;
}

.humity img, .wind img{
  margin-right: 10px;
}

.humity{
  margin-bottom: 10px;
}

.next-days{
  display: flex;
  margin-top: 30px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  overflow: auto;
  justify-content: space-around;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.carousel-next-days {
  margin-top: 30px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.day{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  padding: 0 50px; 
}

.day p {
  white-space: nowrap;
}

@media (max-width: 1550px) {
  .next-days{
    justify-content: flex-start;
  }
}
</style>