import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Tree from '../views/Tree.vue'
import Intervenants from '../views/Intervenants.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    components: {
      locCentral: Home
    }
  },
  {
    path: '/tree',
    name: 'Tree',
    components: {
      locCentral: Tree
    }
  },
  {
    path: '/intervenants',
    name: 'Intervenants',
    components: {
      locCentral: Intervenants
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router