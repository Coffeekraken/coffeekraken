"use strict";
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
function docmapMarkdownData({ req, res, pageConfig }) {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        let html;
        if (!req.params.namespace) {
            throw new Error(`[SFrontendServer.docmapMarkdownData] Missing namespace parameter from the url...`);
        }
        const docmap = new s_docmap_1.default();
        const docmapJson = yield docmap.read();
        const builder = new s_markdown_builder_1.default();
        const markdownRes = yield pipe(builder.build({
            inPath: docmapJson.map[req.params.namespace].path,
            target: 'html',
            save: false,
        }));
        if (markdownRes instanceof Error) {
            throw markdownRes;
        }
        html = markdownRes[0].code;
        resolve({
            body: html,
        });
    }));
}
exports.default = docmapMarkdownData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQStDO0FBQy9DLDBGQUFrRTtBQUNsRSx3RUFBaUQ7QUFFakQsU0FBd0Isa0JBQWtCLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRTtJQUMvRCxPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM1RCxJQUFJLElBQUksQ0FBQztRQUVULElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTtZQUN2QixNQUFNLElBQUksS0FBSyxDQUNYLGtGQUFrRixDQUNyRixDQUFDO1NBQ0w7UUFFRCxNQUFNLE1BQU0sR0FBRyxJQUFJLGtCQUFTLEVBQUUsQ0FBQztRQUMvQixNQUFNLFVBQVUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV2QyxNQUFNLE9BQU8sR0FBRyxJQUFJLDRCQUFrQixFQUFFLENBQUM7UUFFekMsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQzFCLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDVixNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUk7WUFDakQsTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUUsS0FBSztTQUNkLENBQUMsQ0FDTCxDQUFDO1FBQ0YsSUFBSSxXQUFXLFlBQVksS0FBSyxFQUFFO1lBQzlCLE1BQU0sV0FBVyxDQUFDO1NBQ3JCO1FBRUQsSUFBSSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFM0IsT0FBTyxDQUFDO1lBQ0osSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQWhDRCxxQ0FnQ0MifQ==