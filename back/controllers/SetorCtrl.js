const SetorModel = require("../models/SetorModel");

class SetorCtrl {
  async listar(req, res) {
    try {
      const resultado = await SetorModel.find({});
      res.json(resultado);
    } catch (err) {
      res.status(500).send("Erro ao listar setores");
    }
  }

  async buscarPorId(req, res) {
    try {
      const id = req.params.id;
      const setor = await SetorModel.findById(id);
      res.json(setor);
    } catch (err) {
      res.status(500).send("Erro ao buscar setor por ID");
    }
  }

  async salvar(req, res) {
    try {
      const setor = req.body;
      const resultado = await SetorModel.create(setor);
      res.json(resultado);
    } catch (err) {
      res.status(500).send("Erro ao salvar setor");
    }
  }

  async atualizar(req, res) {
    try {
      const id = req.params.id;
      const setor = req.body;
      const resultado = await SetorModel.findByIdAndUpdate(id, setor, { new: true });
      res.json(resultado);
    } catch (err) {
      res.status(500).send("Erro ao atualizar setor");
    }
  }

  async excluir(req, res) {
    try {
      const id = req.params.id;
      await SetorModel.findByIdAndDelete(id);
      res.send("Excluído(a) com sucesso!");
    } catch (err) {
      res.status(500).send("Erro ao excluir setor");
    }
  }
}

module.exports = new SetorCtrl();
