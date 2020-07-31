const __sugarConfig = require('../../config/sugar');
const __deepMerge = require('../../object/deepMerge');
const __express = require('express');
const __uncamelize = require('../../string/uncamelize');
const __request = require('../../http/request');
const __packageRoot = require('../../path/packageRoot');
const __SPromise = require('../../promise/SPromise');

/**
 * @name                express
 * @namespace           node.server.express
 * @type                Function
 *
 * This function take care of starting an express server
 *
 * @param         {Object}          [args={}]         The args object to configure the build process. Check the PhpSCli class definition object for available arguments
 * @return        {express}                       The server instance started
 *
 * @example       js
 * const expressServer = require('@coffeekraken/sugar/node/server/express');
 * expressServer({});
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = (args = {}) => {
  const settings = __deepMerge(__sugarConfig('express'), args);
  const server = __express();

  const promise = new __SPromise((resolve, reject, trigger, cancel) => {
    server.use(
      settings.staticDir.replace(__packageRoot(process.cwd()), ''),
      __express.static(settings.staticDir)
    );

    Object.keys(settings).forEach((name) => {
      server.set(__uncamelize(name, ' ').toLowerCase(), settings[name]);
    });

    // Object.keys(files).forEach((path) => {
    //   const fileObj = files[path];
    //   const namespace = fileObj.line[0].replace('@namespace', '').trim();
    //   server.get(`/${namespace.split('.').join('/')}`, function (req, res) {
    //     res.render(path, { title: 'Hey', message: 'Hello there!' });
    //   });
    // });

    server.listen(settings.port, settings.hostname);
    // return server;
  }).start();

  promise.server = server;
  return promise;
};
