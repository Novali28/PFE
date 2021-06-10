<template>
  <v-card>
    <h1>Enseignants :</h1>
    <v-slide-group
      v-model="model"
      style="margin:16px;"
      show-arrows
    >
      <v-slide-item
        v-for="n in enseignants.length"
        :key="n"
        v-slot="{ active, toggle }"
      >
        <v-card
          :color="active ? 'primary' : 'grey lighten-1'"
          height="75"
          width="150"
          style="margin:16px;padding:16px;"
          @click="toggle"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div style="width:150px;text-align:center">
              <h2>{{ enseignants[n-1].nom }}</h2>
              <h3>{{ enseignants[n-1].prenom }}</h3>
            </div>
          </v-row>
        </v-card>
      </v-slide-item>
      <v-card
          height="75"
          width="150"
          style="margin:16px;padding:16px;"
          @click="sheet = !sheet"
        >
        <v-icon
          style="padding:3px;padding-left:37px"
          color="#008000"
          x-large
        >mdi-plus</v-icon>
      </v-card>
    </v-slide-group>
    <v-expand-transition>
      <v-sheet
        style="margin:16px;"
        v-if="model != null"
        height="200"
        tile
      >
        <v-card
          class="mx-auto"
          max-width="344"
          align="center"
          justify="center"
        >
          <h2>
            {{ enseignants[model].nom }} {{ enseignants[model].prenom }}
          </h2>
          <p>
          {{ enseignants[model].email }}<br>
          Surnom : {{ enseignants[model].surnom }}<br>
          {{statuts.find(x => x.statut_id === enseignants[model].statut_id).nom}}
          </p>
          <v-btn
            color="primary"
            @click="deleteEnseignant"
          >
            <v-icon>
              mdi-delete
            </v-icon>
            Delete
          </v-btn><br><br>
        </v-card>
      </v-sheet>
    </v-expand-transition>
    <div class="text-center" id="page_formulaire">
      <v-bottom-sheet
        v-model="sheet"
        inset
      >
        <v-sheet
          align="center"
          height="400px"
          style="padding:16px;"
        >
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="nom"
              :counter="15"
              :rules="nameRules"
              label="Nom"
              required
            ></v-text-field>
            <v-text-field
              v-model="prenom"
              :counter="15"
              :rules="nameRules"
              label="Prénom"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-select
              v-model="select"
              :items="statuts"
              item-text="nom"
              item-value="statut_id"
              :rules="[v => !!v || 'Statut is required']"
              label="Statut"
              required
            ></v-select>
            <v-btn
              color="error"
              class="mr-4"
              @click="reset"
            >
              Reset Form
            </v-btn>
            <v-btn
              :disabled="!valid"
              color="green"
              class="mr-4"
              @click="createEnseignant"
            >
              Valider
            </v-btn>
          </v-form>
        </v-sheet>
      </v-bottom-sheet>
    </div>
  </v-card>
</template>

<script>
  export default {
    name: 'Intervenants',
    data: function() {
      return {
        valid: true,
        nom: '',
        prenom: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 15) || 'Name must be less than 15 characters',
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        statuts: [],
        select: null,
        model: null,
        sheet: false,
        enseignants: []
      }
    },
    created: function(){
      this.loadEnseignants();
      this.loadStatus();
    },
    methods: {
      loadEnseignants: function () {
        this.$http.get('http://localhost:3000/get-enseignants')
        .then((result) => {
          this.enseignants = result.data.data;
        })
      },
      loadStatus: function (){
        this.$http.get('http://localhost:3000/get-statuts')
        .then((result) => {
          this.statuts = result.data.data;
        })
      },
      createEnseignant: function () {
        this.$http.get('http://localhost:3000/save-enseignant?prenom='+this.prenom+'&nom='+this.nom+'&email='+this.email+'&statut='+this.select)
        this.reset();
        this.loadEnseignants();
        this.sheet = !this.sheet;
      },
      reset () {
        this.$refs.form.reset()
      },
      deleteEnseignant: function (){
        this.$http.get('http://localhost:3000/delete-enseignant?nom='+this.enseignants[this.model].nom)
        .then(() => {
          this.loadEnseignants();
          this.model = null;
        })
      }
    }
  }
</script>

<style>
</style>