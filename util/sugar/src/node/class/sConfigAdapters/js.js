const __fs = require('fs');
const __set = require('../../object/set');
const __get = require('../../object/get');
const __toString = require('../../string/toString');
const __parse = require('../../string/parse');
const __stringifyObject = require('stringify-object');

/**
 * @name                  js
 * @namespace             sugar.node.class.sConfigAdapters
 * @type                  Function
 *
 * The JSON data adapter for the SConfig class that let you define a filename where you want to save your configs, how you want to encrypt/decrypt it
 * and then you just have to use the SConfig class and that's it...
 *
 * @param                   {String}                    path                  The dotted object path to specify the config you want in the retreived object
 * @param                   {Mixed}                     [value=null]          The value that you want to save, or null if you want to simply get a value
 * @param                   {Object}                    [settings={}]         The adapter settings that let you work with the good data storage solution...
 * @return                  {Promise}                                         A promise that will be resolved once the data has been getted/saved...
 *
 * @settings
 * The settings available are these onces:
 * - filename: (String): Specify where you want to store the config file and how you want to name it
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let __jsConfig = {};
module.exports = function(path, value = null, settings = {}) {
  return new Promise((resolve, reject) => {

      // check the settings
      if ( ! settings.filename) {
        __log(`The JS SConfig data adapter need a "filename" settings to specify where you want to save your data...`, 'error');
        return reject();
      }

      // try to get the value of the already savec config
      if (__fs.existsSync(settings.filename) && Object.keys(__jsConfig).length <= 0) {
        __jsConfig = require(settings.filename);
      }

      // check if we need to save or just get a value
      if (value !== null) {
        __set(__jsConfig, path, value);

        // save the new value
        const d = `module.exports = ${__stringifyObject(__jsConfig)};`;
        __fs.writeFileSync(settings.filename, d);

        resolve(value);
        return value;
      } else {
        const v = __get(__jsConfig, path);
        resolve(v);
        return v;
      }

  });
}
