const __fs = require('fs');
const __packageRoot = require('../../../path/packageRoot');
const __sugarConfig = require('../../../config/sugar');
const __render = require('../../../template/render');
const __standardizeJson = require('../../../npm/standardizeJson');

/**
 * @name                styleguide
 * @namespace           node.server.frontend.handlers
 * @type                Function
 *
 * This function is responsible of responding to express requests made on the "styleguide" section
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          server          The express server instance
 * @return        {Promise}                         A promise that will be resolved with the response to send to the client
 *
 * @since       2.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function styleguide(req, server) {
  return new Promise(async (resolve, reject) => {
    let viewPath = req.params[0].split('/').join('.');

    let currentPackageJson;

    // check if the passed request point to a valid coffeekraken sugar ready package
    const pr = __packageRoot();
    const packagePath = `${pr}/node_modules/${req.params[0]}`;
    if (__fs.existsSync(`${packagePath}/sugar.json`)) {
      currentPackageJson = require(`${packagePath}/package.json`);
      const sugarJson = require(`${packagePath}/sugar.json`);
      if (sugarJson.views && sugarJson.views.styleguide) {
        viewPath = `${packagePath}/${sugarJson.views.styleguide}`;
      }
    }

    resolve({
      view: viewPath,
      data: {
        currentPackageJson: __standardizeJson(currentPackageJson)
      }
    });
  });
};
