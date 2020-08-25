const __path = require('path');
const __fs = require('fs');
const __packageRoot = require('../../../path/packageRoot');
const __SPromise = require('../../../promise/SPromise');
const __toHtml = require('../../../convert/toHtml');

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
module.exports = function doc(req, server, settings = {}) {
  return new __SPromise(
    async function (resolve, reject, trigger) {
      // check if the passed request point to a valid coffeekraken sugar ready package
      const pr = __packageRoot();
      let params = req.params[0].split('/');
      let packagePath = pr;
      if (__fs.existsSync(`${pr}/node_modules/${params[0]}/package.json`)) {
        packagePath = `${pr}/node_modules/${params[0]}`;
        params = params.slice(1);
      } else if (
        __fs.existsSync(
          `${pr}/node_modules/${params.slice(0, 2).join('/')}/package.json`
        )
      ) {
        packagePath = `${pr}/node_modules/${params.slice(0, 2).join('/')}`;
        params = params.slice(2);
      }

      // load the package.json file
      const packageJson = require(`${packagePath}/package.json`);

      let resultObj = {
        view: null,
        data: {}
      };

      let docMapJson;

      if (!__fs.existsSync(`${packagePath}/docMap.json`)) {
        if (!__fs.existsSync(`${pr}/docMap.json`)) {
          return resolve({
            ...resultObj,
            view: 'pages.400',
            data: {
              packageJson,
              title: `Missing "docMap.json" file`,
              error: `In order to work, the "<yellow>doc</yellow>" handler need to have access to the file "<cyan>docMap.json</cyan>" either in your package root directory, either in the specified node_modules directory...`
            }
          });
        }
        // load the docMap from the root of the project
        docMapJson = require(`${pr}/docMap.json`);
      } else {
        // load the docMap from the specified node modules
        docMapJson = require(`${packagePath}/docMap.json`);
      }

      if (docMapJson) {
        if (!docMapJson[params.join('.')]) {
          return resolve({
            ...resultObj,
            view: 'pages.400',
            data: {
              packageJson,
              title: `Missing "${params.join('.')}" namespace in docMap.json`,
              error: `It seems that the wanted documentation namespace "${params.join(
                '.'
              )}" does not exists in the docMap.json file...`
            }
          });
        }

        const docMapItem = docMapJson[params.join('.')];

        const path = __path.resolve(packagePath, docMapItem.path);

        if (!__fs.existsSync(path)) {
          return resolve({
            ...resultObj,
            view: 'pages.400',
            data: {
              packageJson,
              title: `Missing "${path.replace(`${pr}/`, '')}" file`,
              error: `It seems that the wanted documentation file "${path.replace(
                `${pr}/`,
                ''
              )}" does not exists on the filesystem...`
            }
          });
        }

        // load the file
        const content = __fs.readFileSync(path, 'utf8');

        // convert the content into html
        const html = __toHtml(content);

        return resolve({
          ...resultObj,
          view: 'pages.doc',
          data: {
            packageJson,
            body: html,
            title: `${packageJson.name} - ${params.join('.')}`
          }
        });

        // try to get the passed item from the docMap

        // if (sugarJson.views && sugarJson.views.styleguide) {
        //   viewPath = `${packagePath}/${sugarJson.views.styleguide}`;
        // }
        // resultObj.view = viewPath;
        // resultObj.data.currentPackageJson = __standardizeJson(
        //   currentPackageJson
        // );
        // // check if we have a styleguide scss file to load
        // if (sugarJson.scss && sugarJson.scss.styleguide) {
        //   const buildScssCli = new __SBuildScssCli({});
        //   const styleguidePromise = buildScssCli.run({
        //     input: `${packagePath}/${sugarJson.scss.styleguide}`,
        //     sugarJsonDirs: packagePath
        //   });
        //   __SPromise.pipe(styleguidePromise, this);
        //   const styleguideRes = await styleguidePromise;
        //   // parsing the docblock
        //   const docblock = new __SDocblock(styleguideRes.value);
        //   // set the blocks
        //   resultObj.data.css = styleguideRes.value;
        //   resultObj.data.blocks = docblock.toObject();
        // }
      } else {
        resultObj = {
          ...resultObj,
          view: 'pages.400',
          data: {
            packageJson,
            title: `Missing "node_modules/${req.params[0]}/docMap.json`,
            error: `In order to integrate a package into the documentation system, you MUST have a "docMap.json" file at the root of your folder.`
          }
        };
      }

      resolve(resultObj);
    },
    {
      id: 'server.handler.styleguide'
    }
  ).start();
};
