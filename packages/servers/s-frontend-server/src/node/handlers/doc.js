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
        const docblocks = [];
        for (let i = 0; i < Object.keys(filteredDocmapObj).length; i++) {
            const docmapObj = filteredDocmapObj[Object.keys(filteredDocmapObj)[i]];
            // generate the docblocks
            console.log(docmapObj.path);
            const docblock = new __SDocblock(docmapObj.path, {});
            docblocks.push(docblock.toObject());
            // if (i < 1) {
            //   // render them into html
            //   const htmlRenderer = new SDocblockHtmlRenderer(docblock);
            //   const html = await htmlRenderer.render();
            //   docsHtml.push(html);
            // } else {
            //   docsHtml.push(`
            //     <s-docblock-to-html>
            //       ${docblock.toString()}
            //     </s-docblock-to-html>
            //   `);
            // }
        }
        // console.log(docblocks);
        if (!docblocks.length) {
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
        const docView = new __SViewRenderer('pages.doc.doc');
        const pageHtml = yield docView.render(Object.assign(Object.assign({}, (res.templateData || {})), { docs: docblocks }));
        res.type('text/html');
        res.status(200);
        res.send(pageHtml.value);
        resolve(pageHtml.value);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQztBQUMvQyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUVuRCxPQUFPLGVBQWUsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRXpFLE9BQU8sV0FBVyxNQUFNLFdBQVcsQ0FBQztBQUVwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsSUFBSSxXQUFXLENBQUM7QUFDaEIsTUFBTSxDQUFDLE9BQU8sVUFBVSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNqRCxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDeEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUMvQixNQUFNLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVoRSxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFdBQVcsR0FBRyxNQUFNLFdBQVcsQ0FBQztRQUVoQyxNQUFNLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQzdDLElBQ0UsU0FBUyxLQUFLLGtCQUFrQjtnQkFDaEMsV0FBVyxDQUFDLFNBQVMsRUFBRSxHQUFHLGtCQUFrQixLQUFLLENBQUMsRUFDbEQ7Z0JBQ0EsaUJBQWlCLENBQUMsU0FBUyxDQUFDLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3ZEO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLFNBQVMsR0FBYSxFQUFFLENBQUM7UUFDL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDOUQsTUFBTSxTQUFTLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkUseUJBQXlCO1lBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLE1BQU0sUUFBUSxHQUFHLElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDckQsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUVwQyxlQUFlO1lBQ2YsNkJBQTZCO1lBQzdCLDhEQUE4RDtZQUM5RCw4Q0FBOEM7WUFDOUMseUJBQXlCO1lBQ3pCLFdBQVc7WUFDWCxvQkFBb0I7WUFDcEIsMkJBQTJCO1lBQzNCLCtCQUErQjtZQUMvQiw0QkFBNEI7WUFDNUIsUUFBUTtZQUNSLElBQUk7U0FDTDtRQUVELDBCQUEwQjtRQUUxQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNyQixNQUFNLElBQUksR0FBRyxNQUFNLE9BQU8sQ0FBQztnQkFDekIsS0FBSyxFQUFFLGtCQUFrQixTQUFTLGFBQWE7Z0JBQy9DLElBQUksRUFBRSxzQkFBc0IsU0FBUyxvQ0FBb0M7YUFDMUUsQ0FBQyxDQUFDO1lBQ0gsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzQjtRQUVELDZCQUE2QjtRQUM3QixNQUFNLE9BQU8sR0FBRyxJQUFJLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNyRCxNQUFNLFFBQVEsR0FBRyxNQUFNLE9BQU8sQ0FBQyxNQUFNLGlDQUNoQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLEtBQzNCLElBQUksRUFBRSxTQUFTLElBQ2YsQ0FBQztRQUVILEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDTCxDQUFDIn0=