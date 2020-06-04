const __sugarConfig = require('../config/sugar');
const __deepMerge = require('../object/deepMerge');
const __express = require('express');
const __path = require('path');
const __packageRoot = require('../path/packageRoot');
const __uncamelize = require('../string/uncamelize');
const __find = require('find-in-files');
const __request = require('../http/request');

/**
 * @name                express
 * @namespace           sugar.node.server
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
module.exports = async (args = {}) => {
  const settings = __deepMerge(__sugarConfig('express'), args);
  const server = __express();
  server.use(__express.static(settings.rootDir));

  Object.keys(settings).forEach((name) => {
    server.set(__uncamelize(name, ' ').toLowerCase(), settings[name]);
  });

  if (settings.viewEngine === 'bladePhp') {
    const bladeSettings = __sugarConfig('blade');
    server.get('/views/*', async (req, res) => {
      const renderedView = await __request({
        url: `http://${bladeSettings.server.hostname}:${
          bladeSettings.server.port
        }${req.path.substr(6)}?viewsDir=${bladeSettings.viewsDir}&cacheDir=${
          bladeSettings.cacheDir
        }`,
        method: 'GET'
      }).catch((e) => {
        console.log(e);
      });

      res.send(renderedView.data);
    });
  }

  // Object.keys(files).forEach((path) => {
  //   const fileObj = files[path];
  //   const namespace = fileObj.line[0].replace('@namespace', '').trim();
  //   server.get(`/${namespace.split('.').join('/')}`, function (req, res) {
  //     res.render(path, { title: 'Hey', message: 'Hello there!' });
  //   });
  // });

  server.listen(settings.port, settings.hostname);
  return server;
};
