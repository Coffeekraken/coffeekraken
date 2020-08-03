const __fs = require('fs');
const __packageRoot = require('../../../path/packageRoot');
const __sugarConfig = require('../../../config/sugar');
const __render = require('../../../template/render');
const __standardizeJson = require('../../../npm/standardizeJson');
const __SPromise = require('../../../promise/SPromise');
const __SDocblock = require('../../../docblock/SDocblock');
const __SBuildScssCli = require('../../../build/scss/SBuildScssCli');
const __trimLines = require('../../../string/trimLines');

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
 * @event       server.frontend.handler.styleguide.start
 *
 * @since       2.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function styleguide(req, server) {
  return new __SPromise(
    async function (resolve, reject, trigger) {
      let viewPath = req.params[0].split('/').join('.');

      trigger('server.frontend.handler.styleguide.start', null);

      let resultObj = {
        view: null,
        data: {}
      };

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

        resultObj.view = viewPath;
        resultObj.data.currentPackageJson = __standardizeJson(
          currentPackageJson
        );

        // check if we have a styleguide scss file to load
        if (sugarJson.scss && sugarJson.scss.styleguide) {
          const buildScssCli = new __SBuildScssCli({});
          const styleguidePromise = buildScssCli.run({
            input: `${packagePath}/${sugarJson.scss.styleguide}`,
            sugarJsonDirs: packagePath
          });
          __SPromise.pipe(styleguidePromise, this);
          const styleguideRes = await styleguidePromise;

          // parsing the docblock
          const docblock = new __SDocblock(styleguideRes.value);
          // set the blocks
          resultObj.data.css = styleguideRes.value;
          resultObj.data.blocks = docblock.toObject();
        }
      }

      resolve(resultObj);
    },
    {
      id: 'server.handler.styleguide'
    }
  ).start();
};
