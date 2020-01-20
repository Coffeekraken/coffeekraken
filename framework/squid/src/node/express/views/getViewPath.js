const __viewExist = require('./viewExist');

/**
 * @name                    getViewPath
 * @namespace               squid.node.express.views
 * @type                    Function
 *
 * Pass a viewPath and an optional viewId and get back the view file path back. Id a viewId is passed and
 * that the view with id file path does not exist, the path the the view without id will be returned
 *
 * @param           {String}            viewPath            The dot view path
 * @param           {String}            [viewId=null]       An optional view id to specify more the view wanted.
 * @return          {String}                                The view file path
 *
 * @example         js
 * squid.express.views.getViewPath('home.header'); // /my/cool/file/path/views/home/header.blade.php
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (viewPath, viewId = null) => {
  const viewFilePath = __viewExist(viewPath, viewId);
  if (viewFilePath) return viewFilePath;
  else return false;
}
