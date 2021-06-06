// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SPromise from '@coffeekraken/s-promise';
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
    return new __SPromise(({ resolve, reject, pipe }) => __awaiter(this, void 0, void 0, function* () {
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
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQVFqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsSUFBSSxXQUFXLENBQUM7QUFDaEIsTUFBTSxDQUFDLE9BQU8sVUFBVSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNqRCxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDeEQsa0NBQWtDO1FBQ2xDLG1FQUFtRTtRQUVuRSxxQ0FBcUM7UUFDckMscUJBQXFCO1FBQ3JCLG1DQUFtQztRQUVuQyxnQ0FBZ0M7UUFDaEMsb0RBQW9EO1FBQ3BELFNBQVM7UUFDVCwwQ0FBMEM7UUFDMUMseURBQXlEO1FBQ3pELFFBQVE7UUFDUiw2REFBNkQ7UUFDN0QsTUFBTTtRQUNOLE1BQU07UUFFTixpQ0FBaUM7UUFDakMsb0VBQW9FO1FBQ3BFLDRFQUE0RTtRQUM1RSw4QkFBOEI7UUFDOUIsMERBQTBEO1FBRTFELGlCQUFpQjtRQUNqQiwrQkFBK0I7UUFDL0IsZ0VBQWdFO1FBQ2hFLGdEQUFnRDtRQUNoRCwyQkFBMkI7UUFDM0IsYUFBYTtRQUNiLHNCQUFzQjtRQUN0Qiw2QkFBNkI7UUFDN0IsaUNBQWlDO1FBQ2pDLDhCQUE4QjtRQUM5QixVQUFVO1FBQ1YsTUFBTTtRQUNOLElBQUk7UUFFSiwwQkFBMEI7UUFDMUIsaUNBQWlDO1FBQ2pDLHVEQUF1RDtRQUN2RCxnRkFBZ0Y7UUFDaEYsUUFBUTtRQUNSLDJCQUEyQjtRQUMzQixxQkFBcUI7UUFDckIsMEJBQTBCO1FBQzFCLCtCQUErQjtRQUMvQixJQUFJO1FBRUosR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzdCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIseUJBQXlCO1FBQ3pCLHdCQUF3QjtJQUMxQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyJ9