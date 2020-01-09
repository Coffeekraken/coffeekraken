const __config = require('./config');
const __log = require('@coffeekraken/sugar/node/log/log');
const __fs = require('fs');
const __path = require('path');
const __execSh = require('exec-sh');

module.exports = () => {

  __log('Executing the tests inside the package "' + process.cwd().replace(__config.repositoryRootPath + '/', '') + '"...', 'info');

  // try to get custom configurations
  let jestPackageJsonConfig = {};
  let jestConfigJs = {};
  let globalJestPackageJson = {};
  let globalJestConfigJs = {};
  if (__fs.existsSync(`${__config.repositoryRootPath}/package.json`)) {
    const pJson = require(`${__config.repositoryRootPath}/package.json`);
    globalJestPackageJson = pJson.jest || {};
  }
  if (__fs.existsSync(`${__config.repositoryRootPath}/jest.config.js`)) {
    globalJestConfigJs = require(`${__config.repositoryRootPath}/jest.config.js`);
  }
  if (__fs.existsSync(`${process.cwd()}/package.json`)) {
    const pJson = require(`${process.cwd()}/package.json`);
    jestPackageJsonConfig = pJson.jest || {};
  }
  if (__fs.existsSync(`${process.cwd()}/jest.config.js`)) {
    jestConfigJs = require(`${process.cwd()}/jest.config.js`);
  }

  // executing each tests using jest
  const c = {
    rootDir: process.cwd(),
    ...__config.tests,
    ...globalJestPackageJson,
    ...globalJestConfigJs,
    ...jestPackageJsonConfig,
    ...jestConfigJs
  };
  try {
    __execSh(`jest --passWithNoTests --config '${JSON.stringify(c)}'`, {
      stdio: "inherit",
      cwd: process.cwd()
    });
  } catch(e) {
    __log(e, 'error');
    process.exit();
  }

  __log('Successfully executed tests inside the package "' + process.cwd().replace(__config.repositoryRootPath + '/', '') + '"...', 'success');

};
