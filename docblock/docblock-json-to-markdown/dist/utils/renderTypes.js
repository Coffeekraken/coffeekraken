"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderTypes;

function renderTypes(types) {
  types = [].concat(types); // loop on each types

  types = types.map(type => {
    // check if the type exist in types config list
    if (this._config.types[this._config.language] && this._config.types[this._config.language][type]) {
      return `[${type}](${this._config.types[this._config.language][type]})`;
    }

    return type;
  }); // return the rendered types

  return `{ ${types.join(" , ")} }`;
}

module.exports = exports.default;