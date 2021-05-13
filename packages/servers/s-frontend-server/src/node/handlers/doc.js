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
import __SDocMap from '@coffeekraken/s-docmap';
import __SDocblock from '@coffeekraken/s-docblock';
import { SDocblockHtmlRenderer } from '@coffeekraken/s-docblock-renderer';
import __SViewRenderer, { page404 } from '@coffeekraken/s-view-renderer';
import __minimatch from 'minimatch';
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
    return new __SPromise(({ resolve, reject, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const docMap = new __SDocMap();
        const requestedNamespace = req.path.replace('/doc/', '').trim();
        const readPromise = docMap.read();
        pipe(readPromise);
        _docmapJson = yield readPromise;
        const filteredDocmapObj = {};
        Object.keys(_docmapJson).forEach((namespace) => {
            if (namespace === requestedNamespace ||
                __minimatch(namespace, `${requestedNamespace}.**`)) {
                filteredDocmapObj[namespace] = _docmapJson[namespace];
            }
        });
        const docsHtml = [];
        for (let i = 0; i < Object.keys(filteredDocmapObj).length; i++) {
            const docmapObj = filteredDocmapObj[Object.keys(filteredDocmapObj)[i]];
            // generate the docblocks
            const docblock = new __SDocblock(docmapObj.path, {});
            if (i < 1) {
                // render them into html
                const htmlRenderer = new SDocblockHtmlRenderer(docblock);
                const html = yield htmlRenderer.render();
                docsHtml.push(html);
            }
            else {
                docsHtml.push(`
          <s-docblock-to-html>
            ${docblock.toString()}
          </s-docblock-to-html>
        `);
            }
        }
        if (!docsHtml.length) {
            const html = yield page404({
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
        const pageHtml = yield docView.render(Object.assign(Object.assign({}, (res.templateData || {})), { body: docsHtml.join('\n') }));
        res.type('text/html');
        res.status(200);
        res.send(pageHtml.value);
        resolve(pageHtml.value);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQztBQUMvQyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUMxRSxPQUFPLGVBQWUsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRXpFLE9BQU8sV0FBVyxNQUFNLFdBQVcsQ0FBQztBQUVwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsSUFBSSxXQUFXLENBQUM7QUFDaEIsTUFBTSxDQUFDLE9BQU8sVUFBVSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNqRCxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDeEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUMvQixNQUFNLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVoRSxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFdBQVcsR0FBRyxNQUFNLFdBQVcsQ0FBQztRQUVoQyxNQUFNLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQzdDLElBQ0UsU0FBUyxLQUFLLGtCQUFrQjtnQkFDaEMsV0FBVyxDQUFDLFNBQVMsRUFBRSxHQUFHLGtCQUFrQixLQUFLLENBQUMsRUFDbEQ7Z0JBQ0EsaUJBQWlCLENBQUMsU0FBUyxDQUFDLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3ZEO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLFFBQVEsR0FBYSxFQUFFLENBQUM7UUFDOUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDOUQsTUFBTSxTQUFTLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkUseUJBQXlCO1lBQ3pCLE1BQU0sUUFBUSxHQUFHLElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFckQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNULHdCQUF3QjtnQkFDeEIsTUFBTSxZQUFZLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDekQsTUFBTSxJQUFJLEdBQUcsTUFBTSxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3pDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDckI7aUJBQU07Z0JBQ0wsUUFBUSxDQUFDLElBQUksQ0FBQzs7Y0FFUixRQUFRLENBQUMsUUFBUSxFQUFFOztTQUV4QixDQUFDLENBQUM7YUFDSjtTQUNGO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDcEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxPQUFPLENBQUM7Z0JBQ3pCLEtBQUssRUFBRSxrQkFBa0IsU0FBUyxhQUFhO2dCQUMvQyxJQUFJLEVBQUUsc0JBQXNCLFNBQVMsb0NBQW9DO2FBQzFFLENBQUMsQ0FBQztZQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0I7UUFFRCw2QkFBNkI7UUFDN0IsTUFBTSxPQUFPLEdBQUcsSUFBSSxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakQsTUFBTSxRQUFRLEdBQUcsTUFBTSxPQUFPLENBQUMsTUFBTSxpQ0FDaEMsQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxLQUMzQixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFDekIsQ0FBQztRQUVILEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDTCxDQUFDIn0=