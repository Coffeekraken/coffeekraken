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

    const readPromise = docMap.read();
    pipe(readPromise);
    _docmapJson = await readPromise;

    const pathes = {};
    Object.keys(_docmapJson).forEach((docmapNamespace) => {
      console.log(docmapNamespace, namespace);
      if (docmapNamespace.startsWith(namespace)) {
        if (!pathes[_docmapJson[docmapNamespace].path]) {
          pathes[_docmapJson[docmapNamespace].path] = [];
        }
        pathes[_docmapJson[docmapNamespace].path].push(
          _docmapJson[docmapNamespace]
        );
      }
    });

    console.log(Object.keys(pathes));

    const docsHtml: string[] = [];
    Object.keys(pathes).forEach((path) => {
      console.log(
        'NAMES',
        pathes[path].map((docmapObj) => docmapObj.namespace)
      );

      // generate the docblocks
      const docblock = new __SDocblock(path, {
        docblock: {
          filterByTag: {
            namespace: pathes[path].map((docmapObj) => docmapObj.namespace)
          }
        }
      });
      // // render them into html
      // const htmlRenderer = new SDocblockHtmlRenderer(docblock);
      // const html = await htmlRenderer.render();
      // console.log(_docmapJson[docmapNamespace].path);
      docsHtml.push();
    });

    return;

    if (!docsHtml.length) {
      const html = await page404({
        title: `Documentation "${namespace}" not found`,
        body: `The documentation "${namespace}" you requested does not exists...`
      });
      res.type('text/html');
      res.status(404);
      res.send(html.value);
      return reject(html.value);
    }

    // render the proper template
    const docView = new __SViewRenderer('pages.doc');
    const pageHtml = await docView.render({
      ...(res.templateData || {}),
      body: docsHtml.join('\n')
    });

    // _console.log(req);
    res.type('text/html');
    res.status(200);
    res.send(pageHtml.value);
    resolve(pageHtml.value);
  });
}
