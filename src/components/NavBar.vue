<template>
  <v-card class="overflow-hidden">
    <v-app-bar absolute color="#98C55B">

      <v-toolbar-title>Gestion des services d’enseignement</v-toolbar-title>

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab block v-for="(t,index) in titles" :key="index" :style="{color : t.color}" @click="$router.push({path:t.path})">{{t.text}}</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-sheet class="overflow-y-auto" max-height="600">
      <v-container style="height: 113px;"></v-container>
    </v-sheet>

  </v-card>
</template>


<script>
  export default {
    name: 'NavBar',
    props: ['titles']
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
