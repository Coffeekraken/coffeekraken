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
function docmapMarkdownData({ req, res, pageConfig }) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        let html;
        let namespace = req.params.namespace;
        if (!namespace) {
            namespace = '';
            if (req.params.organisation) {
                namespace += `${req.params.organisation}`;
            }
            if (req.params.package) {
                namespace += `${req.params.package}`;
            }
            if (req.params.path) {
                namespace += `${req.params.path}`;
            }
        }
        if (!req.params.namespace) {
            throw new Error(`[SFrontendServer.docmapMarkdownData] Missing namespace parameter from the url...`);
        }
        const docmap = new s_docmap_1.default();
        const docmapJson = yield docmap.read();
        const builder = new s_markdown_builder_1.default({
            log: {
                summary: false,
            },
        });
        const markdownRes = yield builder.build({
            inPath: docmapJson.map[req.params.namespace].path,
            target: 'html',
            save: false,
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQStDO0FBQy9DLDBGQUFrRTtBQUVsRSxTQUF3QixrQkFBa0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFO0lBQy9ELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtRQUNqQyxJQUFJLElBQUksQ0FBQztRQUVULElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDWixTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ2YsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtnQkFDekIsU0FBUyxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUM3QztZQUNELElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0JBQ3BCLFNBQVMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDeEM7WUFDRCxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUNqQixTQUFTLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3JDO1NBQ0o7UUFFRCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDdkIsTUFBTSxJQUFJLEtBQUssQ0FDWCxrRkFBa0YsQ0FDckYsQ0FBQztTQUNMO1FBRUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBUyxFQUFFLENBQUM7UUFDL0IsTUFBTSxVQUFVLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFdkMsTUFBTSxPQUFPLEdBQUcsSUFBSSw0QkFBa0IsQ0FBQztZQUNuQyxHQUFHLEVBQUU7Z0JBQ0QsT0FBTyxFQUFFLEtBQUs7YUFDakI7U0FDSixDQUFDLENBQUM7UUFFSCxNQUFNLFdBQVcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDcEMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJO1lBQ2pELE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFFLEtBQUs7U0FDZCxDQUFDLENBQUM7UUFDSCxJQUFJLFdBQVcsWUFBWSxLQUFLLEVBQUU7WUFDOUIsTUFBTSxXQUFXLENBQUM7U0FDckI7UUFFRCxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUUzQixPQUFPLENBQUM7WUFDSixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDO0FBaERELHFDQWdEQyJ9