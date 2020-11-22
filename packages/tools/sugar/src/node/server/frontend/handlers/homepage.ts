const __path = require('path');
const __fs = require('fs');
const __packageRoot = require('../../../path/packageRoot');
const __SPromise = require('../../../promise/SPromise');
const __packageJson = require('../../../package/json');
const __sugarConfig = require('../../../config/sugar');
const __STemplate = require('../../../template/STemplate');
const STemplate = require('../../../template/STemplate');

/**
 * @name                homepage
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 *
 * This function is responsible of responding to express requests made on the home page
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          res             The express response object
 * @param         {Object}         [settings={}]    The handler settings
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function homepage(req, res, settings = {}) {
  // search for the view to render
  const packageRoot = __packageRoot();
  const packageJson = __packageJson();

  let body, content, view, title, error;

  // index.html file at root
  if (__fs.existsSync(`${packageRoot}/index.html`)) {
    const html = __fs.readFileSync(`${packageRoot}/index.html`, 'utf8');
    body = html;
    title = packageJson.name;
    view = 'pages.index';
  } else {
    const viewsDir = __sugarConfig('frontend.viewsDir');
    const viewInfoObj = __STemplate.getViewInfo(`${viewsDir}/index`);
    if (viewInfoObj) {
      view = viewInfoObj.relPath;
    } else {
      view = 'pages.404';
      title = `Index view not found...`;
      error = `No index view has been found. You have these choices:
      - index.html
      ${Object.keys(STemplate.engines)
        .map((engine) => {
          return `- ${viewsDir}/index.${engine}`.replace(
            `${__packageRoot()}/`,
            ''
          );
        })
        .join('\n-')}
      `;
    }
  }
  return new __SPromise(
    (resolve, reject, trigger) => {
      return resolve({
        content,
        view,
        data: {
          title: `${packageJson.name}`,
          body,
          error
        }
      });
    },
    {
      id: 'frontendServerHomepageHandler'
    }
  );
};
