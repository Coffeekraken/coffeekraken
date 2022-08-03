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
const s_docblock_1 = __importDefault(require("@coffeekraken/s-docblock"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const fs_1 = __importDefault(require("fs"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_view_renderer_1 = __importDefault(require("@coffeekraken/s-view-renderer"));
const s_view_renderer_2 = require("@coffeekraken/s-view-renderer");
const scrapeUrl_1 = __importDefault(require("@coffeekraken/sugar/node/og/scrapeUrl"));
const s_bench_1 = __importDefault(require("@coffeekraken/s-bench"));
/**
 * @name                styleguideHandler
 * @namespace           sugar.node.server.frontend.modules.styleguide
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
function styleguide({ req, res }) {
    return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
        s_bench_1.default.start('handlers.styleguide');
        s_bench_1.default.step('handlers.styleguide', 'beforeDocmapRead');
        const docmap = new s_docmap_1.default();
        const docmapJson = yield docmap.read();
        const styleguideMenu = docmapJson.menu.custom.styleguide;
        s_bench_1.default.step('handlers.styleguide', 'afterDocmapRead');
        const styleguideObj = styleguideMenu.slug[req.path];
        if (!styleguideObj || !fs_1.default.existsSync(styleguideObj.docmap.path)) {
            const error = yield (0, s_view_renderer_2.page404)(Object.assign(Object.assign({}, (res.templateData || {})), { title: `Styleguide "${req.path}" not found`, body: `The styleguide "${req.path}" you requested does not exists...` }));
            res.type('text/html');
            res.status(404);
            res.send(error.value);
            return reject(error.value);
        }
        const finalReqPath = `/styleguide/${req.path.split('/styleguide/')[1]}`;
        s_bench_1.default.step('handlers.styleguide', 'beforeDocblockParsing');
        const docblocksInstance = new s_docblock_1.default(styleguideObj.docmap.path, {
            docblock: {
                renderMarkdown: false,
                filterByTag: {
                    menu: (value) => {
                        if (!value || typeof value !== 'string')
                            return false;
                        const parts = value.split(/\s{2,99999999}/);
                        if (parts.length >= 2 && parts[1] === finalReqPath)
                            return true;
                        return false;
                    },
                },
            },
        });
        yield docblocksInstance.parse();
        const docblocks = docblocksInstance.toObject();
        if (docblocks.length) {
            if (docblocks[0].see) {
                for (let i = 0; i < docblocks[0].see.length; i++) {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<yellow>[og]</yellow> Scraping opengraph from url "<cyan>${docblocks[0].see[i].url}</cyan>"`,
                    });
                    docblocks[0].see[i].og = yield (0, scrapeUrl_1.default)(docblocks[0].see[i].url);
                }
            }
        }
        s_bench_1.default.step('handlers.styleguide', 'afterDocblockParsing');
        s_bench_1.default.step('handlers.styleguide', 'beforeViewRendering');
        const docView = new s_view_renderer_1.default('pages.styleguide.styleguide');
        const pageHtml = yield docView.render(Object.assign(Object.assign({}, (res.templateData || {})), { docblocks }));
        s_bench_1.default.step('handlers.styleguide', 'afterViewRendering');
        s_bench_1.default.end('handlers.styleguide', {}).log();
        res.status(200);
        res.type('text/html');
        res.send(pageHtml.value);
        resolve(pageHtml.value);
    }));
}
exports.default = styleguide;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUdkLHNFQUErQztBQUMvQywwRUFBbUQ7QUFDbkQsd0VBQWlEO0FBRWpELDRDQUFzQjtBQUN0QixnRUFBeUM7QUFDekMsb0ZBQTREO0FBRTVELG1FQUF3RDtBQUN4RCxzRkFBZ0U7QUFDaEUsb0VBQTZDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxTQUF3QixVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO0lBQzNDLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDdEQsaUJBQVEsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUV0QyxpQkFBUSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBRXpELE1BQU0sTUFBTSxHQUFHLElBQUksa0JBQVMsRUFBRSxDQUFDO1FBQy9CLE1BQU0sVUFBVSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sY0FBYyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUV6RCxpQkFBUSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBRXhELE1BQU0sYUFBYSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBELElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDL0QsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFBLHlCQUFPLGtDQUNwQixDQUFDLEdB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