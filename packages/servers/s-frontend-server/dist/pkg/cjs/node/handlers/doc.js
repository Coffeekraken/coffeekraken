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
 * @platform            node
 * @status              beta
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
        }, {
            dataFile: true,
        });
        res.type('text/html');
        res.status(200);
        res.send(pageHtml.value);
        resolve(pageHtml.value);
    }));
}
exports.default = doc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLDBFQUFtRDtBQUNuRCxzRUFBK0M7QUFDL0MsbUVBQXdEO0FBQ3hELHNGQUFnRTtBQUVoRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILElBQUksV0FBVyxDQUFDO0FBQ2hCLFNBQXdCLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQy9DLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtRQUNqQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGtCQUFTLEVBQUUsQ0FBQztRQUUvQixNQUFNLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFbEQsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsQixXQUFXLEdBQUcsTUFBTSxXQUFXLENBQUM7UUFFaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUN0QyxNQUFNLElBQUksR0FBRyxNQUFNLElBQUEseUJBQU8sa0NBQ25CLENBQUMsR0FBRyxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUMsS0FDM0IsS0FBSyxFQUFFLGtCQUFrQixrQkFBa0IsYUFBYSxFQUN4RCxJQUFJLEVBQUUsc0JBQXNCLGtCQUFrQixvQ0FBb0MsSUFDcEYsQ0FBQztZQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQixP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