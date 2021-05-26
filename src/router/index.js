import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Tree from '../views/Tree.vue'

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
  }
  /*
  ,{
    path: '/labo',
    name: 'Labo',
    components: {
      locCentral: Labo
    },
    children: [
      {
        path: 'slice',
        components: {
          locSubCentral: Slicer
        }
      },
      {
        path: 'mix',
        components: {
          locSubCentral: Mixer
        }
      }
    ]
  },
  {
    path: '/library',
    name: 'Library',
    components: {
      locCentral: Library
    },
    children: [
      {
        path: ':op',
        components: {
          locDown : Basket
        },
        props: {
          locDown: route => ({operation:route.params.op, name: route.query.name, code:route.query.code}),
        }
      }
    ]
  },*/

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router