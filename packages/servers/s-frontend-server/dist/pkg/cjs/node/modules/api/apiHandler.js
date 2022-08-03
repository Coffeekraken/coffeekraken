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
const namespaceCompliant_1 = __importDefault(require("@coffeekraken/sugar/shared/string/namespaceCompliant"));
const s_docmap_1 = __importDefault(require("@coffeekraken/s-docmap"));
const s_docblock_1 = __importDefault(require("@coffeekraken/s-docblock"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const fs_1 = __importDefault(require("fs"));
const s_view_renderer_1 = __importDefault(require("@coffeekraken/s-view-renderer"));
const s_view_renderer_2 = require("@coffeekraken/s-view-renderer");
/**
 * @name                apiHandler
 * @namespace           sugar.node.server.frontend.modules.styleguide
 * @type                Function
 * @status              wip
 *
 * This function is responsible of responding to express requests made on the api pages
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
function api({ req, res }) {
    return new s_promise_1.default(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
        const docmap = new s_docmap_1.default();
        const docmapJson = yield docmap.read();
        const namespace = req.path.replace(/^\/api\//, '').trim();
        const docmapObj = docmapJson.map[namespace];
        if (!docmapObj || !fs_1.default.existsSync(docmapObj.path)) {
            const error = yield (0, s_view_renderer_2.page404)(Object.assign(Object.assign({}, (res.templateData || {})), { title: `API "${req.path}" not found`, body: `The API item "${req.path}" you requested does not exists...` }));
            res.type('text/html');
            res.status(404);
            res.send(error.value);
            return reject(error.value);
        }
        const docblocksInstance = new s_docblock_1.default(docmapObj.path, {
            docblock: {
                renderMarkdown: true,
                filter: (docblock) => {
                    if ((0, namespaceCompliant_1.default)(`${docblock.namespace}.${docblock.name}`) === namespace) {
                        return true;
                    }
                    return false;
                },
            },
        });
        yield docblocksInstance.parse();
        const docblocks = docblocksInstance.toObject();
        const docView = new s_view_renderer_1.default('pages.api.api');
        const pageHtml = yield docView.render(Object.assign(Object.assign({}, (res.templateData || {})), { docblocks }));
        res.status(200);
        res.type('text/html');
        res.send(pageHtml.value);
        resolve(pageHtml.value);
    }));
}
exports.default = api;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUdkLDhHQUF3RjtBQUV4RixzRUFBK0M7QUFDL0MsMEVBQW1EO0FBQ25ELHdFQUFpRDtBQUVqRCw0Q0FBc0I7QUFDdEIsb0ZBQTREO0FBRTVELG1FQUF3RDtBQUd4RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsU0FBd0IsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtJQUNwQyxPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDaEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBUyxFQUFFLENBQUM7UUFDL0IsTUFBTSxVQUFVLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFdkMsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTFELE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hELE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBQSx5QkFBTyxrQ0FDcEIsQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxLQUMzQixLQUFLLEVBQUUsUUFBUSxHQUFHLENBQUMsSUFBSSxhQUFhLEVBQ3BDLElBQUksRUFBRSxpQkFBaUIsR0FBRyxDQUFDLElBQUksb0NBQW9DLElBQ3JFLENBQUM7WUFDSCxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEIsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlCO1FBRUQsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLG9CQUFXLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRTtZQUN0RCxRQUFRLEVBQUU7Z0JBQ04sY0FBYyxFQUFFLElBQUk7Z0JBQ3BCLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFO29CQUNqQixJQUNJLElBQUEsNEJBQW9CLEVBQ2hCLEdBQUcsUUFBUSxDQUFDLFNBQVMsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQzNDLEtBQUssU0FBUyxFQUNqQjt3QkFDRSxPQUFPLElBQUksQ0FBQztxQkFDZjtvQkFDRCxPQUFPLEtBQUssQ0FBQztnQkFDakIsQ0FBQzthQUNKO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsTUFBTSxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNoQyxNQUFNLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUUvQyxNQUFNLE9BQU8sR0FBRyxJQUFJLHlCQUFlLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFckQsTUFBTSxRQUFRLEdBQUcsTUFBTSxPQUFPLENBQUMsTUFBTSxpQ0FDOUIsQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxLQUMzQixTQUFTLElBQ1gsQ0FBQztRQUVILEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDO0FBbkRELHNCQW1EQyJ9