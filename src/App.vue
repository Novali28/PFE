<template>
  <v-app>
    <NavBar :titles="titles" /><br><br>
    <div id="main">
      <keep-alive>
        <router-view name="locCentral"></router-view>
      </keep-alive>
    </div>
    <Footer></Footer>
  </v-app>
</template>

<script>
  import NavBar from './components/NavBar.vue'
  import Footer from './components/Footer.vue'
  
  export default {
    name: 'App',
    data : () => {
      return {
        titles : [ { text: "Home", color:"black", path:"/home"}, { text: "Enseignants", color:"black", path:"/enseignants"}, { text: "Projets", color:"black", path:"/projets"},{ text: "Décomposition", color:"black", path:"/tree"} ],
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
  }
  h1{
    color: #91C251;
    text-align: center;
  }
  p{
    text-align: center;
  }
  #main{
    padding-bottom: 80px;
  }
</style>
