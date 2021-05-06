"use strict";
// @ts-nocheck
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_docmap_1 = __importDefault(require("@coffeekraken/s-docmap"));
const s_docblock_1 = __importDefault(require("@coffeekraken/s-docblock"));
const s_view_renderer_1 = __importStar(require("@coffeekraken/s-view-renderer"));
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
function doc(req, res, settings = {}) {
    return new s_promise_1.default(({ resolve, reject, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const docMap = new s_docmap_1.default();
        const namespace = req.path.replace('/doc/', '').trim();
        const readPromise = docMap.read();
        pipe(readPromise);
        _docmapJson = yield readPromise;
        const pathes = {};
        Object.keys(_docmapJson).forEach((docmapNamespace) => {
            console.log(docmapNamespace, namespace);
            if (docmapNamespace.startsWith(namespace)) {
                if (!pathes[_docmapJson[docmapNamespace].path]) {
                    pathes[_docmapJson[docmapNamespace].path] = [];
                }
                pathes[_docmapJson[docmapNamespace].path].push(_docmapJson[docmapNamespace]);
            }
        });
        console.log(Object.keys(pathes));
        const docsHtml = [];
        Object.keys(pathes).forEach((path) => {
            console.log('NAMES', pathes[path].map((docmapObj) => docmapObj.namespace));
            // generate the docblocks
            const docblock = new s_docblock_1.default(path, {
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
            const html = yield s_view_renderer_1.page404({
                title: `Documentation "${namespace}" not found`,
                body: `The documentation "${namespace}" you requested does not exists...`
            });
            res.type('text/html');
            res.status(404);
            res.send(html.value);
            return reject(html.value);
        }
        // render the proper template
        const docView = new s_view_renderer_1.default('pages.doc');
        const pageHtml = yield docView.render(Object.assign(Object.assign({}, (res.templateData || {})), { body: docsHtml.join('\n') }));
        // _console.log(req);
        res.type('text/html');
        res.status(200);
        res.send(pageHtml.value);
        resolve(pageHtml.value);
    }));
}
exports.default = doc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZCx3RUFBaUQ7QUFDakQsc0VBQStDO0FBQy9DLDBFQUFtRDtBQUVuRCxpRkFBeUU7QUFFekU7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILElBQUksV0FBVyxDQUFDO0FBQ2hCLFNBQXdCLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ2pELE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDeEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBUyxFQUFFLENBQUM7UUFDL0IsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXZELE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEIsV0FBVyxHQUFHLE1BQU0sV0FBVyxDQUFDO1FBRWhDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksZUFBZSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQzlDLE1BQU0sQ0FBQyxXQUFXLENBQUMs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