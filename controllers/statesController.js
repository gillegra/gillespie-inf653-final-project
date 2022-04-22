const data = {
  states: require("../models/states.json"),
  setStates: function (data) {
    this.states = data;
  },
};

//TODO: add conditions for contig querystring parameter
const readAllStates = (req, res) => {
  res.json(data.states);
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
  createNewState,
  updateState,
  deleteState,
  readState,
};
