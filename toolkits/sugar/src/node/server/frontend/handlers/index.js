const __path = require('path');
const __fs = require('fs');
const __packageRoot = require('../../../path/packageRoot');
const __SPromise = require('../../../promise/SPromise');

/**
 * @name                index
 * @namespace           node.server.frontend.handlers
 * @type                Function
 *
 * This function is responsible of responding to express requests made on the home page
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          res             The express response object
 * @param         {Object}         [settings={}]    The handler settings
 *
 * @since       2.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function index(req, res, settings = {}) {
  return new __SPromise(
    (resolve, reject, trigger) => {
      return resolve({
        view: 'pages.index',
        data: {
          title: `Hi there!!!`,
          body: 'Something goes wrong...'
        }
      });
    },
    {
      id: 'server.handler.index'
    }
  );
};
