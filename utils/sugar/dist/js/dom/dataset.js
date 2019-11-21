"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dataset;

var _uncamelize = _interopRequireDefault(require("../utils/strings/uncamelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @TODO : delete this method and find a way to replace it by a polyfill
function dataset(elm, key, value = null) {
  if (!elm.getAttribute) return;

  if (!value) {
    return elm.dataset[key] || getAttribute("data-" + (0, _uncamelize.default)(key));
  } else {
    // try to set the value
    let dataset = elm.dataset;

    if (dataset) {
      if (elm.dataset[key]) {
        elm.dataset[key] = value;
      } else {
        // set the data through setAttribute
        elm.setAttribute("data-" + (0, _uncamelize.default)(key), value);
      }
    } else {
      // set the data through setAttribute
      // cause no support for dataset
      elm.setAttribute("data-" + (0, _uncamelize.default)(key), value);
    } // return the element


    return elm;
  }
}

module.exports = exports.default;