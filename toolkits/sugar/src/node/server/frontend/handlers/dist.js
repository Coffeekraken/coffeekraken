const __packageRoot = require('../../../path/packageRoot');
const __SPromise = require('../../../promise/SPromise');
const __fs = require('fs');
const __path = require('path');

/**
 * @name                dist
 * @namespace           node.server.frontend.handlers
 * @type                Function
 *
 * This function is responsible of responding to express requests made on the "dist" section
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          server          The express server instance
 * @return        {Promise}                         A promise that will be resolved with the response to send to the client
 *
 * @since       2.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function dist(req, server, settings = {}) {
  return new __SPromise(
    async function (resolve, reject, trigger) {
      // check if the passed request point to a valid coffeekraken sugar ready package
      const pr = __packageRoot();
      let params = req.params[0].split('/');
      let filepath, filetype;

      // loop on directories to check if we can find the specified file
      for (let i in settings.directories) {
        const dir = settings.directories[i];
        const potentialFilepath = __path.resolve(dir, params.join('/'));
        if (__fs.existsSync(potentialFilepath)) {
          filepath = potentialFilepath;
          filetype = filepath.split('.').slice(1).join('.');
          break;
        }
      }

      // read the file
      const content = __fs.readFileSync(filepath, 'utf8');

      resolve({
        data: content,
        type: `.${filetype}`
      });
    },
    {
      id: 'server.handler.dist'
    }
  ).start();
};
