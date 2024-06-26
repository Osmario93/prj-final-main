require("./db/MongoConnection.js");
const express = require("express");
const cors = require("cors");
const servidor = express();
servidor.use(express.json());
servidor.use(cors());

//Rotas
const IndividuoRouter = require("./routes/IndividuoRouter");
servidor.use("/individuos", IndividuoRouter);

const SequenciaRouter = require("./routes/SequenciaRouter");
servidor.use("/sequencias", SequenciaRouter);

const SetorRouter = require("./routes/SetorRouter");
servidor.use("/setores", SetorRouter);

//Index
servidor.get("/", function (req, res) {
  res.send("Servidor rodando...");
});

//Inicialização
servidor.listen(3005, function () {
  console.log("Servidor rodando em http://localhost:3005");
});
