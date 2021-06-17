import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Tree from '../views/Tree.vue'
import Enseignants from '../views/Enseignants.vue'
import Projets from '../views/Projets.vue'

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
    path: '/enseignants',
    name: 'Enseignants',
    components: {
      locCentral: Enseignants
    }
  },
  {
    path: '/projets',
    name: 'Projets',
    components: {
      locCentral: Projets
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router