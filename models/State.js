//state data is not in Mongo, but in the static JSON file
class State {
  constructor() {
    this.states = require("../models/states.json");
    this.nonContiguous = ["AK", "HI"];
  }

  find(contiguous = null) {
    let result = [];
    switch (contiguous) {
      case true:
        result = this.getContiguous();
        break;
      case false:
        result = this.getNonContiguous();
        break;
      case null:
      default:
        result = this.getAll();
        break;
    }
    return result;
  }

  findOne(slug) {
    return this.states.find((state) => {
      slug.toUpperCase() ?? "" === state.slug;
    });
  }

  getAll() {
    return this.states;
  }

  getContiguous() {
    let result = [];
    this.states.forEach((state) => {
      if (this.nonContiguous.includes(state.slug) === false) {
        result.push(state);
      }
    });
    return result;
  }

  getNonContiguous() {
    let result = [];
    this.states.forEach((state) => {
      if (this.nonContiguous.includes(state.slug) === true) {
        result.push(state);
      }
    });
    return result;
  }
}

module.exports = new State();
