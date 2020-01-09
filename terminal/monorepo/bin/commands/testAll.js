const __config = require('./config');
const __log = require('@coffeekraken/sugar/node/log/log');
const __glob = require('glob');
const __fs = require('fs');
const __path = require('path');

module.exports = () => {

  __log(`Looking for each packages in your repo...`, 'info');

  const packagesFolders = __glob.sync(__config.packagesPattern, {
    cwd: __config.repositoryRootPath,
    root: __config.repositoryRootPath,
    ignore: ['**/node_modules/**']
  });

  packagesFolders.forEach((packageFolder) => {

    packageFolder = packageFolder.split('/').slice(0,-1).join('/');
    if (!packageFolder) return;

    __log('Executing the tests inside the package "' + packageFolder + '"...', 'info');

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
    if (__fs.existsSync(`${__config.repositoryRootPath}/${packageFolder}/package.json`)) {
      const pJson = require(`${__config.repositoryRootPath}/${packageFolder}/package.json`);
      jestPackageJsonConfig = pJson.jest || {};
    }
    if (__fs.existsSync(`${__config.repositoryRootPath}/${packageFolder}/jest.config.js`)) {
      jestConfigJs = require(`${__config.repositoryRootPath}/${packageFolder}/jest.config.js`);
    }

    // executing each tests using jest
    const { execSync } = require('child_process');
    const c = {
      rootDir: __config.repositoryRootPath + '/' + packageFolder,
      ...__config.tests,
      ...globalJestPackageJson,
      ...globalJestConfigJs,
      ...jestPackageJsonConfig,
      ...jestConfigJs
    };
    try {
      execSync(`${__path.resolve(__dirname + '/../../node_modules/jest/bin/jest.js')} --passWithNoTests --config '${JSON.stringify(c)}'`, {
        stdio: "inherit",
        cwd: __config.repositoryRootPath + '/' + packageFolder
      });
    } catch(e) {
      __log(e, 'error');
      process.exit();
    }

    __log('Successfully executed tests inside the package "' + packageFolder + '"...', 'success');

  });

};
