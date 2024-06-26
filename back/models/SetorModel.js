const mongoose = require("mongoose");

const SetorSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true, default: -1 },
    codigo: { type: String, required: [true, "Código é obrigatório!"] },
    nome: { type: String, required: [true, "Nome é obrigatório!"] },
  },
  {
    versionKey: false,
  }
);

SetorSchema.pre("save", async function (next) {
  if (this._id < 1) {
    const Model = mongoose.model("setor", SetorSchema);
    const objMaxId = await Model.findOne().sort({ _id: -1 });
    this._id = objMaxId == null ? 1 : objMaxId._id + 1;
  }
  next();
});

module.exports = {
  SetorSchema: SetorSchema,
  SetorModel: mongoose.model("setor", SetorSchema),
};