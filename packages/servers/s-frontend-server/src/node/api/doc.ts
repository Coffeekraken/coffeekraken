// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import __SDocMap from '@coffeekraken/s-docmap';
import __SDocblock from '@coffeekraken/s-docblock';
import { SDocblockHtmlRenderer } from '@coffeekraken/s-docblock-renderer';
import __SViewRenderer, { page404 } from '@coffeekraken/s-view-renderer';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __minimatch from 'minimatch';

/**
 * @name                doc
 * @namespace           sugar.node.server.frontend.api
 * @type                Function
 * @status              wip
 *
 * This function is responsible of responding to express requests made on the api doc endpoint
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
    // const docMap = new __SDocMap();
    // const requestedNamespace = req.path.replace('/doc/', '').trim();

    // const readPromise = docMap.read();
    // pipe(readPromise);
    // _docmapJson = await readPromise;

    // const filteredDocmapObj = {};
    // Object.keys(_docmapJson).forEach((namespace) => {
    //   if (
    //     namespace === requestedNamespace ||
    //     __minimatch(namespace, `${requestedNamespace}.**`)
    //   ) {
    //     filteredDocmapObj[namespace] = _docmapJson[namespace];
    //   }
    // });

    // const docsHtml: string[] = [];
    // for (let i = 0; i < Object.keys(filteredDocmapObj).length; i++) {
    //   const docmapObj = filteredDocmapObj[Object.keys(filteredDocmapObj)[i]];
    //   // generate the docblocks
    //   const docblock = new __SDocblock(docmapObj.path, {});

    //   if (i < 1) {
    //     // render them into html
    //     const htmlRenderer = new SDocblockHtmlRenderer(docblock);
    //     const html = await htmlRenderer.render();
    //     docsHtml.push(html);
    //   } else {
    //     docsHtml.push(`
    //       <s-docblock-to-html>
    //         ${docblock.toString()}
    //       </s-docblock-to-html>
    //     `);
    //   }
    // }

    // if (!docsHtml.length) {
    //   const html = await page404({
    //     title: `Documentation "${namespace}" not found`,
    //     body: `The documentation "${namespace}" you requested does not exists...`
    //   });
    //   res.type('text/html');
    //   res.status(404);
    //   res.send(html.value);
    //   return reject(html.value);
    // }

    res.type('application/json');
    res.status(200);
    // res.send(_docmapJson);
    // resolve(_docmapJson);
  });
}
