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
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLDBFQUFtRDtBQUNuRCxzRUFBK0M7QUFDL0MsbUVBQXdEO0FBQ3hELHNGQUFnRTtBQUVoRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsSUFBSSxXQUFXLENBQUM7QUFDaEIsU0FBd0IsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDL0MsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBQ2pDLE1BQU0sTUFBTSxHQUFHLElBQUksa0JBQVMsRUFBRSxDQUFDO1FBRS9CLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVsRCxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFdBQVcsR0FBRyxNQUFNLFdBQVcsQ0FBQztRQUVoQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQ3RDLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBQSx5QkFBTyxrQ0FDbkIsQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxLQUMzQixLQUFLLEVBQUUsa0JBQWtCLGtCQUFrQixhQUFhLEVBQ3hELElBQUksRUFBRSxzQkFBc0Isa0JBQWtCLG9DQUFvQyxJQUNwRixDQUFDO1lBQ0gsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLE9B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