import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '@/components/dashboard/Dashboard'
import Events from '@/components/events/Events'
import Weather from '@/components/weather/Weather'
import CityMap from '@/components/map/CityMap'
import Contacts from '@/components/contacts/Contacts'
import News from '@/components/news/News'

Vue.use(VueRouter)

const routes = [{
  name: 'dashboard',
  path: '/',
  component: Dashboard
}, {
  name: 'events',
  path: '/events',
  component: Events
}, {
  name: 'weather',
  path: '/weather',
  component: Weather
}, {
  name: 'map',
  path: '/map',
  component: CityMap
}, {
  name: 'contacts',
  path: '/contacts',
  component: Contacts
}, {
  name: 'news',
  path: '/news',
  component: News
}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router