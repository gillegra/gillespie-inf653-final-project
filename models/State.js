//state data is not in Mongo, but in the static JSON file
class State {
  #states;
  #nonContiguous;
  contig;
  code;

  constructor() {
    this.states = require("../models/states.json");
    this.nonContiguous = ["AK", "HI"];
    this.contig = null;
    this.code = "";
  }

  find() {
    // console.log(
    //   this.nonContiguous,
    //   this.nonContiguous.includes("AK") === !this.contig,
    //   this.states[0].code,
    //   this.nonContiguous.includes(this.states[0].code),
    //   this.states[1].code,
    //   this.nonContiguous.includes(this.states[1].code)
    // ); //DEBUG
    return this.contig === null ? this.states : this.filterContiguous();
  }

  findOne(slug) {
    return this.states.find((state) => {
      slug.toUpperCase() ?? "" === state.slug;
    });
  }

  filterContiguous() {
    return this.states.filter(
      (state) => this.nonContiguous.includes(state.code) === !this.contig
    );
  }
}

module.exports = new State();
