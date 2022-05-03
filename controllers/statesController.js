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

const readState = async (req, res) => {
  res.json(req.validatedState);
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
