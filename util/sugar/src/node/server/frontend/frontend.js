const __sugarConfig = require('../../config/sugar');
const __deepMerge = require('../../object/deepMerge');
const __expressServer = require('../express/express');
const __bladePhp = require('../../template/bladePhp');
const __SNav = require('../../nav/SNav');
const __deepMap = require('../../object/deepMap');
const __packageRoot = require('../../path/packageRoot');
const __packageJson = require(__packageRoot(process.cwd()) + '/package.json');
const __fs = require('fs');

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
  const settings = __deepMerge(__sugarConfig('frontend'), args);
  const server = __expressServer(settings.express);

  settings.assets = __deepMap(settings.assets, (value, prop) => {
    if (prop === 'path') return value.replace(settings.express.rootDir, '');
    return value;
  });

  // generate menus
  const menuStack = {};
  const sNavInstance = new __SNav('main', 'Main', []);
  Object.keys(settings.menu).forEach(async (menuName) => {
    // generate the menus
    const generatorObj = settings.menu[menuName].generator;
    menuStack[menuName] = await generatorObj.fn(generatorObj.directory);
    // add the nav to the main navigation
    sNavInstance.addItem(menuStack[menuName]);
  });

  // loop on pages
  Object.keys(settings.pages).forEach((pageName) => {
    const pageSettings = settings.pages[pageName];

    // server.get('/', async (req, res) => {
    //   // try to read an "index.html" page
    //   if (__fs.existsSync(__packageRoot(process.cwd()) + '/index.html')) {
    //     const content = __fs.readFileSync(__packageRoot(process.cwd()) + '/index.html', 'utf8');
    //     if (!content.includes('<body')) {

    //     }
    //   }
    //   res.send('Hello');
    // });

    server.get('/', async (req, res) => {
      const indexHtmlPath = __packageRoot(process.cwd()) + '/index.html';
      const indexViewPath = `${__sugarConfig('views.rootDir')}/index.blade.php`;
      console.log('COCOCOC');
      if (__fs.existsSync(indexViewPath)) {
      } else if (__fs.existsSync(indexHtmlPath)) {
        const content = __fs.readFileSync(indexHtmlPath, 'utf8');
        console.log('cont', content);
        if (!content.includes('<body')) {
          console.log('YEA');
          const baseContent = __fs.readFileSync(
            __dirname + '/static/index.html',
            'utf8'
          );
          let result = baseContent
            .replace('{{ title }}', __packageJson.name)
            .replace('{{ style }}', __sugarConfig('assets.css[0].path'))
            .replace('{{ script }}', __sugarConfig('assets.js[0].path'))
            .replace('{{ content }}', content);
          res.send(result);
        } else {
          res.send(content);
        }
      }
    });

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
          content,
          package: JSON.stringify(__packageJson),
          menuHtml: sNavInstance.toHtml(),
          settings: JSON.stringify(settings)
        });

        res.send(result);
      } catch (e) {
        console.log(e);
        // res.redirect('/404');
      }
    });
  });
  return server;
};
