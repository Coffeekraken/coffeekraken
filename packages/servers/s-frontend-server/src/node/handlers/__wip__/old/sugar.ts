// @ts-nocheck

import __path from 'path';
import __fs from 'fs';
import __packageRootDir from '../../../path/packageRootDir';
import __SPromise from '../../../promise/SPromise';
import __packageJson from '../../../package/json';
import __SugarConfig from '../../../config/sugar';
import __STemplate from '../../../template/STemplate';
import STemplate from '../../../template/STemplate';

/**
 * @name                sugar
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 * @status              wip
 *
 * This function is responsible of responding to express requests made on the sugar home page
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          res             The express response object
 * @param         {Object}         [settings={}]    The handler settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function sugar(req, res, settings = {}) {
  // search for the view to render
  const packageRoot = __packageRootDir();
  const packageJson = __packageJson();

  let body, content, view, title, error;

  // index.html file at root
  if (__fs.existsSync(`${packageRoot}/index.html`)) {
    const html = __fs.readFileSync(`${packageRoot}/index.html`, 'utf8');
    body = html;
    title = packageJson.name;
    view = 'pages.index';
  } else {
    const viewsDir = __SugarConfig.get('frontend.viewsDir');
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
            `${__packageRootDir()}/`,
            ''
          );
        })
        .join('\n-')}
      `;
    }
  }
  return new __SPromise(
    ({ resolve, reject, emit }) => {
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
      id: 'frontendServerSugarHandler'
    }
  );
}
export default sugar;
