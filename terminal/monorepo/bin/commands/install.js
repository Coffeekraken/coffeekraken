const __config = require('./config');
const __log = require('@coffeekraken/sugar/node/log/log');

module.exports = () => {

  const { execSync } = require("child_process");

  const globalDependencies = __config.localPackageJson.globalDependencies || __config.generalPackageJson.globalDependencies;
  if (globalDependencies) {
    let globalDependenciesString = "";
    Object.keys(globalDependencies).forEach(globaldep => {
      globalDependenciesString += ` ${globaldep}@${globalDependencies[globaldep]}`;
    });

    __log(`Installing the global dependencies for the app "${__config.localPackageJson.name || 'unknown'}"...`, 'info');

    const error = execSync(`npm i -g ${globalDependenciesString}`, {
      stdio: "inherit"
    });
    if (error) {
      __log(error, 'error');
      process.exit();
    }
    __log(`The global dependencies for the app "${__config.localPackageJson.name || 'unknown'}" have been successfully installed.`, 'success');
  }
  const devDependencies = __config.localPackageJson.devDependencies || __config.generalPackageJson.devDependencies;
  if (devDependencies) {
    let devDependenciesString = "";
    Object.keys(devDependencies).forEach(devdep => {
      devDependenciesString += ` ${devdep}@${devDependencies[devdep]}`;
    });

    __log(`Installing the development dependencies for the app "${__config.localPackageJson.name || 'unknown'}"...`, 'info');

    const error = execSync(`npm i ${devDependenciesString}`, { stdio: "inherit" })
    if (error) {
      __log(error, 'error');
      process.exit();
    }
    __log(`The development dependencies for the app "${__config.localPackageJson.name || 'unknown'}" have been successfully installed.`, 'success');

  }
  const dependencies = __config.localPackageJson.dependencies || __config.generalPackageJson.dependencies;
  if (dependencies) {
    let dependenciesString = "";
    Object.keys(dependencies).forEach(dep => {
      dependenciesString += ` ${dep}@${dependencies[dep]}`;
    });

    __log(`Installing the dependencies for the app "${__config.localPackageJson.name || 'unknown'}"...`, 'info');

    const error = execSync(`npm i ${dependenciesString}`, { stdio: "inherit" })
    if (error) {
      __log(error, 'error');
      process.exit();
    }
    __log(`The dependencies for the app "${__config.localPackageJson.name || 'unknown'}" have been successfully installed.`, 'success');
  }

};
