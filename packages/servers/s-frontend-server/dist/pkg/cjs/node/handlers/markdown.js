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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_view_renderer_1 = require("@coffeekraken/s-view-renderer");
/**
 * @name                markdown
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
function markdown(req, res, settings = {}) {
    return new s_promise_1.default(({ resolve, reject, pipe, pipeErrors }) => __awaiter(this, void 0, void 0, function* () {
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
            const builder = new s_markdown_builder_1.default();
            const res = yield pipe(builder.build({
                // inRaw: markdownStr,
                inPath: slugObj.docmap.path,
                target: 'html',
                save: false,
            }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHNFQUErQztBQUMvQywwRkFBa0U7QUFDbEUsd0VBQWlEO0FBQ2pELG1FQUF3RDtBQUV4RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsU0FBd0IsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDcEQsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUU7O1FBQ2xFLE1BQU0sTUFBTSxHQUFHLElBQUksa0JBQVMsRUFBRSxDQUFDO1FBQy9CLE1BQU0sVUFBVSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFFN0IsSUFBSSxJQUFJLENBQUM7UUFFVCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFBLElBQUksQ0FBQyxRQUFRLG1DQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUNyRCxJQUFJLE9BQU87b0JBQUUsT0FBTztnQkFDcEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDOUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFFRCxJQUFJLE9BQU8sRUFBRTtZQUNULE1BQU0sT0FBTyxHQUFHLElBQUksNEJBQWtCLEVBQUUsQ0FBQztZQUN6QyxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDVixzQkFBc0I7Z0JBQ3RCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUk7Z0JBQzNCLE1BQU0sRUFBRSxNQUFNO2dCQUNkLElBQUksRUFBRSxLQUFLO2FBQ2QsQ0FBQyxDQUNMLENBQUM7WUFDRixJQUFJLEdBQUcsWUFBWSxLQUFLLEVBQUU7Z0JBQ3RCLE1BQU0sR0FBRyxDQUFDO2FBQ2I7WUFFRCxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztTQUN0QjtRQUVELElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDUCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUEseUJBQU8sa0NBQ3BCLENBQUMsR0FBRyxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUMsS0FDM0IsS0FBSyxFQUFFLGFBQWEsR0FBRyxDQUFDLEdBQUcsYUFBYSxFQUN4QyxJQUFJLEVBQUUsaUJBQWlCLEdBQUcsQ0FBQyxHQUFHLG9DQUFvQyxJQUNwRSxDQUFDO1lBQ0gsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM5QjtRQUVELE1BQU0sTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQ3hDLHlCQUF5QixFQUN6QjtZQUNJLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FDSixDQUFDO1FBRUYsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUExREQsMkJBMERDIn0=