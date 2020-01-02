const __findUp = require('find-up');
const __fs = require('fs');

let localPackageJson = {};
if (__fs.existsSync(`${process.cwd()}/package.json`)) {
  localPackageJson = require(`${process.cwd()}/package.json`);
}
let localBabelConfig = {};
if (__fs.existsSync(`${process.cwd()}/babel.config.js`)) {
  localBabelConfig = require(`${process.cwd()}/babel.config.js`);
}

const generalPackageJsonPath = __findUp.sync('package.json', {
  cwd: __dirname
});
let generalPackageJson = {};
if (generalPackageJsonPath) {
  generalPackageJson = require(generalPackageJsonPath);
}

const generalBabelConfigPath = __findUp.sync('babel.config.js', {
  cwd: __dirname
});
let generalBabelConfig = {};
if (generalBabelConfigPath) {
  generalBabelConfig = require(generalBabelConfigPath);
}

module.exports = function(api) {
  api.cache(false);
  return {
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
    ],
    ...(generalPackageJson.babel || {}),
    ...generalBabelConfig,
    ...(localPackageJson.babel || {}),
    ...localBabelConfig
  };
};
