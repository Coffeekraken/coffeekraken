const docblockParser = require("@coffeekraken/docblock-parser");
const docblockJsonToMarkdown = require("../dist/index");
const fs = require("fs");

// load demo js file content
const jsContent = fs.readFileSync(__dirname + "/demo-scss.scss", "utf-8");

// parse the content
const json = docblockParser({
  language: "scss"
}).parse(jsContent);

// transform if into markdown
const markdown = docblockJsonToMarkdown({
  language: "scss"
}).jsonToMarkdown(json);

// save it to disk
fs.writeFileSync(__dirname + "/demo-scss.md", markdown);
