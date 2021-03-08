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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLDJFQUFvRDtBQUlwRCxzRUFBZ0Q7QUFDaEQsdUVBQW9EO0FBQ3BELDRFQUFzRDtBQUN0RCw4R0FBd0Y7QUFDeEYsc0VBQWdEO0FBRWhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxTQUF3QixHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNqRCxPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ3hELE1BQU0sTUFBTSxHQUFHLElBQUksaUJBQVMsRUFBRSxDQUFDO1FBQy9CLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2RCxNQUFNLFVBQVUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzFCLE1BQU0sSUFBSSxHQUFHLE1BQU0sY0FBUyxDQUFDO2dCQUMzQixLQUFLLEVBQUUsa0JBQWtCLFNBQVMsYUFBYTtnQkFDL0MsSUFBSSxFQUFFLHNCQUFzQixTQUFTLG9DQUFvQzthQUMxRSxDQUFDLENBQUM7WUFDSCxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNmLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JCO1FBRUQseUJBQXlCO1FBQ3pCLE1BQU0sUUFBUSxHQUFHLElBQUksbUJBQVcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFN0Qsd0JBQXdCO1FBQ3hCLE1BQU0sWUFBWSxHQUFHLElBQUksK0JBQXVCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsTUFBTSxJQUFJLEdBQUcsTUFBTSxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFekMsNkJBQTZCO1FBQzdCLE1BQU0sUUFBUSxHQUFHLE1BQU0sZ0JBQVEsQ0FBQyxXQUFXLGtDQUN0QyxDQUFDLEdBQUcsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLEtBQzNCLElBQUksRUFBRSxJQUFJLElBQ1YsQ0FBQztRQUVILDBCQUEwQjtRQUMxQixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQW5DRCxzQkFtQ0MifQ==