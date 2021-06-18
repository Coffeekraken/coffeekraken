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
        if (!_docmapJson[requestedNamespace]) {
            const html = yield page404(Object.assign(Object.assign({}, (res.templateData || {})), { title: `Documentation "${requestedNamespace}" not found`, body: `The documentation "${requestedNamespace}" you requested does not exists...` }));
            res.type('text/html');
            res.status(404);
            res.send(html.value);
            return reject(html.value);
        }
        // generate the docblocks
        const docblocks = new __SDocblock(_docmapJson[requestedNamespace].path, {}).toObject();
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
            docblocks.forEach((block) => {
                if (!block.see)
                    return;
                block.see.forEach((seeObj) => {
                    pendingRequests++;
                    __scrapeUrl(seeObj.url).then(results => {
                        seeObj.og = results;
                        pendingRequests--;
                        if (!pendingRequests) {
                            resolve();
                        }
                    }).catch(error => {
                        pendingRequests--;
                        if (!pendingRequests) {
                            resolve();
                        }
                    });
                    // const data = __ogScraper({
                    //   url: seeObj.url,
                    //   onlyGetOpenGraphInfo: true
                    // }, (error, results, response) => {
                    //   if (results) {
                    //     seeObj.og = results
                    //   }
                    //   pendingRequests--;
                    //   if (!pendingRequests) {
                    //     resolve();
                    //   }
                    // });
                });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQztBQUMvQyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUVuRCxPQUFPLGVBQWUsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBSXpFLE9BQU8sV0FBVyxNQUFNLHVDQUF1QyxDQUFDO0FBR2hFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxJQUFJLFdBQVcsQ0FBQztBQUNoQixNQUFNLENBQUMsT0FBTyxVQUFVLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBRWpELE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUN4RCxNQUFNLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQy9CLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRWhFLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEIsV0FBVyxHQUFHLE1BQU0sV0FBVyxDQUFDO1FBRWhDLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUNwQyxNQUFNLElBQUksR0FBRyxNQUFNLE9BQU8saUNBQ3JCLENBQUMsR0FBRyxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUMsS0FDM0IsS0FBSyxFQUFFLGtCQUFrQixrQkFBa0IsYUFBYSxFQUN4RCxJQUFJLEVBQUUsc0JB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