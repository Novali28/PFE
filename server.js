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

//home
app.get("/", (req, res) => {
res.json({message:'Root page'})
})



//test get
app.get("/get-data1", (req, res) => {
const q=req.query;
res.json({message:'Get JSON Example',name:q.name})
})

//test post
app.post("/post-data1", (req, res) => {
const q=req.body
res.json({message:'Post JSON Example',name:q.name})
})


//creation statut
app.get("/save-statut", (request, response) => {
const req=request.query
const query="INSERT INTO statut SET ?";
var CURRENT_TIMESTAMP = mysql.raw('now()');
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
  response.json({data:rows})
});
})

//suppression statut
app.get("/delete-statut", (request, response) => {
const req=request.query
const query="DELETE FROM statut where name=?";
const params=[req.name]
connection.query(query,params,(err,result,fields) => {
  if(err) throw err;
  response.json({deleted:result.affectedRows})
});
})





















//run the application
app.listen(port, () => {
  console.log(`running at port ${port}`);
});