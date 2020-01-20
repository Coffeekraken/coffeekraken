const __viewExist = require('./viewExist');
const __fs = require('fs');
const __deepMerge = require('@coffeekraken/sugar/js/object/deepMerge');

/**
 * @name                    getViewConfig
 * @namespace               squid.node.express.views
 * @type                    Function
 *
 * Get the config view object back. The config can be find in a specific view file named "{viewPath}.{viewId}.config.js"
 * or in a generic views config file at the root of the views folder named "views.config.js".
 * In the "views.config.js" file, you need to specify your view which have a viewPath like "home.header" and an viewId of "plop" like so:
 * // {
 * //   default: {
 * //     // the default config applied to every views...
 * //   },
 * //   "home.header#plop": {
 * //     // your "home/header.plop.blade.php" view config here...
 * //   }
 * // }
 * If a "default" parameter object is defined in the "views.config.js" file, the config specified here will be applied to
 * every views, even to the views that have a specific config files. In that case, the final view config is the "default"
 * object of the "views.config.js" file deep merged with the config of the specific view config file.
 *
 * @param               {String}                  viewPath                The dot view path to get the config from
 * @param               {String}                  [viewId=null]           A specific view id to get the config from
 * @return              {Object}                                          The final view config object
 *
 * @example           js
 * squid.express.views.getViewConfig('home.header'); // return the view config object
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (viewPath, viewId = null) => {

  let filePath = __viewExist(viewPath);

  // check that the asked view exist
  if ( ! filePath ) {
    return false;
  }

  // get the view conf
  let finalViewConfig = {},
      fileViewConfig = {},
      fileIdViewConfig = {},
      generalViewConfig = {},
      generalIdViewConfig = {};


  let confFilePath = `${process.cwd()}/${__squid.config.views.folder}/${viewPath.replace('.','/')}`;
  if (__fs.existsSync(`${confFilePath}.config.js`)) {
    fileViewConfig = require(`${confFilePath}.config.js`);
  }
  if (viewId && __fs.existsSync(`${confFilePath}.${viewId}.config.js`)) {
    fileIdViewConfig = require(`${confFilePath}.${viewId}.config.js`);
  }

  if (__fs.existsSync(`${process.cwd()}/${__squid.config.views.folder}/views.conf.js`)) {
    const generalViewsConfig = require(`${process.cwd()}/${__squid.config.views.folder}/views.conf.js`);
    if (generalViewConfig[viewPath]) {
      generalViewConfig = generalViewConfig[viewPath];
    }
    if (generalViewsConfig[`${viewPath}#${viewId}`]) {
      generalIdViewConfig = generalViewsConfig[`${viewPath}#${viewId}`];
    }
  }

  // mix all the configs
  finalViewConfig = __deepMerge(finalViewConfig, generalViewConfig);
  finalViewConfig = __deepMerge(finalViewConfig, fileViewConfig);
  finalViewConfig = __deepMerge(finalViewConfig, generalIdViewConfig);
  finalViewConfig = __deepMerge(finalViewConfig, fileIdViewConfig);

  // check that an adapter is specified for the view, or if it's not defined or that it not exist in the registered
  // adapters, set the view adapter using the defaultViewAdapter defined in the general config
  if ( ! finalViewConfig.dataAdapter || ! __squid.config.views.dataAdapters[finalViewConfig.dataAdapter]) {
    finalViewConfig.dataAdapter = __squid.config.views.defaultDataAdapter;
  }

  // return the config object
  return finalViewConfig;

}
