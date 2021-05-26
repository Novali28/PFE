import Vue from 'vue'
import Vuex from 'vuex'
import {viruses} from '@/model'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    viruses: viruses,
    samples: [],
    parts: [],
    basket: []
  },
  mutations: {
    receiveVirus(state) {
      console.log(state.basket)
      state.basket.forEach(v => state.samples.push(v));
      state.basket.splice(0,state.basket.length);
    },
    addBasket(state,v){
      state.basket.push(v);
    },
    sendToLibrary(state,v){
      state.viruses.push(v)
    }
  },
  actions: {
  },
  modules: {
  }
})
