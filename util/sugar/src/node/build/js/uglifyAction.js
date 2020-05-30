const __webpack = require('webpack');
const __getFilename = require('../../fs/filename');
const __packageRoot = require('../../path/packageRoot');
const __deepMerge = require('../../object/deepMerge');
const __fs = require('fs');
const __path = require('path');
const __uglifyJs = require('uglify-js');

/**
 * @name                uglifyAction
 * @namespace           sugar.node.build.js
 * @type                Function
 *
 * This function is responsible of passing uglify on the passed "data" of the streamObj
 *
 * @param       {Object}        streamObj          The streamObj object with the needed properties described bellow:
 * - data (null) {String}: The data on which will be passed the uglify process
 *
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function uglifyAction(streamObj, settings = {}) {
  return new Promise((resolve, reject) => {
    if (!streamObj.data || typeof streamObj.data !== 'string') {
      return reject(
        `The "<cyan>uglifyAction</cyan>" need a "<yellow>data</yellow>" property of type String in the streamObj...`
      );
    }

    const result = __uglifyJs.minify(streamObj.data, settings);

    if (result.error) {
      return reject(result.error);
    }

    // save the uglified data
    streamObj.data = result.code;

    // resolve the action
    resolve();
  });
};
