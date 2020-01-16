const __viewExist = require('./viewExist');

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
module.exports = (viewPath, viewId = null) => {

  let filePath = __viewExist(viewPath);

  // check that the asked view exist
  if ( ! filePath ) {
    return false;
  }

  // try to find the data from the views folder


  console.log(filePath);

  // find
}
