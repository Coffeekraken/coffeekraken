// import api
import _merge from "lodash/merge";
import __config from "./core/config";
import __stringToMarkdown from "./core/stringToMarkdown";
import __filesToMarkdown from "./core/filesToMarkdown";
function _docblockToMarkdown(config = {}) {
  return new DocblockToMarkdown(config);
}
class DocblockToMarkdown {
  constructor(config = {}) {
    this._config = _merge({}, __config, config);
    this.filesToMarkdown = __filesToMarkdown.bind(this);
    this.stringToMarkdown = __stringToMarkdown.bind(this);
  }
}
export default _docblockToMarkdown;
