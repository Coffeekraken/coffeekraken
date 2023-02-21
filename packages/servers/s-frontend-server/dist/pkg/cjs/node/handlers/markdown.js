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
const s_docmap_1 = __importDefault(require("@coffeekraken/s-docmap"));
const s_markdown_builder_1 = __importDefault(require("@coffeekraken/s-markdown-builder"));
const s_view_renderer_1 = require("@coffeekraken/s-view-renderer");
/**
 * @name                markdown
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
function markdown(req, res, settings = {}) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const docmap = new s_docmap_1.default();
        const docmapJson = yield docmap.read();
        const menu = docmapJson.menu;
        let html;
        let slugObj = menu.slug[req.url];
        if (!slugObj) {
            Object.keys((_a = menu.packages) !== null && _a !== void 0 ? _a : {}).forEach((packageName) => {
                if (slugObj)
                    return;
                const packageObj = menu.packages[packageName];
                slugObj = packageObj.slug[req.url];
            });
        }
        if (slugObj) {
            const builder = new s_markdown_builder_1.default({
                log: {
                    summary: false,
                },
            });
            const res = yield builder.build({
                // inRaw: markdownStr,
                inPath: slugObj.docmap.path,
                target: 'html',
                save: false,
            });
            if (res instanceof Error) {
                throw res;
            }
            html = res[0].code;
        }
        if (!html) {
            const error = yield (0, s_view_renderer_1.page404)(Object.assign(Object.assign({}, (res.templateData || {})), { title: `Markdown "${req.url}" not found`, body: `The markdown "${req.url}" you requested does not exists...` }));
            res.type('text/html');
            res.status(404);
            res.send(error.value);
            return reject(error.value);
        }
        const result = yield res.viewRenderer.render('pages.markdown.markdown', {
            body: html,
        });
        res.status(200);
        res.type('text/html');
        res.send(result.value);
        resolve(result.value);
    }));
}
exports.default = markdown;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHNFQUErQztBQUMvQywwRkFBa0U7QUFDbEUsbUVBQXdEO0FBRXhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsU0FBd0IsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDcEQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFOztRQUNqQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGtCQUFTLEVBQUUsQ0FBQztRQUMvQixNQUFNLFVBQVUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QyxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBRTdCLElBQUksSUFBSSxDQUFDO1FBRVQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBQSxJQUFJLENBQUMsUUFBUSxtQ0FBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDckQsSUFBSSxPQUFPO29CQUFFLE9BQU87Z0JBQ3BCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzlDLE9BQU8sR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQztTQUNOO1FBRUQsSUFBSSxPQUFPLEVBQUU7WUFDVCxNQUFNLE9BQU8sR0FBRyxJQUFJLDRCQUFrQixDQUFDO2dCQUNuQyxHQUFHLEVBQUU7b0JBQ0QsT0FBTyxFQUFFLEtBQUs7aUJBQ2pCO2FBQ0osQ0FBQyxDQUFDO1lBQ0gsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUM1QixzQkFBc0I7Z0JBQ3RCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUk7Z0JBQzNCLE1BQU0sRUFBRSxNQUFNO2dCQUNkLElBQUksRUFBRSxLQUFLO2FBQ2QsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxHQUFHLFlBQVksS0FBSyxFQUFFO2dCQUN0QixNQUFNLEdBQUcsQ0FBQzthQUNiO1lBRUQsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDdEI7UUFFRCxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1AsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFBLHlCQUFPLGtDQUNwQixDQUFDLEdBQUcsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLEtBQzNCLEtBQUssRUFBRSxhQUFhLEdBQUcsQ0FBQyxHQUFHLGFBQWEsRUFDeEMsSUFBSSxFQUFFLGlCQUFpQixHQUFHLENBQUMsR0FBRyxvQ0FBb0MsSUFDcEUsQ0FBQztZQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUI7UUFFRCxNQUFNLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUN4Qyx5QkFBeUIsRUFDekI7WUFDSSxJQUFJLEVBQUUsSUFBSTtTQUNiLENBQ0osQ0FBQztRQUVGLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDO0FBNURELDJCQTREQyJ9