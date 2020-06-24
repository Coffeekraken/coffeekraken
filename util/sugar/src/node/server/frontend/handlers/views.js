const __sugarConfig = require('../../../config/sugar');
const __request = require('../../../http/request');

/**
 * @name                views
 * @namespace           node.server.frontend.handlers
 * @type                Function
 *
 * This function is responsible of responding to express requests made on the "views" section
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          server          The express server instance
 * @return        {Promise}                         A promise that will be resolved with the response to send to the client
 *
 * @since       2.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function views(req, server) {
  return new Promise(async (resolve, reject) => {
    const viewEngine = server.get('view engine');

    if (viewEngine === 'bladePhp') {
      const bladeSettings = __sugarConfig('blade');
      const viewsSettings = __sugarConfig('views');

      const renderedView = await __request({
        url: `http://${bladeSettings.server.hostname}:${
          bladeSettings.server.port
        }${req.path.substr(6)}?rootDir=${viewsSettings.rootDir}&cacheDir=${
          viewsSettings.cacheDir
        }`,
        method: 'POST'
      }).catch((e) => {
        console.log(e);
      });
      resolve(renderedView.data);
    }

    // resolve(path);
  });
};
