const express = require("express");

const app = express();

//define mysql connection
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'nvettora',
  database: 'pfe'
});

//define port
const port=3000;
exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "https://www.example.com",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
//home
app.get("/", (req, res) => {
res.json({message:'Root page'})
})

// test Fonctions automatisation

// creations
function creation(request,response,table,params) {
	const req=request.query
	const query="INSERT INTO "+table+" SET ?";
	var params2=[];
	const params3={nom:req.nom,surnom:req.surnom,qtte_heures:req.qtth,qtte_heures_sup:req.qtthsup}
	for(var i = 0;i<params.length;i++){
		params2.push(params[i]+':req.'+params[i]);
	}
	console.log(params2);
	connection.query(query,params2,(err,result,fields) => {
  		if(err) throw err;
  		response.json({saved:result.affectedRows,inserted_id:result.insertId})
	});
}

function getall(response,table){
	connection.query('SELECT * FROM statut', (err,rows) => {
  	if(err) throw err;
  	response.json({data:rows}),
    response.statusCode = 200,
	  response.setHeader(
	    'Access-Control-Allow-Origin', '*'
	  );
});
}

function supprimer(request,response,table){
	const req=request.query
	const query="DELETE FROM "+param+" where nom=?";
	const params=[req.nom]
	connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
  response.json({deleted:result.affectedRows})
});
}






//Foncitons GET pour l'API 
// 3 par table : création, suppression, et liste des éléments

//  -------------  STATUT  -------------

//creation statut
app.get("/save-statut", (request, response) => {
const req=request.query
const query="INSERT INTO statut SET ?";
const params={nom:req.nom,surnom:req.surnom,qtte_heures:req.qtth,qtte_heures_sup:req.qtthsup}
connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
  response.json({saved:result.affectedRows,inserted_id:result.insertId})
});
})

//obtention statuts
app.get("/get-statuts", (request, response) => {
connection.query('SELECT * FROM statut', (err,rows) => {
  	if(err) throw err;
	response.setHeader(
		'Access-Control-Allow-Origin', '*'
	);
	response.statusCode = 200;
	response.json({data:rows});
});
	return response;
})

//suppression statut
app.get("/delete-statut", (request, response) => {
supprimer(request,response,"statut")
})

//  -------------  ENSEIGNANT  -------------

//creation enseignant
app.get("/save-enseignant", (request, response) => {
const req=request.query
const query="INSERT INTO enseignant SET ?";
var surnom=req.prenom.charAt(0)+req.nom.charAt(0)+req.nom.charAt(1);
const params={prenom:req.prenom,nom:req.nom,surnom:surnom,email:req.email,statut_id:req.statut}
connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
  	response.setHeader(
		'Access-Control-Allow-Origin', '*'
	);
	response.statusCode = 200;
  response.json({saved:result.affectedRows,inserted_id:result.insertId})
});
})

//obtention enseignants
app.get("/get-enseignants", (request, response) => {
connection.query('SELECT * FROM enseignant', (err,rows) => {
  if(err) throw err;
  response.setHeader(
    'Access-Control-Allow-Origin', '*'
  );
  response.json({data:rows}),
  response.statusCode = 200;
});
return response;
})

//suppression enseignant
app.get("/delete-enseignant", (request, response) => {
const req=request.query
const query="DELETE FROM enseignant where nom=?";
const params=[req.nom]
connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
   response.setHeader(
		'Access-Control-Allow-Origin', '*'
	);
	response.statusCode = 200;
  response.json({deleted:result.affectedRows})
});
})

//  -------------  PROJET  -------------

//creation projet
app.get("/save-projet", (request, response) => {
const req=request.query
const query="INSERT INTO projet SET ?";
var CURRENT_TIMESTAMP = mysql.raw('now()');
const params={nom:req.nom,date:CURRENT_TIMESTAMP,verrou:req.verrou,archive:req.archive}
connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
  response.json({saved:result.affectedRows,inserted_id:result.insertId})
});
})

//obtention projets
app.get("/get-projets", (request, response) => {
connection.query('SELECT * FROM projet', (err,rows) => {
  if(err) throw err;
  response.json({data:rows})
});
})

//suppression projet
app.get("/delete-projet", (request, response) => {
const req=request.query
const query="DELETE FROM projet where nom=?";
const params=[req.nom]
connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
  response.json({deleted:result.affectedRows})
});
})

//  -------------  INTERVENANT  -------------

//creation intervenant
app.get("/save-intervenant", (request, response) => {
const req=request.query
const query="INSERT INTO intervenant SET ?";
const params={projet_id:req.projet,enseignant_id:req.enseignant,qtte_heures:req.qtth,qtte_heures_sup:req.qtthsup}
connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
  response.json({saved:result.affectedRows,inserted_id:result.insertId})
});
})

//obtention intervenants
app.get("/get-intervenants", (request, response) => {
connection.query('SELECT * FROM intervenant', (err,rows) => {
  if(err) throw err;
  response.json({data:rows})
});
})

//suppression intervenant
app.get("/delete-intervenant", (request, response) => {
const req=request.query
const query="DELETE FROM intervenant where intervenant_id=?";
const params=[req.id]
connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
  response.json({deleted:result.affectedRows})
});
})

//  -------------  LIMITE SOUS-TOTAL  -------------

//creation limite sous-total
app.get("/save-limite_sous_total", (request, response) => {
const req=request.query
const query="INSERT INTO limite_sous_total SET ?";
const params={projet_id:req.projet,nom:req.nom,limite_eqtd:req.eqtd}
connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
  response.json({saved:result.affectedRows,inserted_id:result.insertId})
});
})

//obtention limites sous-total
app.get("/get-limites_sous_totaux", (request, response) => {
connection.query('SELECT * FROM limite_sous_total', (err,rows) => {
  if(err) throw err;
  response.json({data:rows})
});
})

//suppression limite sous-total
app.get("/delete-limite_sous_total", (request, response) => {
const req=request.query
const query="DELETE FROM limite_sous_total where nom=?";
const params=[req.nom]
connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
  response.json({deleted:result.affectedRows})
});
})

//  -------------  BILAN  -------------

//creation bilan
app.get("/save-bilan", (request, response) => {
const req=request.query
const query="INSERT INTO bilan SET ?";
const params={projet_id:req.projet,limite_sous_total_id:req.sous_total}
connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
  response.json({saved:result.affectedRows,inserted_id:result.insertId})
});
})

//obtention bilans
app.get("/get-bilans", (request, response) => {
connection.query('SELECT * FROM bilan', (err,rows) => {
  if(err) throw err;
  response.json({data:rows})
});
})

//suppression bilan
app.get("/delete-bilan", (request, response) => {
const req=request.query
const query="DELETE FROM bilan where bilan_id=?";
const params=[req.id]
connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
  response.json({deleted:result.affectedRows})
});
})

//  -------------  ELEMENT CONSTITUTIF  -------------

//creation element constitutif
app.get("/save-element_constitutif", (request, response) => {
const req=request.query
const query="INSERT INTO element_constitutif SET ?";
const params={titre:req.titre,code:req.code,niveau:req.niveau,parent:req.parent,indice_fils:req.indice,volume_heures_prevues:req.volume,mode_saisie_heure:req.mode_saisie,type_cours_autorises:req.type_cours,forfait:req.forfait,nombre_groupe_effectif:req.nbre_groupe}
connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
  response.json({saved:result.affectedRows,inserted_id:result.insertId})
});
})

//obtention elements constitutifs
app.get("/get-element_constitutifs", (request, response) => {
connection.query('SELECT * FROM element_constitutif', (err,rows) => {
  if(err) throw err;
  response.json({data:rows})
});
})

//suppression element constitutif
app.get("/delete-element_constitutif", (request, response) => {
const req=request.query
const query="DELETE FROM element_constitutif where titre=?";
const params=[req.titre]
connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
  response.json({deleted:result.affectedRows})
});
})

//  -------------  FORMATION  -------------

//creation formation
app.get("/save-formation", (request, response) => {
const req=request.query
const query="INSERT INTO formation SET ?";
const params={projet_id:req.projet,verrou:req.verrou,element_constitutif_id:req.element}
connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
  response.json({saved:result.affectedRows,inserted_id:result.insertId})
});
})

//obtention formations
app.get("/get-formations", (request, response) => {
connection.query('SELECT * FROM formation', (err,rows) => {
  if(err) throw err;
  response.json({data:rows})
});
})

//suppression formation
app.get("/delete-formation", (request, response) => {
const req=request.query
const query="DELETE FROM formation where formation_id=?";
const params=[req.id]
connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
  response.json({deleted:result.affectedRows})
});
})

//  -------------  GROUPE SOUS-TOTAL  -------------

//creation groupe sous-total
app.get("/save-groupe_sous_total", (request, response) => {
const req=request.query
const query="INSERT INTO groupe_sous_total SET ?";
const params={limite_sous_total_id:req.sous_total,element_constitutif_id:req.element}
connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
  response.json({saved:result.affectedRows,inserted_id:result.insertId})
});
})

//obtention groupes sous-totaux
app.get("/get-groupes_sous_totaux", (request, response) => {
connection.query('SELECT * FROM groupe_sous_total', (err,rows) => {
  if(err) throw err;
  response.json({data:rows})
});
})

//suppression groupe sous-total
app.get("/delete-groupe_sous_total", (request, response) => {
const req=request.query
const query="DELETE FROM groupe_sous_total where groupe_sous_total_id=?";
const params=[req.id]
connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
  response.json({deleted:result.affectedRows})
});
})

//  -------------  VOLUME GLOBAL  -------------

//creation volume global
app.get("/save-volume_global", (request, response) => {
const req=request.query
const query="INSERT INTO volume_global SET ?";
const params={element_constitutif_id:req.element,intervenant_id:req.intervenant,volume:req.volume}
connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
  response.json({saved:result.affectedRows,inserted_id:result.insertId})
});
})

//obtention volumes globaux
app.get("/get-volumes_globaux", (request, response) => {
connection.query('SELECT * FROM volume_global', (err,rows) => {
  if(err) throw err;
  response.json({data:rows})
});
})

//suppression volume global
app.get("/delete-volume_global", (request, response) => {
const req=request.query
const query="DELETE FROM volume_global where volume_global_id=?";
const params=[req.id]
connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
  response.json({deleted:result.affectedRows})
});
})

//  -------------  GROUPE PAR INTERVENANT  -------------

//creation groupe par intervenant
app.get("/save-groupe_par_intervenant", (request, response) => {
const req=request.query
const query="INSERT INTO groupe_par_intervenant SET ?";
const params={element_constitutif_id:req.element,numero_semaine:req.semaine,intervenant_id:req.intervenant,nombre_groupes:req.groupes}
connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
  response.json({saved:result.affectedRows,inserted_id:result.insertId})
});
})

//obtention groupes par intervenant
app.get("/get-groupes_par_intervenants", (request, response) => {
connection.query('SELECT * FROM groupe_par_intervenant', (err,rows) => {
  if(err) throw err;
  response.json({data:rows})
});
})

//suppression groupe par intervenant
app.get("/delete-groupe_par_intervenant", (request, response) => {
const req=request.query
const query="DELETE FROM groupe_par_intervenant where groupe_par_intervenant_id=?";
const params=[req.id]
connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
  response.json({deleted:result.affectedRows})
});
})

//  -------------  VOLUME HEBDOMADAIRE  -------------

//creation volume hebdomadaire
app.get("/save-volume_hebdomadaire", (request, response) => {
const req=request.query
const query="INSERT INTO volume_hebdomadaire SET ?";
const params={element_constitutif_id:req.element,numero_semaine:req.semaine,volume_heure:req.volume}
connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
  response.json({saved:result.affectedRows,inserted_id:result.insertId})
});
})

//obtention volumes hebdomadaire
app.get("/get-volumes_hebdomadaires", (request, response) => {
connection.query('SELECT * FROM volume_hebdomadaire', (err,rows) => {
  if(err) throw err;
  response.json({data:rows})
});
})

//suppression volume hebdomadaire
app.get("/delete-volume_hebdomadaire", (request, response) => {
const req=request.query
const query="DELETE FROM volume_hebdomadaire where volume_hebdomadaire_id=?";
const params=[req.id]
connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
  response.json({deleted:result.affectedRows})
});
})

//  -------------  PERIODE  -------------

//creation periode
app.get("/save-periode", (request, response) => {
const req=request.query
const query="INSERT INTO periode SET ?";
const params={element_constitutif_id:req.element,nombre_semaine:req.semaine,nombre_groupes_default:req.nombre_groupes}
connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
  response.json({saved:result.affectedRows,inserted_id:result.insertId})
});
})

//obtention periode
app.get("/get-periodes", (request, response) => {
connection.query('SELECT * FROM periode', (err,rows) => {
  if(err) throw err;
  response.json({data:rows})
});
})

//suppression periode
app.get("/delete-periode", (request, response) => {
const req=request.query
const query="DELETE FROM periode where periode_id=?";
const params=[req.id]
connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
  response.json({deleted:result.affectedRows})
});
})

//run the application
app.listen(port, () => {
  console.log(`running at port ${port}`);
});