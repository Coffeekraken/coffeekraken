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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const fs_1 = __importDefault(require("fs"));
const s_view_renderer_1 = __importDefault(require("@coffeekraken/s-view-renderer"));
const s_markdown_builder_1 = __importDefault(require("@coffeekraken/s-markdown-builder"));
const s_view_renderer_2 = require("@coffeekraken/s-view-renderer");
const s_bench_1 = __importDefault(require("@coffeekraken/s-bench"));
/**
 * @name                docmapHandler
 * @namespace           node.modules.docmap
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
function docmap({ req, res }) {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        s_bench_1.default.start('handlers.docmap');
        s_bench_1.default.step('handlers.docmap', 'beforeDocmapRead');
        const docmap = new s_docmap_1.default();
        const docmapJson = yield docmap.read();
        s_bench_1.default.step('handlers.docmap', 'afterDocmapRead');
        if (!docmapJson.map ||
            !fs_1.default.existsSync(docmapJson.map[req.params.namespace].path)) {
            const error = yield (0, s_view_renderer_2.page404)(Object.assign(Object.assign({}, (res.templateData || {})), { title: `Docmap "${req.params.namespace}" not found`, body: `The docmap "${req.params.namespace}" you requested does not exists...` }));
            res.type('text/html');
            res.status(404);
            res.send(error.value);
            return reject(error.value);
        }
        s_bench_1.default.step('handlers.docmap', 'beforeMarkdownBuild');
        let html;
        const builder = new s_markdown_builder_1.default();
        const markdownRes = yield pipe(builder.build({
            // inRaw: str,
            inPath: docmapJson.map[req.params.namespace].path,
            target: 'html',
            save: false,
        }));
        if (markdownRes instanceof Error) {
            throw markdownRes;
        }
        html = markdownRes[0].code;
        s_bench_1.default.step('handlers.docmap', 'afterMarkdownBuild');
        s_bench_1.default.step('handlers.docmap', 'beforeViewRendering');
        const viewInstance = new s_view_renderer_1.default('pages.markdown.markdown');
        const viewRes = yield pipe(viewInstance.render(Object.assign(Object.assign({}, ((_a = res.templateData) !== null && _a !== void 0 ? _a : {})), { body: html })));
        res.status(200);
        res.type('text/html');
        res.send(viewRes.value);
        resolve(viewRes.value);
    }));
}
exports.default = docmap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUdkLHNFQUErQztBQUUvQyx3RUFBaUQ7QUFFakQsNENBQXNCO0FBRXRCLG9GQUE0RDtBQUM1RCwwRkFBa0U7QUFDbEUsbUVBQXdEO0FBRXhELG9FQUE2QztBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsU0FBd0IsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtJQUN2QyxPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTs7UUFDNUQsaUJBQVEsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUVsQyxpQkFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBRXJELE1BQU0sTUFBTSxHQUFHLElBQUksa0JBQVMsRUFBRSxDQUFDO1FBQy9CLE1BQU0sVUFBVSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXZDLGlCQUFRLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFFcEQsSUFDSSxDQUFDLFVBQVUsQ0FBQyxHQUFHO1lBQ2YsQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFDN0Q7WUFDRSxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUEseUJBQU8sa0NBQ3BCLENBQUMsR0FBRyxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUMsS0FDM0IsS0FBSyxFQUFFLFdBQVcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLGFBQWEsRUFDbkQsSUFBSSxFQUFFLGVBQWUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLG9DQUFvQyxJQUMvRSxDQUFDO1lBQ0gsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM5QjtRQUVELGlCQUFRLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFFeEQsSUFBSSxJQUFJLENBQUM7UUFFVCxNQUFNLE9BQU8sR0FBRyxJQUFJLDRCQUFrQixFQUFFLENBQUM7UUFFekMsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQzFCLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDVixjQUFjO1lBQ2QsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJO1lBQ2pELE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFFLEtBQUs7U0FDZCxDQUFDLENBQ0wsQ0FBQztRQUNGLElBQUksV0FBVyxZQUFZLEtBQUssRUFBRTtZQUM5QixNQUFNLFdBQVcsQ0FBQztTQUNyQjtRQUVELElBQUksR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRTNCLGlCQUFRLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFFdkQsaUJBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUscUJBQXFCLENBQUMsQ0FBQztRQUV4RCxNQUFNLFlBQVksR0FBRyxJQUFJLHlCQUFlLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUVwRSxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FDdEIsWUFBWSxDQUFDLE1BQU0saUNBQ1osQ0FBQyxNQUFBLEdBQUcsQ0FBQyxZQUFZLG1DQUFJLEVBQUUsQ0FBQyxLQUMzQixJQUFJLEVBQUUsSUFBSSxJQUNaLENBQ0wsQ0FBQztRQUVGLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDO0FBaEVELHlCQWdFQyJ9