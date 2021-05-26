class Virus {

  constructor(_id, name, code) {
    this._id = _id;
    this.name = name;
    this.code = code;
    // valeur par défaut
    this.temperature = [];
    this.virulence = []; // pour chaque organe, niveau de 0 à 10
    this.mortalite = 0; // de 0 à 100%
    this.updateCaracs();
  }

  clone() {
    return new Virus(this._id, this.name, this.code);
  }

  updateCaracs() {
    if (this.temperature.length != 0) {
      this.temperature.splice(0,this.temperature.length);
    }
    if (this.virulence.length != 0) {
      this.virulence.splice(0,this.virulence.length);
    }
    this.updateTemperature();
    this.virulenceCoeur();
    this.virulencePoumon();
    this.virulenceRein();
    this.virulenceCerveau();
    this.updateMortalite();
  }

  updateTemperature() {
    let tMin = -10;
    let tMax = 55;
    this.temperature = [ tMin, tMax];
  }

  virulenceCoeur() {
    let level = 0;
    const rexp = RegExp('AB','g');
    let nb = 0;
    let dist = 0;
    let lastPos = -1;
    let res;
    if(res == 0){
      console.log("res");
    }
    while ( (res = rexp.exec(this.code)) !== null) {
      if (lastPos == -1) {
        lastPos = rexp.lastIndex-2;
      }
      else {
        dist += rexp.lastIndex-2 - lastPos;
        lastPos = rexp.lastIndex-2;
      }
      nb += 1;
    }
    if (nb > 1) {
      dist = dist/(nb-1);
      level = (nb<10?nb:10)*(1.0/Math.sqrt(dist-1.0))
    }
    this.virulence.push({organe:'coeur', niveau:level});
  }
  virulencePoumon() {
    let level = 0;
    const rexp1 = RegExp('(BAD)+','g');
    const rexp2 = RegExp('C+','g');
    let maxBAD = 0;
    let maxC = 0;
    let res;
    while ( (res = rexp1.exec(this.code)) !== null) {
      if(res[0].length > maxBAD) {
        maxBAD = res[0].length;
      }
    }
    maxBAD = maxBAD/3;

    while ( (res = rexp2.exec(this.code)) !== null) {
      if(res[0].length > maxC) {
        maxC = res[0].length;
      }
    }
    let m = Math.pow(1.5,maxBAD) - (maxC/2.0);
    if (m>10) level = 10;
    else if (m>0) level = m;
    this.virulence.push({organe:'poumon', niveau:level});
  }
  virulenceRein() {
    let level = 0;
    const rexp1 = RegExp('B+','g');
    const rexp2 = RegExp('D+','g');
    let maxB = 0;
    let maxD = 0;
    let res;
    while ( (res = rexp1.exec(this.code)) !== null) {
      if(res[0].length > maxB) {
        maxB = res[0].length;
      }
    }
    while ( (res = rexp2.exec(this.code)) !== null) {
      if(res[0].length > maxD) {
        maxD = res[0].length;
      }
    }
    if ((maxB>=2)&&(maxD>=2)) {
      level = (maxB+maxD)/2.0;
    }

    this.virulence.push({organe:'rein', niveau:level});
  }
  virulenceCerveau() {
    let level = 0;
    const rexp1 = RegExp('(CA)+','g');
    let maxCA = 0;
    let res;
    while ( (res = rexp1.exec(this.code)) !== null) {
      if(res[0].length > maxCA) {
        maxCA = res[0].length;
      }
    }
    maxCA = maxCA/2; // pour avoir le nb repet
    if (maxCA%2 == 1) maxCA = maxCA/2; // cas impair

    level = maxCA>10?10:maxCA;

    this.virulence.push({organe:'cerveau', niveau:level});
  }
  updateMortalite() {
    let m = 0;
    let virCoeur = this.virulence.find(el => el.organe == 'coeur').niveau;
    let virPoumon = this.virulence.find(el => el.organe == 'poumon').niveau;
    let virRein = this.virulence.find(el => el.organe == 'rein').niveau;
    let virCerveau = this.virulence.find(el => el.organe == 'cerveau').niveau;
    m = 2.0*(virCoeur+virPoumon+virRein+virCerveau);
    if ((virPoumon>=6)&&(virRein>=6)) m += 10;
    else if ((virPoumon>=3)&&(virRein>=3)) m += 5;
    if ((virCoeur>=6)&&(virCerveau>=6)) m += 10;
    else if ((virCoeur>=3)&&(virCerveau>=3)) m += 5;
    this.mortalite = m;
  }

  toString() {
    return this.name+" "+this.code+" : "+this.mortalite;
  }

}

class ElementConstitutif {

  constructor(_id, titre, code,niveau,parent,indicefils,volparetu,modedesaisie,typesautorises,forfaitpourcours,nbgroupe) {
    this._id = _id;
    this.titre = titre;
    this.code = code;
    this.niveau = niveau;
    this.parent = parent;
    this.indicefils = indicefils;
    // Volume d'heures prévues par étudiant en CM/TD/TP/Partiel
    this.volparetu = volparetu;
    this.modedesaisie = modedesaisie;
    this.typesautorises = typesautorises;
    this.forfaitpourcours = forfaitpourcours;
    this.nbgroupe = nbgroupe;
  }

  clone() {
    return new ElementConstitutif(this._id, this.titre, this.code);
  }
}

var elements = []
var viruses = [];

elements.push(new ElementConstitutif(1,"titre",0,0,null,0,10,"globale","CM",24,2));
viruses.push(new Virus(1,"adeno","ABABABABABAB"));
viruses.push(new Virus(2,"covid","ABADBADCCCBADCB"));
viruses.push(new Virus(3,"staphy","ABBCDDDDCBBB"));
viruses.push(new Virus(4,"prillon","ABCACACABCAB"));

export { Virus, viruses };
