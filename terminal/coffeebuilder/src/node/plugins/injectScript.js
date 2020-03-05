const __sortObj = require('@coffeekraken/sugar/js/object/sort');
const __filterObj = require('@coffeekraken/sugar/js/object/filter');
const __coffeeEvents = require('../events');
const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');
const __fs = require('fs');
const __getExtension = require('@coffeekraken/sugar/js/string/getExtension');

/**
 * @name                                injectScript
 * @namespace                           terminal.coffeebuilder.node.plugins
 * @type                                Function
 *
 * Post processor plugin that execute all the post processors on the processed resources
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = {

  before: (stats, settings, api) => {

    api.getInjectedScriptsFilepathes().forEach(injectPath => {

      api.addWebpackEntry(injectPath, `${injectPath.replace('.js', '.compiled.js')}`);

    });

  },

  after: (stats, settings, api) => {
    return new Promise(async (resolve, reject) => {

      const injectScriptFilePath = `${__tmpDir()}/coffeeBuilderInjectScript.default.js`;
      let defaultInjected = __fs.existsSync(injectScriptFilePath) ? false : true;

      Object.keys(stats.savedResources).forEach(resourcePath => {
        const resource = stats.savedResources[resourcePath];
        resource.outputFilePathes.forEach(path => {

          // ensure we work with a js file
          const extension = __getExtension(path);
          if (extension !== 'js') return;

          const outputPathInjectScriptFilePath = injectScriptFilePath.replace('.default.', `.${path.replace('/', '-')}.`);
          if (__fs.existsSync(outputPathInjectScriptFilePath)) {
            const fileContent = __fs.readFileSync(outputPathInjectScriptFilePath).toString('utf8');
            __fs.appendFileSync(path, fileContent);
          } else if (!defaultInjected) {
            const defaultFileContent = __fs.readFileSync(injectScriptFilePath).toString('utf8');
            __fs.appendFileSync(path, defaultFileContent);
            defaultInjected = true;
          }

        });
      });

      resolve();

    });
  }

};