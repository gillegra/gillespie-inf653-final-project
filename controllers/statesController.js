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
  // for (const state of states) {
  //   const funfact = await Funfact.findOne({
  //     code: state.code,
  //   }).exec();
  //   if (funfact?.funfacts?.length > 0) state.funfacts = funfact.funfacts;
  // }
  res.json(states);
};

const readState = async (req, res) => {
  console.log("readState"); //DEBUG
  const state = req.validatedState;
  const funfact = await Funfact.findOne({
    code: state.code,
  }).exec();
  if (funfact?.funfacts?.length > 0) state.funfacts = funfact.funfacts;
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
      .status(400)
      .json({ message: "No Fun Facts found for " + state.state });
  }
  res.json({
    funfact:
      funfact.funfacts[Math.floor(Math.random() * funfact.funfacts.length)],
  });
};

const createFunfact = async (req, res) => {
  const state = req.validatedState;
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
      code: state.code,
    }).exec();
    console.log("Funfact.findOne", funfact); //DEBUG
  } catch (err) {
    console.error(err);
  }

  if (!funfact) {
    try {
      funfact = await Funfact.create({
        code: state.code,
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

const updateFunfact = async (req, res) => {
  if (!req?.body?.index) {
    return res
      .status(400)
      .json({ message: "State fun fact index value required" });
  }
  if (!req?.body?.funfact) {
    return res.status(400).json({ message: "State fun fact value required" });
  }

  const state = req.validatedState;
  const funfact = await Funfact.findOne({
    code: state.code,
  }).exec();

  if (!funfact?.funfacts?.length) {
    console.log({ message: "No Fun Facts found for " + state.state }); //DEBUG
    return res
      .status(400)
      .json({ message: "No Fun Facts found for " + state.state });
  }
  if (!funfact.funfacts[req.body.index - 1]) {
    console.log({
      message: "No Fun Fact found at that index for " + state.state,
    }); //DEBUG
    return res
      .status(400)
      .json({ message: "No Fun Fact found at that index for " + state.state });
  }
  funfact.funfacts[req.body.index - 1] = req.body.funfact;
  funfact.save();
  res.json(funfact);
};

const deleteFunfact = async (req, res) => {
  console.log(126, req?.body?.index); //DEBUG
  if (!req?.body?.index)
    return res
      .status(400)
      .json({ message: "State fun fact index value required" });

  const state = req.validatedState;
  const funfact = await Funfact.findOne({
    code: state.code,
  }).exec();

  if (!funfact?.funfacts?.length) {
    console.log({ message: "No Fun Facts found for " + state.state }); //DEBUG
    return res
      .status(400)
      .json({ message: "No Fun Facts found for " + state.state });
  }
  if (!funfact.funfacts[req.body.index - 1]) {
    console.log({
      message: "No Fun Fact found at that index for " + state.state,
    }); //DEBUG
    return res
      .status(400)
      .json({ message: "No Fun Fact found at that index for " + state.state });
  }
  funfact.funfacts = funfact.funfacts.filter(
    (_, index) => index !== req.body.index - 1
  );
  funfact.save();
  res.json(funfact);
};

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
