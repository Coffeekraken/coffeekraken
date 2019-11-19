import __jsonToMarkdown from "./core/jsonToMarkdown";
import __renderBlock from "./core/renderBlock";
import __renderTag from "./core/renderTag";
import __renderBlocks from "./core/renderBlocks";
import __renderTypes from "./utils/renderTypes";
import __titleLevel from "./utils/titleLevel";
import __config from "./core/config";
import _merge from "lodash/merge";
function _docblockJsonToMarkdown(config = {}) {
  return new DocblockJsonToMarkdown(config);
}
class DocblockJsonToMarkdown {
  constructor(config = {}) {
    this._config = _merge({}, __config, config);
    // bind all methods in config with the good context
    for (let key in this._config.tags) {
      this._config.tags[key] = this._config.tags[key].bind(this);
    }
    for (let key in this._config.parts) {
      this._config.parts[key] = this._config.parts[key].bind(this);
    }
    for (let key in this._config.templates) {
      this._config.templates[key] = this._config.templates[key].bind(this);
    }
    this.renderBlocks = __renderBlocks.bind(this);
    this._renderBlock = __renderBlock.bind(this);
    this._renderTag = __renderTag.bind(this);
    this._renderTypes = __renderTypes.bind(this);
    this._titleLevel = __titleLevel.bind(this);
    this.jsonToMarkdown = __jsonToMarkdown.bind(this);
  }
}
export default _docblockJsonToMarkdown;
