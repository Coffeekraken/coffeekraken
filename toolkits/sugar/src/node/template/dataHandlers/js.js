const __SPromise = require('../../promise/SPromise');

/**
 * @name          js
 * @namespace     sugar.node.template.dataHandlers
 * @type          Function
 *
 * This function simply take the .data.js file path and return
 * the resulting object
 *
 * @param       {String}      filePath      The file path to take care
 * @return      {SPromise}                  An SPromise instance that will be resolved with the resulting object
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function js(filePath) {
  return new __SPromise((resolve) => {
    resolve(require(filePath));
  });
};
