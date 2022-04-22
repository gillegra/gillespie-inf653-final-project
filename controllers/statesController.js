//TODO: update to use DB
//TODO: merge this data with DB data
const data = {
  states: require("../models/states.json"),
  setStates: function (data) {
    this.states = data;
  },
};

//TODO: add conditions for contig querystring parameter
const getAllStates = (req, res) => {
  res.json(data.states);
};

const getState = (req, res) => {
  const state = data.states.find((emp) => emp.id === parseInt(req.params.id));
  if (!state) {
    return res
      .status(400)
      .json({ message: "State ID " + req.body.id + " not found" });
  }
  res.json(state);
};

module.exports = {
  getAllStates,
  createNewState,
  updateState,
  deleteState,
  getState,
};
