<template>
  <v-card>
    <h1>Enseignants</h1>

    <!--- Cartes des enseignants -->

    <v-slide-group v-model="enseignant" style="margin:16px;" show-arrows >
      <v-slide-item v-for="n in enseignants.length" :key="n" v-slot="{ active, toggle }" >
        <v-card :color="active ? 'primary' : 'grey lighten-1'" height="125" width="200" style="margin:16px;padding:16px;" @click="toggle">
          <v-row class="fill-height" align="center" justify="center" >
            <div style="width:150px;text-align:center">
              <h2>{{ enseignants[n-1].nom }}</h2>
              <h3>{{ enseignants[n-1].prenom }}</h3>
            </div>
          </v-row>
        </v-card>
      </v-slide-item>

      <v-card height="125" width="200" style="margin:16px;padding:16px;" @click="formulaire = !formulaire" >
        <v-icon style="padding-top:23px;padding-left:62px" color="#008000" x-large >mdi-plus</v-icon>
      </v-card>
    </v-slide-group>

    <!--- Détails sur les enseignants -->
    <v-expand-transition>
      <v-sheet style="margin:16px;" v-if="enseignant != null" height="200px" tile>
        <v-card class="mx-auto" max-width="344" align="center" justify="center">
          <h2>
            {{ enseignants[enseignant].nom }} {{ enseignants[enseignant].prenom }}
          </h2>
          <p>
            {{ enseignants[enseignant].email }}<br>
            Surnom : {{ enseignants[enseignant].surnom }}<br>
            {{statuts.find(x => x.statut_id === enseignants[enseignant].statut_id).nom}}
          </p>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="green" @click="startUpdateEnseignants" v-bind="attrs" v-on="on">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Modifier</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="blue" @click="duplicateEnseignant" v-bind="attrs" v-on="on">
                <v-icon>mdi-content-duplicate</v-icon>
              </v-btn>
            </template>
            <span>Dupliquer</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="red" @click="dialog=!dialog" v-bind="attrs" v-on="on">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Supprimer</span>
          </v-tooltip>
          <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
              <v-card-title class="text-h5">
                Supprimer
              </v-card-title>
              <v-card-text>Voulez vous vraiment supprimer l'enseignant {{ enseignants[enseignant].nom }} ?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false">
                  Annuler
                </v-btn>
                <v-btn color="green darken-1" text @click="deleteEnseignant">
                  Supprimer
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <br><br>
        </v-card>
      </v-sheet>
    </v-expand-transition>

    <!--- Dialogues pour créer ou modifier un enseignant -->

    <div>
      <v-dialog v-if="!updateEnseignant" v-model="formulaire" inset width="500px">
        <v-sheet align="center" height="500px" style="padding:16px;">
          <v-form ref="form" v-model="valid" lazy-validation >
            <v-card-title class="text-h5">
              Ajouter un enseignant
            </v-card-title>
            <v-text-field v-model="nom" :counter="30" :rules="nameRules" label="Nom" required></v-text-field>
            <v-text-field v-model="prenom" :counter="30" :rules="nameRules" label="Prénom" required></v-text-field>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
            <v-select v-model="selected_statut" :items="statuts" item-text="nom" item-value="statut_id" :rules="[v => !!v || 'Statut is required']" label="Statut" required></v-select>
            
            <v-btn color="error" class="mr-4" @click="reset">
              Réinitialiser
            </v-btn>
            <v-btn :disabled="!valid" color="green" class="mr-4" @click="createEnseignant">
              Valider
            </v-btn>
          </v-form>
        </v-sheet>
      </v-dialog>
      <v-dialog v-else v-model="formulaire" inset persistent width="500px">
        <v-sheet align="center" height="500px" style="padding:16px;">
          <v-card-title class="text-h5">
            Modifier un enseignant
          </v-card-title>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="nom" :counter="30" :rules="nameRules" label="Nom" required></v-text-field>
            <v-text-field v-model="prenom" :counter="30" :rules="nameRules" label="Prénom" required></v-text-field>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
            <v-select v-model="selected_statut" :items="statuts" item-text="nom" item-value="statut_id" :rules="[v => !!v || 'Statut is required']" label="Statut" required></v-select>
            
            <v-btn color="error" class="mr-4" @click="reset">
              Réinitialiser
            </v-btn>
            <v-btn :disabled="!valid" color="green" class="mr-4" @click="updateEnseignant">
              Modifier
            </v-btn><br>
            <v-btn class="mt-6" text color="error" @click="cancelUpdate">
              Annuler
            </v-btn>
          </v-form>
        </v-sheet>
      </v-dialog>
    </div>



    <div id="statuts">
      <h1>Statuts</h1>

      <!--- Cartes des statuts -->

      <v-slide-group v-model="statut" style="margin:16px;" show-arrows >
        <v-slide-item v-for="n in statuts.length" :key="n" v-slot="{ active, toggle }" >
            <v-card :color="active ? 'primary' : 'grey lighten-1'" height="125" width="200" style="margin:16px;padding:16px;" @click="toggle">
              <v-row class="fill-height" align="center" justify="center" >
                  <div style="width:150px;text-align:center">
                  <h2>{{ statuts[n-1].nom }}</h2>
                  </div>
              </v-row>
            </v-card>
        </v-slide-item>

        <v-card height="125" width="200" style="margin:16px;padding:16px;" @click="formulaire_statut = !formulaire_statut" >
          <v-icon style="padding-top:23px;padding-left:62px" color="#008000" x-large >mdi-plus</v-icon>
        </v-card>
      </v-slide-group>

      <!--- Détails sur les statuts -->
      
      <v-expand-transition>
        <v-sheet style="margin:16px;" v-if="statut != null" height="200px" tile>
          <v-card class="mx-auto" max-width="344" align="center" justify="center">
            <h2>
              {{ statuts[statut].nom }}
            </h2>
            <p>
              Surnom : {{ statuts[statut].surnom }}<br>
              Quantités d'heures : {{ statuts[statut].qtte_heures }}<br>
              Quantités d'heures sup : {{ statuts[statut].qtte_heures_sup }}
            </p>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="green" @click="startUpdateStatut" v-bind="attrs" v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Modifier</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="blue" @click="duplicateStatut" v-bind="attrs" v-on="on">
                  <v-icon>mdi-content-duplicate</v-icon>
                </v-btn>
              </template>
              <span>Dupliquer</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="red" @click="dialog_stat=!dialog_stat" v-bind="attrs" v-on="on">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Supprimer</span>
            </v-tooltip>
            <v-dialog v-model="dialog_stat" persistent max-width="290">
              <v-card>
                <v-card-title class="text-h5">
                  Supprimer
                </v-card-title>
                <v-card-text>Voulez vous vraiment supprimer le statut {{ statuts[statut].nom }} ?</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog_stat = false">
                    Annuler
                  </v-btn>
                  <v-btn color="green darken-1" text @click="deleteStatut">
                    Supprimer
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog><br><br>
          </v-card>
        </v-sheet>
      </v-expand-transition>

      <!--- Dialogues pour modifier ou créer un statut -->

      <div>
        <v-dialog v-if="!updateStatut" v-model="formulaire_statut" inset width="500px">
          <v-sheet align="center" height="500px" style="padding:16px;">
            <v-form ref="form" v-model="valid_statut" lazy-validation >
              <v-card-title class="text-h5">
                Ajouter un statut
              </v-card-title>
              <v-text-field v-model="nom_statut" :counter="30" :rules="nameRules" label="Nom" required></v-text-field>
              <v-text-field v-model="surnom" :counter="30" :rules="nameRules" label="Surnom" required></v-text-field>
              <v-text-field v-model="qtte_heures" label="Quantité heures" required></v-text-field>
              <v-text-field v-model="qtte_heures_sup" label="Quantité heures sup" required></v-text-field>
              <v-btn color="error" class="mr-4" @click="reset">
                Réinitialiser
              </v-btn>
              <v-btn :disabled="!valid_statut" color="green" class="mr-4" @click="createStatut">
                Valider
              </v-btn>
            </v-form>
          </v-sheet>
        </v-dialog>
        <v-dialog v-else v-model="formulaire_statut" inset persistent width="500px">
          <v-sheet align="center" height="500px" style="padding:16px;">
            <v-card-title class="text-h5">
              Modifier un statut
            </v-card-title>
            <v-form ref="form" v-model="valid_statut" lazy-validation>
              <v-text-field v-model="nom_statut" :counter="30" :rules="nameRules" label="Nom" required></v-text-field>
              <v-text-field v-model="surnom" :counter="30" :rules="nameRules" label="Surnom" required></v-text-field>
              <v-text-field v-model="qtte_heures" label="Quantité heures" required></v-text-field>
              <v-text-field v-model="qtte_heures_sup" label="Quantité heures sup" required></v-text-field>
              <v-btn color="error" class="mr-4" @click="reset">
                Réinitialiser
              </v-btn>
              <v-btn :disabled="!valid" color="green" class="mr-4" @click="updateStatuts">
                Modifier
              </v-btn><br>
              <v-btn class="mt-6" text color="error" @click="cancelUpdate">
                Annuler
              </v-btn>
            </v-form>
          </v-sheet>
        </v-dialog>
      </div>
    </div>
  </v-card>
</template>

<script>
  export default {
    name: 'Enseignants',
    data: function() {
      return {
        nom: '',
        prenom: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 30) || 'Name must be less than 30 characters',
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        nom_statut: '',
        surnom: '',
        qtte_heures: 0,
        qtte_heures_sup: 0,
        statuts: [],
        statut: null,
        enseignants: [],
        enseignant: null,
        selected_statut: null,
        formulaire: false,
        formulaire_statut: false,
        valid: true,
        valid_statut: true,
        dialog: false,
        dialog_stat: false,
        updateEnseignant: false,
        updateStatut: false,
      }
    },
    created: function(){
      this.loadEnseignants();
      this.loadStatuts();
    },
    methods: {
      loadEnseignants: function () {
        this.$http.get('http://localhost:3000/get-enseignants')
        .then((result) => {
          this.enseignants = result.data.data;
        })
      },
      loadStatuts: function (){
        this.$http.get('http://localhost:3000/get-statuts')
        .then((result) => {
          this.statuts = result.data.data;
        })
      },
      createEnseignant: function () {
        this.$http.get('http://localhost:3000/save-enseignant?prenom='+this.prenom+'&nom='+this.nom+'&email='+this.email+'&statut='+this.selected_statut)
        .then(() => {
          this.reset();
          this.loadEnseignants();
          this.formulaire = !this.formulaire;
        })
      },
      deleteEnseignant: function (){
        this.$http.get('http://localhost:3000/delete-enseignant?id='+this.enseignants[this.enseignant].enseignant_id)
        .then(() => {
          this.loadEnseignants();
          this.enseignant = null;
          this.dialog = false;
        })
      },
      duplicateEnseignant: function(){
        this.nom=this.enseignants[this.enseignant].nom
        this.prenom=this.enseignants[this.enseignant].prenom
        this.email=this.enseignants[this.enseignant].email
        this.selected_statut=this.enseignants[this.enseignant].statut_id
        this.$http.get('http://localhost:3000/save-enseignant?prenom='+this.prenom+'&nom='+this.nom+'&email='+this.email+'&statut='+this.selected_statut)
        .then(() => {
          this.loadEnseignants();
        })
      },
      startUpdateEnseignants: function (){
        this.nom=this.enseignants[this.enseignant].nom
        this.prenom=this.enseignants[this.enseignant].prenom
        this.email=this.enseignants[this.enseignant].email
        this.selected_statut=this.enseignants[this.enseignant].statut_id
        this.persistant="persistant"
        this.updateEnseignant=true
        this.formulaire=true
      },
      updateEnseignants: function(){
        this.$http.get('http://localhost:3000/update-enseignant?prenom='+this.prenom+'&nom='+this.nom+'&email='+this.email+'&statut='+this.selected_statut+'&id='+this.enseignants[this.enseignant].enseignant_id)
        .then(() => {
          this.cancelUpdate();
          this.loadEnseignants();
        })
      },
      reset () {
        this.$refs.form.reset()
      },
      cancelUpdate: function(){
        this.reset();
        this.updateEnseignant=false;
        this.updateStatut=false;
        this.formulaire=false;
        this.formulaire_statut=false;
      },
      createStatut: function(){
        this.$http.get('http://localhost:3000/save-statut?nom='+this.nom_statut+'&surnom='+this.surnom+'&qtth='+this.qtte_heures+'&qtthsup='+this.qtte_heures_sup)
        .then(() => {
          this.reset();
          this.loadStatuts();
          this.formulaire_statut = !this.formulaire_statut;
        })
      },
      deleteStatut: function(){
        this.$http.get('http://localhost:3000/delete-statut?id='+this.statuts[this.statut].statut_id)
        .then(() => {
          this.loadStatuts();
          this.statut = null;
          this.dialog_stat = false;
        })
      },
      duplicateStatut: function(){
        this.nom_statut=this.statuts[this.statut].nom
        this.surnom=this.statuts[this.statut].surnom
        this.qtte_heures=this.statuts[this.statut].qtte_heures
        this.qtte_heures_sup=this.statuts[this.statut].qtte_heures_sup
        this.$http.get('http://localhost:3000/save-statut?nom='+this.nom_statut+'&surnom='+this.surnom+'&qtth='+this.qtte_heures+'&qtthsup='+this.qtte_heures_sup)
        .then(() => {
          this.loadStatuts();
        })
      },
      startUpdateStatut: function(){
        this.nom_statut=this.statuts[this.statut].nom
        this.surnom=this.statuts[this.statut].surnom
        this.qtte_heures=this.statuts[this.statut].qtte_heures
        this.qtte_heures_sup=this.statuts[this.statut].qtte_heures_sup
        this.persistant="persistant"
        this.updateStatut=true
        this.formulaire_statut=true
      },
      updateStatuts: function(){
        this.$http.get('http://localhost:3000/update-statut?nom='+this.nom_statut+'&surnom='+this.surnom+'&qtth='+this.qtte_heures+'&qtth_sup='+this.qtte_heures_sup+'&id='+this.statuts[this.statut].statut_id)
        .then(() => {
          this.cancelUpdate();
          this.loadStatuts();
        })
      },
    }
  }
</script>