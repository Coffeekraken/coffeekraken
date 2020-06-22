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
  let filesPaths = [];
  let finalFilesPaths = [];

  try {
    filesPaths = _glob.default.sync(pattern, {
      nodir: true
    }); // filter the files to generate documentation only on
    // files that have some docblock tags etc...

    filesPaths.forEach((filePath, index, array) => {
      const fileContent = _fs.default.readFileSync(filePath, 'utf8');

      const docblockReg = /\/\*{2}([\s\S]+?)\*\//gm;
      const result = docblockReg.exec(fileContent);
      if (!result) return;
      const docblock = result[0];
      const docblockTagsReg = /\s\*\s@[a-zA-Z0-9]+\s+(.*)\n/g;
      const resultTags = docblockTagsReg.exec(result[0]);
      if (!resultTags || !resultTags[0]) return;
      finalFilesPaths.push(filePath);
    });
  } catch (e) {} // loop on each files


  finalFilesPaths.forEach(filePath => {
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