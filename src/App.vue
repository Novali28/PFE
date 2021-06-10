<template>
  <div id="app">
    <v-app>
      <NavBar :titles="titles" /><br><br>
      <keep-alive>
      <router-view name="locCentral"></router-view>
      </keep-alive>
      <Footer></Footer>
    </v-app>
  </div>
</template>

<script>
  import NavBar from './components/NavBar.vue'
  import Footer from './components/Footer.vue'
  
  export default {
    name: 'App',
    data : () => {
      return {
        titles : [ { text: "Home", color:"black", path:"/home"}, { text: "Arbre", color:"black", path:"/tree"}, { text: "Intervenants", color:"black", path:"/intervenants"}, { text: "Projets", color:"black", path:"/projets"} ],
        currentMenu : 0
      }
    },
    components: {
      NavBar,
      Footer,
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #000000;
    margin-top: 0px;
    padding-bottom:20px;
  }
  h1{
    color: #91C251;
    text-align: center;
  }
  p{
    text-align: center;
  }
</style>
