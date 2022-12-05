const express = require("express");
const dotenv = require("dotenv");
const database = require("./src/config/database");
const db = require("./src/config/dbSQL");
const routes = require("./src/routes/index.routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();
database();

app.use("/api/users", routes)

app.post("/api/registerClient", (req, res) => {
  const { CNPJ, nome, ativa, tipoLogradouro, logradouro,
         numero, complemento, bairro, cep, ddd1, telefone1,
         ddd2, telefone2, atividadePrincipal, paisId,
         paisDesc, estadoId, estadoDesc, cidadeId, cidadeDesc } = req.body;

  if(!CNPJ || CNPJ.length != 14) {
     res.status(400).send("CNPJ não informado ou inválido")
     return
    }

  let SQL = `INSERT INTO client (
      CNPJ,
      nome,
      ativa,
      tipoLogradouro,
      logradouro,
      numero,
      complemento,
      bairro,
      cep,
      ddd1,
      telefone1,
      ddd2,
      telefone2,
      atividadePrincipal,
      paisId,
      paisDesc,
      estadoId,
      estadoDesc,
      cidadeId,
      cidadeDesc) 
      VALUES (
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?)`;

  db.query(SQL, [
    CNPJ,
    nome,
    ativa,
    tipoLogradouro,
    logradouro,
    numero,
    complemento,
    bairro,
    cep,
    ddd1,
    telefone1,
    ddd2,
    telefone2,
    atividadePrincipal,
    paisId,
    paisDesc,
    estadoId,
    estadoDesc,
    cidadeId,
    cidadeDesc
  ], (err, result) => {
      if (err) {
          console.log(err)
          if (err.errno = 1048) {
              console.log("Valores primários estão nulos")
              return
          }
          res.status(404).send('Ocorreu um erro ou CNPJ já existe')
          return
      }
      else
          console.log(result.insertId)
      res.send(result)
  })
})

app.get("/api/registerClient/:cnpj", (req, res) => {

  let cnpj = req.params.cnpj

  if(!cnpj || cnpj.length != 14) {
    res.status(400).send("CNPJ não informado ou inválido")
    return
  }

  let SQL = `
  SELECT *
    FROM client
   WHERE client.CNPJ = ?`;   

  db.query(SQL, cnpj, (err, result) => {
      if (err) {
          console.log(err)
      }
      else
          console.log(result)
      res.send(result)
  })
})

app.post("/api/registerSolic", (req, res) => {

  const { email, kindOfProblem, ranking, supplier} = req.body;

  let SQL = 
    ` INSERT INTO solicitacoes (email, status, supplier, kindOfProblem, ranking, creationDate, lastModified) 
      VALUES (?, ?, ?, ?, ?, ?, ?);`;

  let today = new Date();

  db.query(SQL, [
    email,
    "AF", /* Aguardando Fornecedor */
    supplier,
    kindOfProblem,
    ranking,
    today.toISOString().slice(0,10),
    today.toISOString().slice(0,10)
  ], (err, result) => {
      if (err) {
          console.log(err)
          res.status(err.status).send(err.message)
      }
      else
          // console.log(result.insertId)
      res.send(result)
  })
})

app.get("/api/solic/:email", (req, res) => {

  let email = req.params.email

  let SQL = `
  SELECT *
    FROM solicitacoes
   WHERE solicitacoes.email = ?`;   

  db.query(SQL, email, (err, result) => {
      if (err) {
          res.status(err.status).send(err.message)
      }
      else
          // console.log(result)
      res.send(result)
  })
})

const PORT = process.env.PORT || 5001;

app.listen(PORT, (req, res) => {
  console.log(`Server started on port ${PORT} 🔥`);
});
