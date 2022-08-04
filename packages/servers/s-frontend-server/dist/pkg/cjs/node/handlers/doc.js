"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_docblock_1 = __importDefault(require("@coffeekraken/s-docblock"));
const s_docmap_1 = __importDefault(require("@coffeekraken/s-docmap"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_view_renderer_1 = require("@coffeekraken/s-view-renderer");
const scrapeUrl_1 = __importDefault(require("@coffeekraken/sugar/node/og/scrapeUrl"));
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
function doc(req, res, settings = {}) {
    return new s_promise_1.default(({ resolve, reject, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const docMap = new s_docmap_1.default();
        const requestedNamespace = req.params['0'].trim();
        const readPromise = docMap.read();
        pipe(readPromise);
        _docmapJson = yield readPromise;
        if (!_docmapJson.map[requestedNamespace]) {
            const html = yield (0, s_view_renderer_1.page404)(Object.assign(Object.assign({}, (res.templateData || {})), { title: `Documentation "${requestedNamespace}" not found`, body: `The documentation "${requestedNamespace}" you requested does not exists...` }));
            res.type('text/html');
            res.status(404);
            res.send(html.value);
            return reject(html.value);
        }
        // generate the docblocks
        const docblocksInstance = new s_docblock_1.default(_docmapJson.map[requestedNamespace].path, {});
        yield docblocksInstance.parse();
        const docblocks = docblocksInstance.toObject();
        // protect
        if (!docblocks.length) {
            const html = yield (0, s_view_renderer_1.page404)(Object.assign(Object.assign({}, (res.templateData || {})), { title: `Documentation "${requestedNamespace}" not found`, body: `The documentation "${requestedNamespace}" you requested does not exists...` }));
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
                        (0, scrapeUrl_1.default)(seeObj.url)
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
        const pageHtml = yield res.viewRenderer.render('pages.doc.doc', {
            docblocks,
        });
        res.type('text/html');
        res.status(200);
        res.send(pageHtml.value);
        resolve(pageHtml.value);
    }));
}
exports.default = doc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLDBFQUFtRDtBQUNuRCxzRUFBK0M7QUFDL0Msd0VBQWlEO0FBQ2pELG1FQUF3RDtBQUN4RCxzRkFBZ0U7QUFFaEU7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILElBQUksV0FBVyxDQUFDO0FBQ2hCLFNBQXdCLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQy9DLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDdEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBUyxFQUFFLENBQUM7UUFFL0IsTUFBTSxrQkFBa0IsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRWxELE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEIsV0FBVyxHQUFHLE1BQU0sV0FBVyxDQUFDO1FBRWhDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDdEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFBLHlCQUFPLGtDQUNuQixDQUFDLEdBQUcsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLEtBQzNCLEtBQUssRUFBRSxrQkFBa0Isa0JBQWtCLGFBQWEsRUFDeEQsSUFBSSxFQUFFLHNCQUFzQixrQkFBa0Isb0NBQW9DLElBQ3BGLENBQUM7WUFDSCxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEIsR0FBRyxDQUFD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