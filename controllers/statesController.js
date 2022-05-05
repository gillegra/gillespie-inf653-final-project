const State = require("../models/State");
const Funfact = require("../models/Funfact");

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

//funfacts

const readFunfact = async (req, res) => {
  console.log("readFunFact", req.validatedState.code); //DEBUG
  const state = req.validatedState;
  const funfact = await Funfact.findOne({
    code: state.code,
  }).exec();
  console.log("finished search", funfact, !funfact); //DEBUG
  if (!funfact) {
    console.log("empty set", funfact, !funfact); //DEBUG
    return res
      .status(204)
      .json({ message: "No Fun Facts found for " + state.name });
  }
  res.json({ funfact: funfact });
};

const createFunfact = async (req, res) => {
  //validate the input
  if (!req?.body?.funfacts) {
    return res.status(400).json({ message: "State fun facts value required" });
  }
  if (!Array.isArray(req.body.funfacts)) {
    return res
      .status(400)
      .json({ message: "State fun facts value must be an array" });
  }

  console.log(req?.body?.funfacts); //DEBUG
  let funfact;
  try {
    //check if there is already an array of funfacts for this state
    funfact = await Funfact.findOne({
      code: req.validatedState.code,
    }).exec();
    console.log("Funfact.findOne", funfact); //DEBUG
  } catch (err) {
    console.error(err);
  }

  if (!funfact) {
    try {
      funfact = await Funfact.create({
        code: req.validatedState.code,
        funfacts: [],
      });
    } catch (err) {
      console.error(err);
    }
  }

  try {
    //update the array you may or may not have created
    funfact.funfacts = [...funfact.funfacts, ...req.body.funfacts];
    funfact.save();
    res.status(201).json(funfact);
  } catch (err) {
    console.error(err);
  }
};

const updateFunfact = async (req, res) => {};

const deleteFunfact = async (req, res) => {};

module.exports = {
  readAllStates,
  readState,
  readCapital,
  readNickname,
  readPopulation,
  readAdmission,
  readFunfact,
  createFunfact,
  updateFunfact,
  deleteFunfact,
};
