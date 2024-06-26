require("./MongoConnection.js");

const IndividuoModel = require("../models/IndividuoModel").IndividuoModel;
const individuos = require("./jsons/individuos.json");

const SequenciaModel = require("../models/SequenciaModel").SequenciaModel;
const sequencias = require("./jsons/sequencias.json");

async function carregar() {
  try {
    await IndividuoModel.deleteMany({});
    for (const individuo of individuos) {
      await IndividuoModel.create(individuo);
    }
    console.log("Indivíduos carregados com sucesso!");

    await SequenciaModel.deleteMany({});
    for (const sequencia of sequencias) {
      await SequenciaModel.create(sequencia);
    }
    console.log("Sequências carregadas com sucesso!");
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
}

carregar();
