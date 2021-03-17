// @ts-nocheck

import __sugarConfig from '../../../config/sugar';
import __path from 'path';
import __render from '../../../template/render';
import __STemplate from '../../../template/STemplate';
import __fs from 'fs';
import __SDuration from '../../../../shared/time/SDuration';
import __SPromise, { reject } from '@coffeekraken/s-promise';

/**
 * @name                views
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 * @status              wip
 *
 * This function is responsible of responding to express requests made on the "views" section
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          server          The express server instance
 * @return        {Promise}                         A promise that will be resolved with the response to send to the client
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function views(req, res, settings = {}) {
  return new __SPromise(async ({ resolve, reject, pipe }) => {
    let params = req.params[0].split('/');

    const duration = new __SDuration();

    let rootDirs = __STemplate.getRootDirs(settings.rootDir || []);

    for (let i = 0; i < rootDirs.length; i++) {
      const rootDir = rootDirs[i];

      for (let j = 0; j < Object.keys(__STemplate.engines).length; j++) {
        const engineExt = Object.keys(__STemplate.engines)[j];

        const viewPath =
          __path.resolve(rootDir, params.join('/')) + `.${engineExt}`;

        if (__fs.existsSync(viewPath)) {
          const relativeViewPath = __path.relative(rootDir, viewPath);
          const templateInstance = new __STemplate(relativeViewPath, {
            rootDirs
          });
          const resultPromise = templateInstance.render({
            ...(res.templateData || {})
          });
          pipe(resultPromise);
          const resultObj = await resultPromise;
          resolve(
            `<bgGreen><black> views </black></bgGreen> file "<yellow>${
              req.path
            }</yellow> served in <cyan>${duration.end()}s</cyan>"`
          );
          res.status(200);
          res.type('text/html');
          return res.send(resultObj.content);
        }
      }
    }

    // view not found
    const notFoundTemplateInstance = new __STemplate('pages.404', {
      rootDir: rootDirs
    });

    const notFoundObj = await notFoundTemplateInstance.render({
      ...(res.templateData || {}),
      title: `View not found...`,
      error: `The requested view "${
        req.path
      }" does not exists in any of these directories:
      <ol>  
      ${notFoundTemplateInstance._settings.rootDir.map((dir) => {
        return `<li>${dir}</li>`;
      })}
      </ol>
      `
    });

    res.status(404);
    res.type('text/html');
    res.send(notFoundObj.content);
    reject(notFoundObj.content);
  });
}
