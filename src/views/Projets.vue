<template>
    <v-card>
        <div>
            <h1>Projets</h1>
        </div><br>
        <v-spacer></v-spacer>
        <v-btn v-if="!visible" class="ma-2" @click="visible=!visible" color="#A5D6A7" outlined>
            <v-icon>mdi-eye-off</v-icon>
            Afficher les archivés
        </v-btn>
        <v-btn v-else class="ma-2" @click="visible=!visible" color="#A5D6A7">
            <v-icon>mdi-eye</v-icon>
            Cacher les archivés
        </v-btn>

        <!--- Cartes des projets -->

        <v-container style=" height: 100%; width: 75%;" fluid>
            <v-card v-for="(projet, index) in projets" v-bind:key="index" :color="'#9FA8DA'" class="ma-5" dark style="width: 20em; height: 16em;display:inline-block;">
                <div class="text-h3 flex-grow-1 text-center">
                    <v-card-actions>
                        <div class="text-overline mb-4">
                            <p v-if="projet.archive === 1">archivé</p>
                            <p v-else>non archivé</p>
                        </div>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon v-if="projet.verrou" @click="startUnlock(projet)">mdi-lock</v-icon>
                            <v-icon v-else @click="startLock(projet)">mdi-lock-open-variant</v-icon>
                        </v-btn>
                        <v-btn icon @click="startArchive(projet)">
                            <v-icon>mdi-archive</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <div>
                        {{ projet.nom }}
                    </div>
                    <v-chip-group class="px-2 mt-4">
                        <v-chip v-for="surnom in surnoms.filter(sur => sur.id === projet.projet_id)" :key="surnom" color="#80DEEA">
                            {{ surnom.surnom }}
                        </v-chip>
                        <v-chip color="#80DEEA" :disabled="projet.verrou === 1"  @click="dialInter(projet)">
                            <v-icon>mdi-plus</v-icon>
                        </v-chip>
                    </v-chip-group>
                    <v-chip-group class="px-2">
                        <v-chip color="#A5D6A7" :disabled="projet.verrou === 1">
                            <v-icon>mdi-plus</v-icon>
                        </v-chip>
                    </v-chip-group>
                </div>
            </v-card>

            <!--- Création Projet vide -->

            <v-card v-if="projets.length%3 !== 0" class="ma-5" style="width: 20em; height: 16em;display:inline-flex;position: absolute" @click="creation_projet=!creation_projet">
                <v-icon style="padding:3px;padding-left:150px" color="#008000" x-large >mdi-plus</v-icon>
            </v-card>
            <v-card v-else class="ma-5" style="width: 20em; height: 16em;display:inline-flex;" @click="creation_projet=!creation_projet">
                <v-icon style="padding:3px;padding-left:150px" color="#008000" x-large >mdi-plus</v-icon>
            </v-card>

            <v-dialog width="30em" height="10em" v-model="creation_projet">
                <v-card>
                    <v-card-title class="text-h5">
                        Nom du projet à créer
                    </v-card-title>
                    <v-container fluid>
                        <v-text-field v-model="nom_projet" label="Nom" clearable counter="20" :rules="rules"></v-text-field>
                        <v-btn color="green darken-1" text @click="createProjet">
                        Créer
                        </v-btn>
                    </v-container>
                </v-card>
            </v-dialog>

            <!--- Cartes des projets archivés -->

            <div v-if="visible">
                <v-card v-for="(archive, indexa) in archives" v-bind:key="indexa" :color="'#A5D6A7'" class="ma-5" dark style="width: 20em; height: 13em;display:inline-block">
                    <div class="text-h3 flex-grow-1 text-center">
                        <v-card-actions>
                            <div class="text-overline mb-4">
                                <p v-if="archive.archive === 1">archivé</p>
                                <p v-else>non archivé</p>
                            </div>
                            <v-spacer></v-spacer>
                            <v-btn icon>
                                <v-icon v-if="archive.verrou" @click="startUnlock(archive)">mdi-lock</v-icon>
                                <v-icon v-else @click="startLock(archive)">mdi-lock-open-variant</v-icon>
                            </v-btn>
                            <v-btn icon @click="startRestauration(archive)">
                                <v-icon>mdi-archive-arrow-up</v-icon>
                            </v-btn>
                        </v-card-actions>
                        <div>
                            {{ archive.nom }}<br>
                        </div>
                        <v-chip-group>
                            <v-chip v-for="surnom in surnoms.filter(sur => sur.id === archive.projet_id)" :key="surnom" color="#80DEEA">
                                {{ surnom.surnom }}
                            </v-chip>
                        </v-chip-group>
                    </div>
                </v-card>
            </div>

            <!--- Dialogues -->

            <v-dialog v-model="dialogue" persistant max-width="290" v-if="projet_s">
                <v-card>
                    <v-card-title class="text-h5">
                        {{ action }}
                    </v-card-title>
                    <v-card-text>Voulez vous vraiment {{ action }} le projet {{ projet_s.nom }} ?</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="dialogue = false">
                        Annuler
                        </v-btn>
                        <v-btn v-if="action === 'Archiver'" color="green darken-1" text @click="archiver(projet_s)">
                        Archiver
                        </v-btn>
                        <v-btn v-if="action === 'Restaurer'" color="green darken-1" text @click="restaurer(projet_s)">
                        Restaurer
                        </v-btn>
                        <v-btn v-if="action === 'Verrouiller'" color="green darken-1" text @click="verrouiller(projet_s)">
                        Verrouiller
                        </v-btn>
                        <v-btn v-if="action === 'Déverrouiller'" color="green darken-1" text @click="deverrouiller(projet_s)">
                        Déverrouiller
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialogue_intervenants" width="30em" height="130em" v-if="projet_s">
                <v-card class="pa-5">
                    <v-card-title class="text-h5">
                        Intervenants du projet {{ projet_s.nom }}
                    </v-card-title>
                    <v-container>
                        <v-row align="center">
                            <v-col cols="12" sm="9">
                                <v-select :items="surnoms" item-text="surnom" attach chips label="Intervenants" multiple >
                                </v-select>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-btn color="#26C6DA" @click="dialogue_intervenants_creation=!dialogue_intervenants_creation">
                                <v-icon large>mdi-plus</v-icon>
                            </v-btn>
                        </v-row>
                    </v-container><br><br><br>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialogue_intervenants_creation" width="20em" height="130em">
                <v-card class="pa-5">
                    <v-card-title class="text-h5">
                        Créer un intervenant
                    </v-card-title>
                    <v-container>
                        <v-row align="center">
                            <v-col cols="12" sm="12">
                                <v-select :items="enseignants" v-model="enseignant" item-text="nom" item-value="enseignant_id" attach label="Enseignants">
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-btn color="green darken-1" text @click="test">
                        Créer
                    </v-btn>
                </v-card>
            </v-dialog>
        </v-container>
        <br>
    </v-card>
</template>


<script>
  export default {
    name: 'Projets',
    data : () => {
        return {
            rules: [v => v.length <= 20 || 'Max 20 characters'],
            nom_projet: '',
            creation_projet: false,
            dialogue: false,
            dialogue_intervenants: false,
            dialogue_intervenants_creation: false,
            archives: [],
            projets:[],
            intervenants: [],
            enseignants: [],
            surnoms: [],
            visible: false,
            projet_s: null,
            action: null,
            enseignant: null,
        }
    },
    created: function(){
      this.loadProjets();
      this.loadIntervenants();
    },
    methods: {
        loadProjets: function () {
            this.$http.get('http://localhost:3000/get-projets')
            .then((result) => {
                this.projets = result.data.data;
                this.triarchive()
            })
        },
        loadIntervenants: function () {
            this.$http.get('http://localhost:3000/get-intervenants')
            .then((result) => {
                this.intervenants = result.data.data;
                this.loadEnseignants()
            })
        },
        loadEnseignants: function () {
            this.$http.get('http://localhost:3000/get-enseignants')
            .then((result) => {
                this.enseignants = result.data.data;
                this.loadChips()
            })
        },
        loadChips: function () {
            for(var i=0;i<this.intervenants.length;i++){
                var enseignant = this.enseignants.filter(en => en.enseignant_id === this.intervenants[i].enseignant_id)[0];
                var surnom = enseignant.surnom
                var id = enseignant.enseignant_id
                var projet = enseignant.projet_id
                this.surnoms.push({surnom,id,projet })
            }
        },
        createProjet: function () {
            this.$http.get('http://localhost:3000/save-projet?nom='+this.nom_projet+'&verrou=0&archive=0')
            .then(() => {
                this.nom_projet = ''
                this.creation_projet=false
                this.loadProjets()
            })
        },
        createIntervenant: function (){
            this.$http.get('http://localhost:3000/save-intervenant?enseignant='+this.enseignant+'&projet=null&qtth=0&qtthsup=0')
        },
        triarchive: function (){
            this.archives = []
            for(var i=0;i<this.projets.length;i++){
                if(this.projets[i].archive === 1){
                    this.archives[this.archives.length] = this.projets[i];
                    this.projets.splice(i, 1);
                }
            }
        },
        dialInter: function (projet){
            this.projet_s= projet
            this.dialogue_intervenants=true
        },
        startArchive(projet){
            this.action="Archiver";
            this.showDiag(projet)
        },
        startLock(projet){
            this.action = 'Verrouiller';
            this.showDiag(projet)
        },
        startRestauration(projet){
            this.action="Restaurer";
            this.showDiag(projet)
        },
        startUnlock(projet){
            this.action = 'Déverrouiller';
            this.showDiag(projet)
        },
        verrouiller: function (n) {
            this.$http.get('http://localhost:3000/update-projet?nom='+n.nom+'&archive='+n.archive+'&verrou=1&id='+n.projet_id)
            .then(() => {
                this.loadProjets()
                this.closeDiag()
            })
        },
        deverrouiller: function (n) {
            this.$http.get('http://localhost:3000/update-projet?nom='+n.nom+'&archive='+n.archive+'&verrou=0&id='+n.projet_id)
            .then(() => {
                this.loadProjets()
                this.closeDiag()
            })
        },
        restaurer: function (n) {
            this.$http.get('http://localhost:3000/update-projet?nom='+n.nom+'&archive=0&verrou='+n.verrou+'&id='+n.projet_id)
            .then(() => {
                this.loadProjets()
                this.closeDiag()
            })
        },
        archiver: function (n) {
            this.$http.get('http://localhost:3000/update-projet?nom='+n.nom+'&archive=1&verrou='+n.verrou+'&id='+n.projet_id)
            .then(() => {
                this.loadProjets()
                this.closeDiag()
            })
        },
        showDiag(projet){
            this.projet_s= projet
            this.dialogue = true
        },
        closeDiag(){
            this.dialogue = false
            this.action = ''
            this.projet_s= null
        }
    }
  }
</script>