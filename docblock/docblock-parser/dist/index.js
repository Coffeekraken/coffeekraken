"use strict";

require("core-js/modules/es.function.bind");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _merge2 = _interopRequireDefault(require("lodash/merge"));

var _parse = _interopRequireDefault(require("./core/parse"));

var _getVersion = _interopRequireDefault(require("./utils/getVersion"));

var _config = _interopRequireDefault(require("./core/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _docblockParser() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new DocblockParser(config);
}

var DocblockParser = function DocblockParser() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, DocblockParser);

  this._config = (0, _merge2["default"])({}, _config["default"], config); // bind all methods in config with the good context

  for (var key in this._config.tags) {
    this._config.tags[key] = this._config.tags[key].bind(this);
  }

  for (var _key in this._config.nextLineAnalyzer) {
    this._config.nextLineAnalyzer[_key] = this._config.nextLineAnalyzer[_key].bind(this);
  }

  this._getVersion = _getVersion["default"].bind(this);
  this.parse = _parse["default"].bind(this);
};
/**
 * Factory function that gives back a docblock parser instance.
 * @param 		{Object} 		config 			A config object
 * @return 		{DocblockParser} 				A DocblockParser instance
 * @example 	js
 * const docblockParser = require('coffeekraken-docblock-parser');
 * const jsonDocblocks = docblockParser({
 * 	// override some configs here
 * }).parse(myStringToParse);
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */


var _default = _docblockParser;
exports["default"] = _default;
module.exports = exports.default;