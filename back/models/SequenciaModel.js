const mongoose = require("mongoose");

const SequenciaSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true, default: -1 },
    sequencia: { type: String, required: [true, "Sequência é obrigatória!"] },
    individuo: { type: Number, ref: "individuo" },
  },
  {
    versionKey: false,
  }
);

SequenciaSchema.pre("save", async function (next) {
  if (this._id < 1) {
    const Model = mongoose.model("sequencia", SequenciaSchema);
    const objMaxId = await Model.findOne().sort({ _id: -1 });
    this._id = objMaxId == null ? 1 : objMaxId._id + 1;
  }
  next();
});

module.exports = {
  SequenciaSchema: SequenciaSchema,
  SequenciaModel: mongoose.model("sequencia", SequenciaSchema),
};
