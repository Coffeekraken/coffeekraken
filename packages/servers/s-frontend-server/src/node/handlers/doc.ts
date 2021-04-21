// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import __SDocMap from '@coffeekraken/s-docmap';
import __SDocblock from '@coffeekraken/s-docblock';
import { SDocblockHtmlRenderer } from '@coffeekraken/s-docblock-renderer';
import __SViewRenderer, { page404 } from '@coffeekraken/s-view-renderer';

/**
 * @name                doc
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 * @status              wip
 *
 * This function is responsible of responding to express requests made on the doc pages
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
let _docmapJson;
export default function doc(req, res, settings = {}) {
  return new __SPromise(async ({ resolve, reject, pipe }) => {
    const docMap = new __SDocMap();
    const namespace = req.path.replace('/doc/', '').trim();

    if (!_docmapJson) {
      _docmapJson = await docMap.read();
    }

    if (!_docmapJson[namespace]) {
      const html = await page404({
        title: `Documentation "${namespace}" not found`,
        body: `The documentation "${namespace}" you requested does not exists...`
      });
      res.type('text/html');
      res.status(404);
      res.send(html.value);
      return reject(html.value);
    }

    // generate the docblocks
    const docblock = new __SDocblock(_docmapJson[namespace].path);

    // render them into html
    const htmlRenderer = new SDocblockHtmlRenderer(docblock);
    const html = await htmlRenderer.render();

    // render the proper template
    const docView = new __SViewRenderer('pages.doc');
    const pageHtml = await docView.render({
      ...(res.templateData || {}),
      body: html
    });

    // _console.log(req);
    res.type('text/html');
    res.status(200);
    res.send(pageHtml.value);
    resolve(pageHtml.value);
  });
}
