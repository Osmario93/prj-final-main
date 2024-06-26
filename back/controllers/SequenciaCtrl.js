const SequenciaModel = require("../models/SequenciaModel").SequenciaModel;

class SequenciaCtrl {
  async listar(req, res) {
    const resultado = await SequenciaModel.find({}).populate("individuo");
    res.json(resultado);
  }

  async buscarPorId(req, res) {
    const id = req.params.id;
    const sequencia = await SequenciaModel.findOne({ _id: id });
    res.json(sequencia);
  }
  async salvar(req, res) {
    const sequencia = req.body;
    const resultado = await SequenciaModel.create(sequencia);
    res.json(resultado);
  }
  async atualizar(req, res) {
    const id = req.params.id;
    const sequencia = req.body;
    const resultado = await SequenciaModel.findOneAndUpdate(
      { _id: id },
      sequencia,
      {
        new: true,
      }
    );
    res.json(resultado);
  }

  async excluir(req, res) {
    const id = req.params.id;
    await SequenciaModel.findOneAndDelete({ _id: id });
    res.send("Excluído(a) com sucesso!");
  }
}

module.exports = new SequenciaCtrl();
