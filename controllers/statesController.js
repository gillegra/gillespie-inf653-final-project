const State = require("../models/State");

//TODO: add conditions for contig querystring parameter
const readAllStates = async (req, res) => {
  const states = await State.find();
  if (!states) return res.status(204).json({ message: "No states found." });
  res.json(states);
};

const readState = (req, res) => {
  const state = data.states.find((emp) => emp.id === parseInt(req.params.id));
  if (!state) {
    return res
      .status(400)
      .json({ message: "State ID " + req.body.id + " not found" });
  }
  res.json(state);
};

const readCapital = (req, res) => {};

const readNickname = (req, res) => {};

const readPopulation = (req, res) => {};

const readAdmission = (req, res) => {};

module.exports = {
  readAllStates,
  // createNewState,
  // updateState,
  // deleteState,
  readState,
};
