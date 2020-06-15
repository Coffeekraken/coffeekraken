const __sugarConfig = require('../../config/sugar');
const __deepMerge = require('../../object/deepMerge');
const __expressServer = require('../express/express');
const __bladePhp = require('../../template/bladePhp');

/**
 * @name                express
 * @namespace           sugar.node.server.frontend
 * @type                Function
 *
 * This function take care of starting a frontend express based server
 *
 * @param         {Object}          [args={}]         The args object to configure the build process. Check the PhpSCli class definition object for available arguments
 * @return        {express}                       The server instance started
 *
 * @example       js
 * const frontendServer = require('@coffeekraken/sugar/node/server/frontend/frontend');
 * frontendServer({});
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = async (args = {}) => {
  args.express = __deepMerge(
    __sugarConfig('frontend.express') || {},
    args.express || {}
  );
  const settings = __deepMerge(__sugarConfig('frontend'), args);
  const viewsSettings = __sugarConfig('views');
  const bladeSettings = __sugarConfig('blade');
  const baseSettings = __sugarConfig('');

  const server = __expressServer(args.express);

  // generate menus
  const menuStack = {};
  Object.keys(settings.menu).forEach(async (menuName) => {
    // generate the menus
    const generatorObj = settings.menu[menuName].generator;
    menuStack[menuName] = await generatorObj.fn(generatorObj.directory);
  });

  console.log(menuStack);

  // loop on pages
  Object.keys(settings.pages).forEach((pageName) => {
    const pageSettings = settings.pages[pageName];

    server.get(`${pageSettings.slug}/*`, async (req, res) => {
      try {
        const response = await pageSettings.handler(req, server);

        // handle response
        const view = response.page || 'pages.default';
        const content = response.content || '404';
        const title = response.title || 'Welcome';

        // render the view
        const result = await __bladePhp(view, {
          title,
          content
        });

        // const result = await __axios.post(
        //   `http://${bladeSettings.server.hostname}:${bladeSettings.server.port}/pages/${page}?rootDir=${viewsSettings.rootDir}&cacheDir=${viewsSettings.cacheDir}`,
        //   {
        //     content,
        //     title,
        //     settings: baseSettings
        //   }
        // );

        res.send(result);
      } catch (e) {
        console.log(e);
        // res.redirect('/404');
      }
    });
  });

  // if (settings.viewEngine === 'bladePhp') {
  //   const bladeSettings = __sugarConfig('blade');
  //   server.get('/views/*', async (req, res) => {
  //     const renderedView = await __request({
  //       url: `http://${bladeSettings.server.hostname}:${
  //         bladeSettings.server.port
  //       }${req.path.substr(6)}?viewsDir=${bladeSettings.viewsDir}&cacheDir=${
  //         bladeSettings.cacheDir
  //       }`,
  //       method: 'GET'
  //     }).catch((e) => {
  //       console.log(e);
  //     });

  //     res.send(renderedView.data);
  //   });
  // }

  return server;
};
