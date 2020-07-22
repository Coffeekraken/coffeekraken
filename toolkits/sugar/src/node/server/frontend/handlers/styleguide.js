const __sugarConfig = require('../../../config/sugar');
const __render = require('../../../template/render');

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
module.exports = function styleguide(req, server) {
  return new Promise(async (resolve, reject) => {
    const viewPath = req.params[0].split('/').join('.');
    resolve({
      view: `styleguide.${viewPath}`
    });
  });
};
