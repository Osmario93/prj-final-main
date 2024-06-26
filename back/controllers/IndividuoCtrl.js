const IndividuoModel = require("../models/IndividuoModel").IndividuoModel;

class IndividuoCtrl {
  async listar(req, res) {
    const resultado = await IndividuoModel.find({});
    res.json(resultado);
  }

  async buscarPorId(req, res) {
    const id = req.params.id;
    const individuo = await IndividuoModel.findOne({ _id: id });
    res.json(individuo);
  }

  async salvar(req, res) {
    const individuo = req.body;
    const resultado = await IndividuoModel.create(individuo);
    res.json(resultado);
  }

  async atualizar(req, res) {
    const id = req.params.id;
    const individuo = req.body;
    const resultado = await IndividuoModel.findOneAndUpdate(
      { _id: id },
      individuo,
      {
        new: true,
      }
    );
    res.json(resultado);
  }

  async excluir(req, res) {
    const id = req.params.id;
    await IndividuoModel.findOneAndDelete({ _id: id });
    res.send("Excluído(a) com sucesso!");
  }
}

module.exports = new IndividuoCtrl();
