const State = require("../models/State");

module.exports = async (req, res, next) => {
  console.log("validating state");
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
  req.validatedState = state;
  next();
};
