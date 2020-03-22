const __fs = require('fs');

const __deepMerge = require('../object/deepMerge');

/**
 * @name                                    load
 * @namespace                               sugar.node.config
 * @type                                    Function
 * 
 * Load the configuration and mix the default ones with the "user" ones defined in the "sugar.config.js" file at the root of the process
 * By default, the loaded configuration object will be saved in the global variable "Sugar.config"
 * 
 * @param       {String}            [configPath=process.cwd()]          The path where to search for the sugar.config.js file
 * @return      {Object}                                                The sugar configuration object
 * 
 * @example         js
 * const load = require('@coffeekraken/sugar/node/config/load');
 * load(); // => { // configuration object }
 * 
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function load(configPath = process.cwd()) {

  // check if the config has already been loaded
  if (Sugar && Sugar.config) return Sugar.config;

  // load the default config file
  const defaultConfig = require('../../../sugar.config.js');

  // load the "user" config is it exists
  let userConfig = {};
  if (__fs.existsSync(`${process.cwd()}/sugar.config.js`)) {
    userConfig = require(`${process.cwd()}/sugar.config.js`);
  }

  // mix the configs
  const finalConfig = __deepMerge(defaultConfig, userConfig);

  // save the config if the global variable "Sugar.config"
  if (!Sugar) global.Sugar = {};
  Sugar.config = finalConfig;

  // return the config
  return finalConfig;

};