// @ts-nocheck

import __SPromise from '../../../promise/SPromise';
import __SScssCompiler from '../../../scss/compile/SScssCompiler';
import __SDuration from '../../../time/SDuration';
import __SScssCompilerParamsInterface from '../../../scss/compile/interface/SScssCompilerParamsInterface';
import __SDocMap from '../../../docMap/SDocMap';
import __page404 from '../../../template/pages/404';
import __SDocblock from '../../../docblock/SDocblock';
import __SDocblockHtmlRenderer from '../../../docblock/renderers/SDocblockHtmlRenderer';
import __render from '../../../template/render';

/**
 * @name                doc
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 * @status              wip
 *
 * This function is responsible of responding to express requests made on the doc pages
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
export default function doc(req, res, settings = {}) {
  return new __SPromise(async ({ resolve, reject, pipe }) => {
    const docMap = new __SDocMap();
    const namespace = req.path.replace('/doc/', '').trim();
    const docMapJson = await docMap.read();
    if (!docMapJson[namespace]) {
      const html = await __page404({
        title: `Documentation "${namespace}" not found`,
        body: `The documentation "${namespace}" you requested does not exists...`
      });
      res.type('text/html');
      res.status(404);
      res.send(html);
      return reject(html);
    }

    // generate the docblocks
    const docblock = new __SDocblock(docMapJson[namespace].path);

    // render them into html
    const htmlRenderer = new __SDocblockHtmlRenderer(docblock);
    const html = await htmlRenderer.render();

    // render the proper template
    const pageHtml = await __render('pages.doc', {
      ...(res.templateData || {}),
      body: html
    });

    // nativeConsole.log(req);
    res.type('text/html');
    res.status(200);
    res.send(pageHtml.content);
    resolve(pageHtml.content);
  });
}
