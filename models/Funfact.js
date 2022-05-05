const State = require("./State");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const funfactSchema = new Schema({
  funfact: {
    type: [String],
    required: true,
  },
  code: {
    type: String,
    required: true,
    uppercase: true,
    unique: true,
  },
});

module.exports = mongoose.model("Funfact", funfactSchema);
