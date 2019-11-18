'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

var _parse = require('./core/parse');

var _parse2 = _interopRequireDefault(_parse);

var _getVersion = require('./utils/getVersion');

var _getVersion2 = _interopRequireDefault(_getVersion);

var _config = require('./core/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // import api


function _docblockParser() {
	var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	return new DocblockParser(config);
};

var DocblockParser = function DocblockParser() {
	var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	_classCallCheck(this, DocblockParser);

	this._config = (0, _merge3.default)({}, _config2.default, config);
	// bind all methods in config with the good context
	for (var key in this._config.tags) {
		this._config.tags[key] = this._config.tags[key].bind(this);
	}
	for (var _key in this._config.nextLineAnalyzer) {
		this._config.nextLineAnalyzer[_key] = this._config.nextLineAnalyzer[_key].bind(this);
	}
	this._getVersion = _getVersion2.default.bind(this);
	this.parse = _parse2.default.bind(this);
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


exports.default = _docblockParser;
module.exports = exports['default'];