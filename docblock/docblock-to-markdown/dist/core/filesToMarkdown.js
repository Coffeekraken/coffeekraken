"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filesToMarkdown;

var _glob = _interopRequireDefault(require("glob"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _replaceExt = _interopRequireDefault(require("replace-ext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filesToMarkdown(pattern) {
  // find files
  const filesPaths = _glob.default.sync(pattern); // loop on each files


  filesPaths.forEach(filePath => {
    // makesure it's a file
    if (!_fs.default.lstatSync(filePath).isFile()) {
      return;
    } // read file


    const fileContent = _fs.default.readFileSync(filePath, "utf8"); // transform to markdown


    const markdown = this.stringToMarkdown(fileContent, _path.default.extname(filePath).substr(1)); // make sure we have a markdown content

    if (markdown.trim() === "") {
      return;
    } // new file path


    const newFilePath = (0, _replaceExt.default)(filePath, ".md").replace(this._config.removePath, ""); // write file to drive

    let destination = this._config.destination;
    if (destination.substr(-1) !== "/") destination += "/";

    _fsExtra.default.ensureFileSync(destination + newFilePath);

    _fs.default.writeFileSync(destination + newFilePath, markdown, {
      encoding: "utf8"
    });
  });
}

module.exports = exports.default;