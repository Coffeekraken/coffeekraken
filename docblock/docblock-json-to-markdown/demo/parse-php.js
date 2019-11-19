const docblockParser = require("@coffeekraken/docblock-parser");
const docblockJsonToMarkdown = require("../dist/index");
const fs = require("fs");

// load demo js file content
const jsContent = fs.readFileSync(__dirname + "/demo-php.php", "utf-8");

// parse the content
const json = docblockParser({
  language: "php"
}).parse(jsContent);

// transform if into markdown
const markdown = docblockJsonToMarkdown({
  language: "php"
}).jsonToMarkdown(json);

// save it to disk
fs.writeFileSync(__dirname + "/demo-php.md", markdown);
