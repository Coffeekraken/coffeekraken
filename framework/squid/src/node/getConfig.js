const __fs = require('fs');
const __glob = require('glob');
const __deepMerge = require('@coffeekraken/sugar/js/object/deepMerge');

/**
 * @name              getConfig
 * @namespace         squid.node.functions
 * @type              Function
 *
 * Load and process the multiple configurations sources like the "squid.config.default.js" file, the "squid.config.js" one, the "squid/*.js" files as well as the "package.json" squid property
 *
 * @return          {Object}                    The final configuration object
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = () => {

  const defaultConfig = require('../../squid.config.default.js');
  let config = defaultConfig;
  if (__fs.existsSync(process.cwd() + '/package.json')) {
    const packageJson = require(process.cwd() + '/package.json');
    config = __deepMerge(config, packageJson.squid || {});
  }
  if (__fs.existsSync(process.cwd() + '/squid.config.js')) {
    const squidConfig = require(process.cwd() + '/squid.config.js');
    config = __deepMerge(config, squidConfig || {});
  }
  const configFiles = __glob.sync(process.cwd() + '/squid/*.js');

  configFiles.forEach(configFilePath => {
    const configObj = require(configFilePath);
    const configName = configFilePath.split('/').slice(-1)[0].replace('.js','');
    config[configName] = __deepMerge(config[configName] || {}, configObj);
  });
  
  // return the final config
  return config;

};
