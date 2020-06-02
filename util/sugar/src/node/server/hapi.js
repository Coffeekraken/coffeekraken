const __Hapi = require('@hapi/hapi');
const __sugarConfig = require('../config/sugar');
const __deepMerge = require('../object/deepMerge');

/**
 * @name                hapi
 * @namespace           sugar.node.server
 * @type                Function
 *
 * This function take care of starting an Hapi server
 *
 * @param         {Object}          [args={}]         The args object to configure the build process. Check the PhpSCli class definition object for available arguments
 * @return        {Hapi.server}                       The server instance started
 *
 * @example       js
 * const hapiServer = require('@coffeekraken/sugar/node/server/hapi');
 * hapiServer({});
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = async (args = {}) => {
  const settings = __deepMerge(__sugarConfig('server.hapi'), args);
  const finalSettings = {
    host: settings.host,
    port: settings.port,
    routes: {
      files: {
        relativeTo: settings.rootDir
      }
    }
  };
  const server = __Hapi.server(finalSettings);
  await server.register(require('@hapi/inert'));

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true
      }
    }
  });

  await server.start();
  return server;
};
