const __fs = require('fs');
const __path = require('path');
const __viewExist = require('./viewExist');
const __getViewConfig = require('./getViewConfig');
const __getViewPath = require('./getViewPath');

/**
 * @name                            getViewMetas
 * @namespace                       squid.node.functions
 * @type                            Function
 *
 * Retreive the passed view metas like the view file path, the view data object if one exist, etc...
 *
 * @param           {String}                viewPath                          The dot view path wanted
 * @param           {String}                [viewId = null]                   An id to specify the metas that you want if you have multiple "view" that is using the same "viewFile"
 * @return          {Object}                                                  The object representing the view metas
 *
 * @example         js
 * // admit you have a folder like this:
 * // -- views/home
 * // --------- header.blade.php
 * // --------- header.myCoolId.data.json
 * getViewMetas('home.header', 'myCoolId');
 * {
 *    id: 'myCoolId',
 *    viewPath: 'home.header',
 *    filePath: '/views/home/header.blade.php',
 *    data: {
 *      hello: 'World'
 *    }
 * }
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = async (viewPath, viewId = null) => {

  // get the view config
  const viewConfig = await __getViewConfig(viewPath, viewId);

  // get the view path
  const viewFilePath = await __getViewPath(viewPath, viewId);

  // get the view extension
  let viewExtension = viewFilePath.split('/');
  viewExtension.shift();
  viewExtension = viewExtension[viewExtension.length - 1];
  viewExtension = viewExtension.split('.');
  viewExtension.shift();
  if (viewExtension[0] === viewId) viewExtension.shift();
  viewExtension = viewExtension.join('.');

  // return the metas
  return {
    id: viewId,
    path: viewPath,
    renderPath: __path.resolve(viewFilePath.replace(process.cwd(), '').replace(await Squid.config('views.folder'), '')).replace(viewExtension, '').slice(1).slice(0, -1),
    extension: viewExtension,
    enginePath: (await Squid.config('views.engines'))[viewExtension],
    dataAdapterPath: (await Squid.config('views.dataAdapters'))[viewConfig.dataAdapter],
    filePath: viewFilePath,
    config: viewConfig
  };

}
