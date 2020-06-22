import __glob from "glob";
import __fs from "fs";
import __path from "path";
import __fsExtra from "fs-extra";
import __replaceExt from "replace-ext";
export default function filesToMarkdown(pattern) {
  // find files
  let filesPaths = [];
  let finalFilesPaths = [];
  try {
    filesPaths = __glob.sync(pattern, {
      nodir: true
    });
    // filter the files to generate documentation only on
    // files that have some docblock tags etc...
    filesPaths.forEach((filePath, index, array) => {
      const fileContent = __fs.readFileSync(filePath, 'utf8');
      const docblockReg = /\/\*{2}([\s\S]+?)\*\//gm;
      const result = docblockReg.exec(fileContent);
      if (!result) return;

      const docblock = result[0];
      const docblockTagsReg = /\s\*\s@[a-zA-Z0-9]+\s+(.*)\n/g;
      const resultTags = docblockTagsReg.exec(result[0]);
      if ( ! resultTags || ! resultTags[0]) return;
      finalFilesPaths.push(filePath);
    });
  } catch(e) {}
  // loop on each files
  finalFilesPaths.forEach(filePath => {
    // makesure it's a file
    if (!__fs.lstatSync(filePath).isFile()) {
      return;
    }
    // read file
    const fileContent = __fs.readFileSync(filePath, "utf8");
    // transform to markdown
    const markdown = this.stringToMarkdown(
      fileContent,
      __path.extname(filePath).substr(1)
    );
    // make sure we have a markdown content
    if (markdown.trim() === "") {
      return;
    }
    // new file path
    const newFilePath = __replaceExt(filePath, ".md").replace(
      this._config.removePath,
      ""
    );
    // write file to drive
    let destination = this._config.destination;
    if (destination.substr(-1) !== "/") destination += "/";
    __fsExtra.ensureFileSync(destination + newFilePath);
    __fs.writeFileSync(destination + newFilePath, markdown, {
      encoding: "utf8"
    });
  });
}
