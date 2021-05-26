<template>
  <div id="app">
    <NavBar :titles="titles" />
    <br><br>
    <keep-alive>
    <router-view name="locCentral"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import NavBar from './components/NavBar.vue'

  export default {
    name: 'App',
    data : () => {
      return {
        titles : [ { text: "Home", color:"black", path:"/home"}, { text: "Arbre", color:"black", path:"/tree"} ],
        currentMenu : 0,
      }
    },
    components: {
      NavBar,
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
  }
  h1{
    color: #91C251;
    text-align: center;
  }
  p{
    text-align: center;
  }
</style>
