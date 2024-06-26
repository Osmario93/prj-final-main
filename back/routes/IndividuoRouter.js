const IndividuoCtrl = require("../controllers/IndividuoCtrl");
const express = require("express");

const Router = express.Router();

Router.get("/", IndividuoCtrl.listar);
Router.get("/:id", IndividuoCtrl.buscarPorId);
Router.post("/", IndividuoCtrl.salvar);
Router.put("/:id", IndividuoCtrl.atualizar);
Router.delete("/:id", IndividuoCtrl.excluir);

module.exports = Router;
