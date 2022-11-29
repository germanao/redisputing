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
          }
      }
      else
          console.log(result.insertId)
      res.send(result)
  })
})




const PORT = process.env.PORT || 5001;

app.listen(PORT, (req, res) => {
  console.log(`Server started on port ${PORT} 🔥`);
});
