const __glob = require('glob');
const __viewExist = require('../../../functions/viewExist');

/**
 * @name                          viewsFolderJson
 * @namespace                     squid.node.viewsData
 * @type                          Function
 *
 * This function try to find a file named "{viewPath}.{viewId}.data.json" inside the views folder where the view file is stored
 *
 * @param             {String}                  viewPath                The dot view path that you want the data for
 * @param             {String}                  [viewId = null]         The view id to specify which view data you want if the view file is used for multiple display...
 * @return            {Object}                                          The data object that will be passed to the view file on render
 *
 * @example         js
 * // admit you have a folder like this:
 * // -- views/home
 * // --------- header.blade.php
 * // --------- header.myCoolId.data.json
 * viewsFolderJson('home.header', 'myCoolId');
 * // This will return the content of the "header.myCoolId.data.json" file...
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (viewPath, viewId = null) => {

  // check first that the view exist
  // if ( ! __viewExist()) return false;

  // list all the .data.json of the current folder
  console.log(`${process.cwd()}/${__squid.config.views.folder}/${viewPath.replace('.','/')}.*`);
  const dataFiles = __glob.sync(`${process.cwd()}/${__squid.config.views.folder}/${viewPath.replace('.','/')}.*`);

  console.log(dataFiles);

};
