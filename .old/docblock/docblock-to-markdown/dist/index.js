"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _merge2 = _interopRequireDefault(require("lodash/merge"));

var _config = _interopRequireDefault(require("./core/config"));

var _stringToMarkdown = _interopRequireDefault(require("./core/stringToMarkdown"));

var _filesToMarkdown = _interopRequireDefault(require("./core/filesToMarkdown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import api
function _docblockToMarkdown(config = {}) {
  return new DocblockToMarkdown(config);
}

class DocblockToMarkdown {
  constructor(config = {}) {
    this._config = (0, _merge2.default)({}, _config.default, config);
    this.filesToMarkdown = _filesToMarkdown.default.bind(this);
    this.stringToMarkdown = _stringToMarkdown.default.bind(this);
  }

}

var _default = _docblockToMarkdown;
exports.default = _default;
module.exports = exports.default;