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
const s_bench_1 = __importDefault(require("@coffeekraken/s-bench"));
const s_docmap_1 = __importDefault(require("@coffeekraken/s-docmap"));
const s_markdown_builder_1 = __importDefault(require("@coffeekraken/s-markdown-builder"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const package_1 = require("@coffeekraken/sugar/package");
function docmapDocumentationData({ req, res, pageConfig }) {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        let html;
        if (!req.params.path) {
            throw new Error(`[SFrontendServer.docmapDocumentationData] Missing "path" parameter from the url...`);
        }
        s_bench_1.default.start('data.docmapDocumentationData');
        s_bench_1.default.step('data.docmapDocumentationData', 'beforeDocmapRead');
        const docmap = new s_docmap_1.default();
        const docmapJson = yield docmap.read();
        let docObj = docmapJson.menu.slug[`/doc/${req.params.path}`];
        if (!docObj) {
            docObj =
                (_c = (_b = (_a = docmapJson.menu.packages) === null || _a === void 0 ? void 0 : _a[`${req.params.organisation}/${req.params.package}`]) === null || _b === void 0 ? void 0 : _b.slug) === null || _c === void 0 ? void 0 : _c[`/package/${req.params.organisation}/${req.params.package}/doc/${req.params.path}`];
        }
        if (!docObj) {
            return reject(`The documentation "${req.path}" you requested does not exists...`);
        }
        s_bench_1.default.step('data.docmapDocumentationData', 'afterDocmapRead');
        let packageJson;
        if ((_e = (_d = docObj.docmap) === null || _d === void 0 ? void 0 : _d.package) === null || _e === void 0 ? void 0 : _e.name) {
            packageJson = (0, package_1.__packageJsonSync)(docObj.docmap.package.name);
        }
        const builder = new s_markdown_builder_1.default();
        const markdownRes = yield pipe(builder.build({
            data: {
                packageJson,
            },
            inPath: docObj.docmap.path,
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
exports.default = docmapDocumentationData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHNFQUErQztBQUMvQywwRkFBa0U7QUFDbEUsd0VBQWlEO0FBQ2pELHlEQUFnRTtBQUVoRSxTQUF3Qix1QkFBdUIsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFO0lBQ3BFLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztRQUM1RCxJQUFJLElBQUksQ0FBQztRQUVULElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNsQixNQUFNLElBQUksS0FBSyxDQUNYLG9GQUFvRixDQUN2RixDQUFDO1NBQ0w7UUFFRCxpQkFBUSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBRS9DLGlCQUFRLENBQUMsSUFBSSxDQUFDLDhCQUE4QixFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFbEUsTUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBUyxFQUFFLENBQUM7UUFDL0IsTUFBTSxVQUFVLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkMsSUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE1BQU07Z0JBQ0YsTUFBQSxNQUFBLE1BQUEsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLDBDQUNwQixHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQ3JELDBDQUFFLElBQUksMENBQ0gsWUFBWSxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sUUFBUSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUNyRixDQUFDO1NBQ1Q7UUFFRCxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsT0FBTyxNQUFNLENBQ1Qsc0JBQXNCLEdBQUcsQ0FBQyxJQUFJLG9DQUFvQyxDQUNyRSxDQUFDO1NBQ0w7UUFFRCxpQkFBUSxDQUFDLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBRWpFLElBQUksV0FBVyxDQUFDO1FBQ2hCLElBQUksTUFBQSxNQUFBLE1BQU0sQ0FBQyxNQUFNLDBDQUFFLE9BQU8sMENBQUUsSUFBSSxFQUFFO1lBQzlCLFdBQVcsR0FBRyxJQUFBLDJCQUFpQixFQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9EO1FBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSw0QkFBa0IsRUFBRSxDQUFDO1FBRXpDLE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUMxQixPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ1YsSUFBSSxFQUFFO2dCQUNGLFdBQVc7YUFDZDtZQUNELE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUk7WUFDMUIsTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUUsS0FBSztTQUNkLENBQUMsQ0FDTCxDQUFDO1FBQ0YsSUFBSSxXQUFXLFlBQVksS0FBSyxFQUFFO1lBQzlCLE1BQU0sV0FBVyxDQUFDO1NBQ3JCO1FBRUQsSUFBSSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFM0IsT0FBTyxDQUFDO1lBQ0osSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQTdERCwwQ0E2REMifQ==