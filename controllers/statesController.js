const State = require("../models/State");

const readAllStates = async (req, res) => {
  // console.log(req.query.contig?.toUpperCase()); //DEBUG
  State.contig =
    req.query.contig?.toUpperCase() === "TRUE"
      ? true
      : req.query.contig?.toUpperCase() === "FALSE"
      ? false
      : null;
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
  readState,
  readCapital,
  readNickname,
  readPopulation,
  readAdmission,
};
