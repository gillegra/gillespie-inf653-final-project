const State = require("../models/State");

const readAllStates = async (req, res) => {
  // console.log(req.query.contig?.toUpperCase()); //DEBUG
  console.log("readAllStates"); //DEBUG
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
  console.log("readState"); //DEBUG
  res.json(req.validatedState);
};

const readCapital = (req, res) => {
  console.log("readCapital"); //DEBUG
  const result = {
    state: req.validatedState.state,
    capital: req.validatedState.capital_city,
  };
  res.json(result);
};

const readNickname = (req, res) => {
  console.log("readNickname"); //DEBUG
  const result = {
    state: req.validatedState.state,
    nickname: req.validatedState.nickname,
  };
  res.json(result);
};

const readPopulation = (req, res) => {
  console.log("readPopulation"); //DEBUG
  const result = {
    state: req.validatedState.state,
    population: req.validatedState.population.toLocaleString("en-US"),
  };
  res.json(result);
};

const readAdmission = (req, res) => {
  console.log("readAdmission"); //DEBUG
  const result = {
    state: req.validatedState.state,
    admitted: req.validatedState.admission_date,
  };
  res.json(result);
};

module.exports = {
  readAllStates,
  readState,
  readCapital,
  readNickname,
  readPopulation,
  readAdmission,
};
