"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getVersion;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Return the version specified in config or try to get the version from the package.json file
 * @return 		{String} 		The version found
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
function getVersion() {
  // if specified, return it
  if (this._config.version) {
    return this._config.version;
  } // try to get it from the package.json


  if (_fs["default"].existsSync(process.env.PWD + "/package.json")) {
    var packageJson = JSON.parse(_fs["default"].readFileSync(process.env.PWD + "/package.json", "utf8"));

    if (packageJson.version) {
      return packageJson.version;
    }
  } // we don't have any version found


  return "";
}

module.exports = exports.default;