const __sugarConfig = require('../../../config/sugar');
const __request = require('../../../http/request');
const __SPromise = require('../../../promise/SPromise');
const __fs = require('fs');
const __path = require('path');

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
module.exports = function views(req, res, settings = {}) {
  return new __SPromise(
    (resolve, reject, trigger) => {
      let params = req.params[0].split('/');

      const rootDirs = [
        __sugarConfig('views.rootDir'),
        __path.resolve(__dirname, '../views')
      ];
      if (settings.rootDir) {
        rootDirs.unshift(settings.rootDir);
      }

      for (let i = 0; i < rootDirs.length; i++) {
        const rootDir = rootDirs[i];
        const viewPath = __path.resolve(rootDir, params.join('/'));
        // if (__fs.existsSync())
        //       if (__fs.existsSync(__path.resolve(rootDir, params.join('/'))))
      }

      return false;

      return resolve({
        view: params.join('.'),
        data: {
          ...(req.query || {}),
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
// module.exports = function views(req, server) {
//   return new Promise(async (resolve, reject) => {
//     const viewEngine = server.get('view engine');

//     if (viewEngine === 'bladePhp') {
//       const bladeSettings = __sugarConfig('blade');
//       const viewsSettings = __sugarConfig('views');

//       const renderedView = await __request({
//         url: `http://${bladeSettings.server.hostname}:${
//           bladeSettings.server.port
//         }${req.path.substr(6)}?rootDir=${viewsSettings.rootDir}&cacheDir=${
//           viewsSettings.cacheDir
//         }`,
//         method: 'POST'
//       }).catch((e) => {
//         console.log(e);
//       });
//       resolve(renderedView.data);
//     }

//     // resolve(path);
//   });
// };
