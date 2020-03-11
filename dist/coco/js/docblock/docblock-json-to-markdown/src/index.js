"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonToMarkdown = _interopRequireDefault(require("./core/jsonToMarkdown"));

var _renderBlock = _interopRequireDefault(require("./core/renderBlock"));

var _renderTag = _interopRequireDefault(require("./core/renderTag"));

var _renderBlocks = _interopRequireDefault(require("./core/renderBlocks"));

var _renderTypes = _interopRequireDefault(require("./utils/renderTypes"));

var _titleLevel = _interopRequireDefault(require("./utils/titleLevel"));

var _config = _interopRequireDefault(require("./core/config"));

var _merge2 = _interopRequireDefault(require("lodash/merge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _docblockJsonToMarkdown(config = {}) {
  return new DocblockJsonToMarkdown(config);
}

class DocblockJsonToMarkdown {
  constructor(config = {}) {
    this._config = (0, _merge2.default)({}, _config.default, config); // bind all methods in config with the good context

    for (let key in this._config.tags) {
      this._config.tags[key] = this._config.tags[key].bind(this);
    }

    for (let key in this._config.parts) {
      this._config.parts[key] = this._config.parts[key].bind(this);
    }

    for (let key in this._config.templates) {
      this._config.templates[key] = this._config.templates[key].bind(this);
    }

    this.renderBlocks = _renderBlocks.default.bind(this);
    this._renderBlock = _renderBlock.default.bind(this);
    this._renderTag = _renderTag.default.bind(this);
    this._renderTypes = _renderTypes.default.bind(this);
    this._titleLevel = _titleLevel.default.bind(this);
    this.jsonToMarkdown = _jsonToMarkdown.default.bind(this);
  }

}

var _default = _docblockJsonToMarkdown;
exports.default = _default;
module.exports = exports.default;