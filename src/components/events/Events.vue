<template>
  <v-main>
    <h1 class="events-title">{{ message }}</h1>
    <v-sheet height="64">
      <v-toolbar color="#FF81C1" flat class="white--text">
        <v-btn outlined class="mr-4 d-none d-sm-flex" color="white" @click="selectedDay = today">
          Today
        </v-btn>
        <v-btn fab text small color="white" @click="$refs.calendar.prev()">
          <v-icon small> mdi-chevron-left </v-icon>
        </v-btn>
        <v-btn fab text small color="white" @click="$refs.calendar.next()">
          <v-icon small> mdi-chevron-right </v-icon>
        </v-btn>
        <v-toolbar-title v-if="$refs.calendar" class="calendar-title">
          {{ $refs.calendar.title }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-select
          v-model="type"
          :items="types"
          item-text="text"
          item-value="value"
          dense
          outlined
          hide-details
          label="tipos"
          background-color="#FFADD6"
        ></v-select>
      </v-toolbar>
    </v-sheet>
    
    <v-sheet height="600" width="calc(100vw - 57px)">
      <template>
        <v-btn
          fab
          color="#87D4FE"
          bottom
          right
          fixed
          @click="createEvent"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      
      <v-calendar
        ref="calendar"
        v-model="selectedDay"
        :type="type"
        :events="events"
        color="#87D4FE"
        @click:event="showEvent"
        class="pt-5"
        locale="pt-BR"
      ></v-calendar>
      
    </v-sheet>

    <event-menu 
    v-model="selectedOpen"
    :selectedEvent="selectedEvent"
    :selectedElement="selectedElement" 
    @excluiu="loadEvents"
    @edit="newEvent = true"
    />

    <event-dialog 
    v-model="newEvent"
    :selectedEvent="selectedEvent"
    :isCreate="isCreate"
    @cancel="isCreate = false"
    @atualizou="loadEvents"
    />

  </v-main>
</template>

<script>
import EventMenu from './EventMenu';
import EventDialog from './EventDialog';
import moment from 'moment';

export default {
  name: 'Events',
  components: { EventMenu, EventDialog },
  data() {
    return {
      selectedDay: moment().format('YYYY-MM-DDTHH:mm'),
      type: 'month',
      types: [
        { text: 'Mês', value: 'month' }, 
        { text: 'Semana', value: 'week' }, 
        { text: 'Dia', value: 'day' }, 
        { text: '4dias', value: '4day' }
      ],
      events: [],
      selectedEvent: {
        name: '', 
        details: '', 
        start: moment().format('YYYY-MM-DDTHH:mm'),
        banner: null,
        color: '',
        id: ''
      },
      selectedElement: null,
      selectedOpen: false,
      colors: ['blue', 'red', 'amber', 'green', 'purple', 'orange', 'pink', 'indigo', 'cyan', 'grey'],
      message: null,
      newEvent: false,
      isCreate: false
    };
  },
  methods: {
    loadEvents() {
      this.$http.get('events').then(res => {
        this.message = res.data.message
        this.events = res.data.data.map(event => {
          const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
          const localdatetime = moment(event.date).format('YYYY-MM-DDTHH:mm')

          return {
            name: event.title,
            details: event.description,
            start: localdatetime,
            banner: event.banner,
            color: randomColor,
            id: event.id
          }
        })

        if (this.selectedEvent.id) {
          const updatedEvent = this.events.find(e => e.id === this.selectedEvent.id);

          if (!updatedEvent){
            Object.assign(this.$data.selectedEvent, this.$options.data().selectedEvent)
          } else {
            this.selectedEvent = updatedEvent
          }
        }
      })
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    createEvent() {
      this.newEvent = true
      this.isCreate = true
    }
  },
  mounted() {
    this.loadEvents()
  }
};
</script>

<style scoped>
main {
  min-height: 100vh;
  align-items: center;
  background-color: #87D4FE;
}

.calendar-title{
  text-transform: capitalize;
}

.events-title{
  text-align: center;
  font-family: 'simpson';
  font-size: 96px;
  color: #FF81C1;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #000;
}

.v-input {
  max-width: 150px;
}
</style>