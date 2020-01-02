const __config = require('./config');
const __log = require('@coffeekraken/sugar/node/log/log');
const { execSync } = require('child_process');

module.exports = (script) => {

  let shellScript =
    __config.localPackageJson &&
    __config.localPackageJson.scripts &&
    __config.localPackageJson.scripts[script]
      ? __config.localPackageJson.scripts[script]
      : null;
  // check if we have the script in the config
  if ( ! shellScript && __config && __config.scripts && __config.scripts[script]) {
    shellScript = __config.scripts[script];
  }
  // check that the script exist either in the general package.json
  if ( ! shellScript && __config.generalPackageJson.scripts && __config.generalPackageJson.scripts[script]) {
    shellScript = __config.generalPackageJson.scripts[script];
  }
  if ( ! shellScript) {
    __log(
      `The script "${script}" that you want to run does not exist either in the local "package.json" file, in the general "monorepo.config.js" file and in the general "package.json" file...`, 'warn'
    );
    process.exit(0);
  }
  // otherwise, we run the script using the exec-sh package

  __log(`Execution of the script "${script}"...`, 'info');

  try {

    execSync(shellScript, {
      cwd: process.cwd()
    });

  } catch(error) {
    __log(error, 'error');
    process.exit();
  }

  __log(`The script "${script}" has been correctly executed.`, 'success');

}
