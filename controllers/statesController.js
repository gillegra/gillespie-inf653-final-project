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
  // console.log(req.params.state?.toUpperCase()); //DEBUG
  State.code = req.params.state?.toUpperCase();
  const state = await State.findOne();
  if (!state) {
    return (
      res
        .status(400)
        // .json({ message: "State ID " + req.params.state + " not found" });
        .json({ message: "Invalid state abbreviation parameter" })
    );
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
