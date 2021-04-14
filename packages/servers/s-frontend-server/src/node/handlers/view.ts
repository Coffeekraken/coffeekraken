// @ts-nocheck

import __path from 'path';
import __SView from '@coffeekraken/s-view';
import __fs from 'fs';
import __SDuration from '@coffeekraken/s-duration';
import __SPromise from '@coffeekraken/s-promise';

/**
 * @name                views
 * @namespace           s-frontendServer.handlers
 * @type                Function
 * @status              wip
 *
 * This function is responsible of responding to express requests made on the "views" section
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          server          The express server instance
 * @return        {Promise}                         A promise that will be resolved with the response to send to the client
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default async function view(req, res, settings = {}) {
  const viewPath = req.params[0].split('/').join('.');

  const viewInstance = new __SView(viewPath);

  const result = await viewInstance.render({
    ...(res.templateData ?? {})
  });

  res.status(404);
  res.type('text/html');
  res.send(result.value);
}
