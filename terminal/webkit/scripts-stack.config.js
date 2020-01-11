const __config = require('./bin/commands/config');
const __findUp = require('find-up');
const __fs = require('fs');
const __deepMerge = require('@coffeekraken/sugar/js/object/deepMerge');

let localScriptsStackConfig = {};
if (__fs.existsSync(`${process.cwd()}/scripts-stack.config.js`)) {
  localScriptsStackConfig = require(`${process.cwd()}/scripts-stack.config.js`);
}

module.exports = __deepMerge({
  scripts: {
    "dist.js": "ck-webkit dist js",
    "dist.js.bundle": "ck-webkit dist js --bundle",
    "dist.js.analyze": "ck-webkit dist js --analyze",
    "dist.css": "ck-webkit dist css",
    "dist.img": "ck-webkit dist img",
    "dist.doc": "ck-webkit doc",
    "dist.doc.map": "ck-webkit doc map",
    "test": "ck-webkit test",
    "pre-view": "ck-webkit pre-view"
  },
  watch: {
    "test": {
      "paths": __config.tests.testMatch
    },
    "dist.js": {
      "paths": `${__config.dist.js.sourceFolder}/**/*!(.bundle).js`
    },
    "dist.js.bundle": {
      "paths": __config.dist.js.bundle.sourceFilesPattern,
    },
    "dist.css": {
      "paths": `${__config.dist.css.sourceFolder}/**/*.scss`
    },
    "dist.img": {
      "paths": `${__config.dist.img.sourceFolder}/**/*.{jpg,jpeg,png,gif,svg}`
    }
  },
  ignore: [
    'start',
    'preinstall',
    'postinstall'
  ]
}, localScriptsStackConfig);
