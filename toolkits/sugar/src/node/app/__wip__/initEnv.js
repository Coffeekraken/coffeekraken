const __envinfo = require('envinfo');
const __dotenv = require('dotenv');
const __fs = require('fs');

/**
 * @name                          initEnv
 * @namespace           sugar.node.app
 * @type                          Function
 *
 * Init the node environment by initialising "dotenv", "envinfo" and beautify the errors display.
 *
 * - dotenv: Load the environment variables from ".env" file into process.env stack
 * - envinfo: Store an object of the environment on which the script is running like the CPU, node version, etc...
 * --- The object will be stored in the process.env.ENV_INFO
 * - package.json: Store the package.json content inside the process.env.PACKAGE variable
 *
 * @example               js
 * const initEnv = require('@coffeekraken/sugar/node/dev/initEnv');
 * initEnv();
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function initEnv() {
  // init dotenv
  __dotenv.config();

  // init envinfo
  process.env.ENV_INFO = __envinfo.run(
    {
      System: ['OS', 'CPU', 'Memory', 'Shell'],
      Binaries: ['Node', 'npm'],
      Browsers: ['Chrome', 'Firefox', 'Safari']
    },
    {
      json: true,
      console: false,
      showNotFound: false
    }
  );

  // check if a package.json file exist at process root
  if (__fs.existsSync(`${process.cwd()}/package.json`)) {
    const packageJson = require(`${process.cwd()}/package.json`);
    // set the packageJson into the process.env stack
    process.env.PACKAGE = packageJson;
  }

  return process.env;
};
