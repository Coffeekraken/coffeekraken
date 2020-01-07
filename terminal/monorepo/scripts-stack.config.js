const __config = require('./bin/commands/config');
const __findUp = require('find-up');
const __fs = require('fs');
const __deepMerge = require('@coffeekraken/sugar/js/object/deepMerge');

let localScriptsStackConfig = {};
if (__fs.existsSync(`${process.cwd()}/scripts-stack.config.js`)) {
  localScriptsStackConfig = require(`${process.cwd()}/scripts-stack.config.js`);
}

const generalScriptsStackConfigPath = __findUp.sync('scripts-stack.config.js', {
  cwd: __dirname
});
let generalScriptsStackConfig = {};
if (generalScriptsStackConfigPath) {
  generalScriptsStackConfig = require(generalScriptsStackConfigPath);
}

module.exports = __deepMerge({
  scripts: {
    "test": "ck test",
    "test.all": "ck test all",
    "dist": "ck dist all",
    "dist.js": "ck dist js",
    "dist.js.bundle": "ck dist js -b",
    "dist.css": "ck dist css",
    "dist.img": "ck dist img",
    "dist.doc": "ck doc",
    "dist.doc.all": "ck doc all",
    "dist.doc.map": "ck doc map",
    "demo": "ck run demo.dist && ck run demo.server",
    "demo.dist": "ck dist --rootDir demo",
    "demo.dist.js": "ck dist js --rootDir demo",
    "demo.dist.js.bundle": "ck dist js -b --rootDir demo",
    "demo.dist.css": "ck dist css --rootDir demo",
    "demo.dist.img": "ck dist img --rootDir demo",
    "demo.server": "open http://127.0.0.1:8080 && http-server ./demo",
    "start": "ck-scripts-stack -i start"
  },
  watch: {
    "test": {
      "paths": __config.tests.testMatch
    },
    "dist.js": {
      "paths": `${__config.dist.js.sourceFolder.replace('<rootDir>/','')}/**/*!(.bundle).js`
    },
    "dist.js.bundle": {
      "paths": __config.dist.js.bundle.sourceFilesPattern.replace('<rootDir>/',''),
    },
    "dist.css": {
      "paths": `${__config.dist.css.sourceFolder.replace('<rootDir>/','')}/**/*.scss`
    },
    "dist.img": {
      "paths": `${__config.dist.img.sourceFolder.replace('<rootDir>/','')}/**/*.{jpg,jpeg,png,gif,svg}`
    },
    "demo.dist.js": {
      "paths": `${__config.dist.js.sourceFolder.replace('<rootDir>/','demo/')}/**/*!(.bundle).js`
    },
    "demo.dist.js.bundle": {
      "paths": __config.dist.js.bundle.sourceFilesPattern.replace('<rootDir>/','demo/')
    },
    "demo.dist.css": {
      "paths": `${__config.dist.css.sourceFolder.replace('<rootDir>/','demo/')}/**/*.scss`
    },
    "demo.dist.img": {
      "paths": `${__config.dist.img.sourceFolder.replace('<rootDir>/','demo/')}/**/*.{jpg,jpeg,png,gif,svg}`
    }
  },
  ignore: [
    'start',
    'postinstall'
  ]
}, generalScriptsStackConfig, localScriptsStackConfig);
