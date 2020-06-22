const __findUp = require('find-up');
const __fs = require('fs');
const __deepMerge = require('@coffeekraken/sugar/js/object/deepMerge');

let localPackageJson = {};
if (__fs.existsSync(`${process.cwd()}/package.json`)) {
  localPackageJson = require(`${process.cwd()}/package.json`);
}
let localBabelConfig = {};
if (__fs.existsSync(`${process.cwd()}/babel.config.js`)) {
  localBabelConfig = require(`${process.cwd()}/babel.config.js`);
}

module.exports = function(api) {
  api.cache(false);
  return __deepMerge({
    presets: [
      [
        "@babel/env",
        {
          useBuiltIns: "usage",
          corejs: "3.0.0"
        }
      ]
    ],
    plugins: [
      "add-module-exports",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-export-default-from"
    ]
  },
  localPackageJson.babel || {},
  localBabelConfig);
};
