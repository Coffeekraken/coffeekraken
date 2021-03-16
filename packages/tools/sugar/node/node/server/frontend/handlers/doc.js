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
const s_promise_1 = __importDefault(require("../@coffeekraken/s-promise"));
const SDocMap_1 = __importDefault(require("../../../docMap/SDocMap"));
const _404_1 = __importDefault(require("../../../template/pages/404"));
const SDocblock_1 = __importDefault(require("../../../docblock/SDocblock"));
const SDocblockHtmlRenderer_1 = __importDefault(require("../../../docblock/renderers/SDocblockHtmlRenderer"));
const render_1 = __importDefault(require("../../../template/render"));
/**
 * @name                doc
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 * @status              wip
 *
 * This function is responsible of responding to express requests made on the doc pages
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          res             The express response object
 * @param         {Object}         [settings={}]    The handler settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function doc(req, res, settings = {}) {
    return new s_promise_1.default(({ resolve, reject, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const docMap = new SDocMap_1.default();
        const namespace = req.path.replace('/doc/', '').trim();
        const docMapJson = yield docMap.read();
        if (!docMapJson[namespace]) {
            const html = yield _404_1.default({
                title: `Documentation "${namespace}" not found`,
                body: `The documentation "${namespace}" you requested does not exists...`
            });
            res.type('text/html');
            res.status(404);
            res.send(html);
            return reject(html);
        }
        // generate the docblocks
        const docblock = new SDocblock_1.default(docMapJson[namespace].path);
        // render them into html
        const htmlRenderer = new SDocblockHtmlRenderer_1.default(docblock);
        const html = yield htmlRenderer.render();
        // render the proper template
        const pageHtml = yield render_1.default('pages.doc', Object.assign(Object.assign({}, (res.templateData || {})), { body: html }));
        // nativeConsole.log(req);
        res.type('text/html');
        res.status(200);
        res.send(pageHtml.content);
        resolve(pageHtml.content);
    }));
}
exports.default = doc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL25vZGUvc2VydmVyL2Zyb250ZW5kL2hhbmRsZXJzL2RvYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCwyRUFBb0Q7QUFJcEQsc0VBQWdEO0FBQ2hELHVFQUFvRDtBQUNwRCw0RUFBc0Q7QUFDdEQsOEdBQXdGO0FBQ3hGLHNFQUFnRDtBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsU0FBd0IsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDakQsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUN4RCxNQUFNLE1BQU0sR0FBRyxJQUFJLGlCQUFTLEVBQUUsQ0FBQztRQUMvQixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkQsTUFBTSxVQUFVLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUMxQixNQUFNLElBQUksR0FBRyxNQUFNLGNBQVMsQ0FBQztnQkFDM0IsS0FBSyxFQUFFLGtCQUFrQixTQUFTLGFBQWE7Z0JBQy9DLElBQUksRUFBRSxzQkFBc0IsU0FBUyxvQ0FBb0M7YUFDMUUsQ0FBQyxDQUFDO1lBQ0gsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDZixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNyQjtRQUVELHlCQUF5QjtRQUN6QixNQUFNLFFBQVEsR0FBRyxJQUFJLG1CQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTdELHdCQUF3QjtRQUN4QixNQUFNLFlBQVksR0FBRyxJQUFJLCtCQUF1QixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNELE1BQU0sSUFBSSxHQUFHLE1BQU0sWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRXpDLDZCQUE2QjtRQUM3QixNQUFNLFFBQVEsR0FBRyxNQUFNLGdCQUFRLENBQUMsV0FBVyxrQ0FDdEMsQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxLQUMzQixJQUFJLEVBQUUsSUFBSSxJQUNWLENBQUM7UUFFSCwwQkFBMEI7UUFDMUIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNMLENBQUM7QUFuQ0Qsc0JBbUNDIn0=