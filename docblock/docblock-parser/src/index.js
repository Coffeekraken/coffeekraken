// import api
import _merge from "lodash/merge";
import __parse from "./core/parse";
import __getVersion from "./utils/getVersion";
import __config from "./core/config";
function _docblockParser(config = {}) {
  return new DocblockParser(config);
}
class DocblockParser {
  constructor(config = {}) {
    this._config = _merge({}, __config, config);
    // bind all methods in config with the good context
    for (let key in this._config.tags) {
      this._config.tags[key] = this._config.tags[key].bind(this);
    }
    for (let key in this._config.nextLineAnalyzer) {
      this._config.nextLineAnalyzer[key] = this._config.nextLineAnalyzer[
        key
      ].bind(this);
    }
    this._getVersion = __getVersion.bind(this);
    this.parse = __parse.bind(this);
  }
}
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
export default _docblockParser;
