// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import __SViewRenderer, { page404 } from '@coffeekraken/s-view-renderer';
import __SBench from '@coffeekraken/s-bench';

/**
 * @name                index
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 * @status              wip
 *
 * This function is responsible of responding to express requests made on the index pages
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          res             The express response object
 * @param         {Object}         [settings={}]    The handler settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function doc(req, res, settings = {}) {
  return new __SPromise(async ({ resolve, reject, pipe, emit }) => {

    // render the proper template
    const indexView = new __SViewRenderer('index');
    const pageHtml = await indexView.render({
      ...(res.templateData || {}),
      body: 'Hello world'
    });

    // _console.log(req);
    res.type('text/html');
    res.status(200);
    res.send(pageHtml.value);
    resolve(pageHtml.value);
  });
}
