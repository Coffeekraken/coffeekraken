import __isBase64 from '../is/base64';
import __base64 from '../crypt/base64';
import __deepMerge from '../object/deepMerge';
import __ensureExist from '../object/ensureExist';
import __get from '../object/get';
import __set from '../object/set';
import __isJson from '../is/json';

/**
 * @name                          config
 * @namespace           js.core
 * @namespace                     Function
 *
 * Access the configuration setted using the "config(path, value)" function
 *
 * @param               {String}                  path                        The dotted config path to get like "log.mail"
 * @param               {Mixed}                   [value=null]                The value to set. Will return the setted value if passed
 * @return              {Mixed}                                               Return the config value wanted
 *
 * @example           js
 * import config from '@coffeekraken/sugar/js/core/js';
 * config('log.mail.host'); // => gmail.google.com
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
 */
let __sugarConfig = window.sConfig || localStorage.getItem('sConfig') || {};
// if (typeof __sugarConfig === 'string' && __isBase64(__sugarConfig)) __sugarConfig = __base64.decrypt(__sugarConfig);
// if (typeof __sugarConfig === 'string' && __isJson(__sugarConfig)) __sugarConfig = JSON.parse(__sugarConfig);
export default (path, value = null) => {
  // process the path
  if (path === '.' || path === '' || !path) {
    path = '';
  }

  if (__isBase64(value)) {
    value = __base64.decrypt(value);
  }
  if (__isJson(value)) {
    value = JSON.parse(value);
  }

  if (typeof value === 'object' && (path === '.' || path === '' || !path)) {
    __sugarConfig = __deepMerge(__sugarConfig, value);
    return __sugarConfig;
  }

  let newValue;

  // check if is a set or get process
  if (value) {
    newValue = __set(__sugarConfig, path, value);
  } else {
    // get the wanted path
    newValue = __get(__sugarConfig, path);
  }

  // preparing the value to set in the storage
  let configToSave = __sugarConfig;
  if (typeof configToSave !== 'string')
    configToSave = JSON.stringify(configToSave);
  const encryptedConfig = __base64.encrypt(configToSave);

  // save the new settings
  window.sConfig = encryptedConfig;
  localStorage.setItem('sConfig', encryptedConfig);

  // return the new settings value
  return newValue;
};
