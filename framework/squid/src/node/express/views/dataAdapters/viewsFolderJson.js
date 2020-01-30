const __glob = require('glob');
const __viewExist = require('../../../express/views/viewExist');
const __deepMerge = require('@coffeekraken/sugar/js/object/deepMerge');

/**
 * @name                          viewsFolderJson
 * @namespace                     squid.node.viewsData
 * @type                          Function
 *
 * This function try to find a file named "{viewPath}.{viewId}.data.json" inside the views folder where the view file is stored
 *
 * @param             {String}                  viewPath                The dot view path that you want the data for
 * @param             {String}                  [viewId = null]         The view id to specify which view data you want if the view file is used for multiple display...
 * @param             {Object}                  viewConfig              The view config
 * @param             {Object}                  req                     The req express controller object
 * @return            {Promise}                                         A promise that need to be resolved with the view data retreived passed as parameter
 *
 * @example         js
 * // admit you have a folder like this:
 * // -- views/home
 * // --------- header.blade.php
 * // --------- header.myCoolId.data.json
 * viewsFolderJson('home.header', 'myCoolId').then(data => { //... });
 * // This will return the content of the "header.myCoolId.data.json" file...
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (viewPath, viewId = null, viewConfig, req) => {
  return new Promise(async (resolve, reject) => {

    // check first that the view exist
    if ( ! __viewExist(viewPath)) return reject(`No ${viewPath.replace('.','/')}${(viewId) ? '.' + viewId : ''}.data.json exists...`);

    let dataFiles, viewData = {};

    const viewPathJsonPath = `${process.cwd()}/${await Squid.config('views.folder')}/${viewPath.replace('.','/')}.data.json`;
    dataFiles = __glob.sync(viewPathJsonPath);
    if (dataFiles.length) {
      viewData = require(dataFiles[0]);
    }

    if (viewId) {
      const viewPathWithIdJsonPath = `${process.cwd()}/${await Squid.config('views.folder')}/${viewPath.replace('.','/')}.${viewId}.data.json`;
      dataFiles = __glob.sync(viewPathWithIdJsonPath);
      if (dataFiles.length) {
        viewData = __deepMerge(dataView, require(dataFiles[0]));
      }
    }

    // resolve the promise passing the data as parameter
    resolve(viewData);

  });
};
