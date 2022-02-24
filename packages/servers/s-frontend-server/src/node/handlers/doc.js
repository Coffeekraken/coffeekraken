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
import __SDocblock from '@coffeekraken/s-docblock';
import __SDocMap from '@coffeekraken/s-docmap';
import __SPromise from '@coffeekraken/s-promise';
import __SViewRenderer, { page404 } from '@coffeekraken/s-view-renderer';
import __scrapeUrl from '@coffeekraken/sugar/node/og/scrapeUrl';
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
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
let _docmapJson;
export default function doc(req, res, settings = {}) {
    return new __SPromise(({ resolve, reject, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const docMap = new __SDocMap();
        const requestedNamespace = req.params['0'].trim();
        const readPromise = docMap.read();
        pipe(readPromise);
        _docmapJson = yield readPromise;
        if (!_docmapJson.map[requestedNamespace]) {
            const html = yield page404(Object.assign(Object.assign({}, (res.templateData || {})), { title: `Documentation "${requestedNamespace}" not found`, body: `The documentation "${requestedNamespace}" you requested does not exists...` }));
            res.type('text/html');
            res.status(404);
            res.send(html.value);
            return reject(html.value);
        }
        // generate the docblocks
        const docblocksInstance = new __SDocblock(_docmapJson.map[requestedNamespace].path, {});
        yield docblocksInstance.parse();
        const docblocks = docblocksInstance.toObject();
        // protect
        if (!docblocks.length) {
            const html = yield page404(Object.assign(Object.assign({}, (res.templateData || {})), { title: `Documentation "${requestedNamespace}" not found`, body: `The documentation "${requestedNamespace}" you requested does not exists...` }));
            res.type('text/html');
            res.status(404);
            res.send(html.value);
            return reject(html.value);
        }
        // scrap @see fields opengraph metas
        yield new Promise((resolve, reject) => {
            let pendingRequests = 0;
            docblocks.forEach((block, i) => {
                if (block.see) {
                    block.see.forEach((seeObj, j) => {
                        pendingRequests++;
                        __scrapeUrl(seeObj.url)
                            .then((results) => {
                            seeObj.og = results;
                            pendingRequests--;
                            if (!pendingRequests) {
                                resolve();
                            }
                        })
                            .catch((error) => {
                            pendingRequests--;
                            if (!pendingRequests) {
                                resolve();
                            }
                        });
                    });
                }
                else {
                    if (i === docblocks.length - 1 && !pendingRequests) {
                        resolve();
                    }
                }
            });
        });
        // render the proper template
        const docView = new __SViewRenderer('pages.doc.doc');
        const pageHtml = yield docView.render(Object.assign(Object.assign({}, (res.templateData || {})), { docblocks }));
        res.type('text/html');
        res.status(200);
        res.send(pageHtml.value);
        resolve(pageHtml.value);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQztBQUMvQyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGVBQWUsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3pFLE9BQU8sV0FBVyxNQUFNLHVDQUF1QyxDQUFDO0FBRWhFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxJQUFJLFdBQVcsQ0FBQztBQUNoQixNQUFNLENBQUMsT0FBTyxVQUFVLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQy9DLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUN0RCxNQUFNLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBRS9CLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVsRCxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFdBQVcsR0FBRyxNQUFNLFdBQVcsQ0FBQztRQUVoQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQ3RDLE1BQU0sSUFBSSxHQUFHLE1BQU0sT0FBTyxpQ0FDbkIsQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxLQUMzQixLQUFLLEVBQUUsa0JBQWtCLGtCQUFrQixhQUFhLEVBQ3hELElBQUksRUFBRSxzQkFBc0Isa0JBQWtC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