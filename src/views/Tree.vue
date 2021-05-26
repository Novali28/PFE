<template>
  <v-card>
    <v-card-title>
      <h1>Arbre</h1>
    </v-card-title>
    <v-row class="pa-4" justify="space-between">
      <v-col cols="5">
        <v-treeview
          :active.sync="active"
          :items="items"
          activatable
          color="warning"
          transition
        >
        </v-treeview>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col class="d-flex text-center">
        <v-scroll-y-transition mode="out-in">
          <div v-if="!selected" class="title grey--text text--lighten-1 font-weight-light" style="align-self: center;">
            Selectionner un élément pour voir ses caractéristiques
          </div>

          <v-card v-else :key="selected.id" class="pt-6 mx-auto" flat max-width="300">
            <v-row class="text-left" tag="v-card-text">
              <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                Nom:
              </v-col>
              <v-col>{{ selected.name }}</v-col>
            </v-row>
          </v-card>
        </v-scroll-y-transition>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

  export default {
    name: 'Tree',
    computed: {
      selected () {
        if (this.active.length !== 1) return undefined
        const id = this.active[0]
        return this.find(this.items,id)
      },
    },
    methods: {
      findItem(element, id) {
        console.log(element.id)
        if(element.id == id) return element;
        
        else if (element.children != null){
          var i;
          var result = null;
          for(i=0; result == null && i < element.children.length; i++){
               result = this.findItem(element.children[i], id);
          }
          return result;
        }
        else if (element.length != null){
            var j;
          var result2 = null;
          for(j=0; result == null && j < element.length; j++){
               result2 = this.findItem(element[j], id);
          }
          return result2;
        }
        return null;
      }
    },
    data: () => ({
      active: [],
      items: [
        {
          id: 1,
          name: 'Applications :',
          children: [
            { id: 2, name: 'Calendar : app' },
            { id: 3, name: 'Chrome : app' },
            { id: 4, name: 'Webstorm : app' },
          ],
        },
        {
          id: 5,
          name: 'Documents :',
          children: [
            {
              id: 6,
              name: 'vuetify :',
              children: [
                {
                  id: 7,
                  name: 'src :',
                  children: [
                    { id: 8, name: 'index : ts' },
                    { id: 9, name: 'bootstrap : ts' },
                  ],
                },
              ],
            },
            {
              id: 10,
              name: 'material2 :',
              children: [
                {
                  id: 11,
                  name: 'src :',
                  children: [
                    { id: 12, name: 'v-btn : ts' },
                    { id: 13, name: 'v-card : ts' },
                    { id: 14, name: 'v-window : ts' },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 15,
          name: 'Downloads :',
          children: [
            { id: 16, name: 'October : pdf' },
            { id: 17, name: 'November : pdf' },
            { id: 18, name: 'Tutorial : html' },
          ],
        },
        {
          id: 19,
          name: 'Videos :',
          children: [
            {
              id: 20,
              name: 'Tutorials :',
              children: [
                { id: 21, name: 'Basic layouts : mp4' },
                { id: 22, name: 'Advanced techniques : mp4' },
                { id: 23, name: 'All about app : dir' },
              ],
            },
            { id: 24, name: 'Intro : mov' },
            { id: 25, name: 'Conference introduction : avi' },
          ],
        },
      ],
    }),
  }
</script>