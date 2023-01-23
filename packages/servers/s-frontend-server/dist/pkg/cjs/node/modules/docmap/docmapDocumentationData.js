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
const package_1 = require("@coffeekraken/sugar/package");
function docmapDocumentationData({ req, res, pageConfig }) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        let html;
        if (!req.params.path) {
            throw new Error(`[SFrontendServer.docmapDocumentationData] Missing "path" parameter from the url...`);
        }
        const bench = new s_bench_1.default('data.docmapDocumentationData');
        bench.step('beforeDocmapRead');
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
        bench.step('afterDocmapRead');
        let packageJson;
        if ((_e = (_d = docObj.docmap) === null || _d === void 0 ? void 0 : _d.package) === null || _e === void 0 ? void 0 : _e.name) {
            packageJson = (0, package_1.__packageJsonSync)(docObj.docmap.package.name);
        }
        const builder = new s_markdown_builder_1.default({
            log: {
                summary: false,
            },
        });
        const markdownRes = yield builder.build({
            data: {
                packageJson,
            },
            inPath: docObj.docmap.path,
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
exports.default = docmapDocumentationData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHNFQUErQztBQUMvQywwRkFBa0U7QUFDbEUseURBQWdFO0FBRWhFLFNBQXdCLHVCQUF1QixDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUU7SUFDcEUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTs7UUFDekMsSUFBSSxJQUFJLENBQUM7UUFFVCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FDWCxvRkFBb0YsQ0FDdkYsQ0FBQztTQUNMO1FBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBUSxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFFM0QsS0FBSyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRS9CLE1BQU0sTUFBTSxHQUFHLElBQUksa0JBQVMsRUFBRSxDQUFDO1FBQy9CLE1BQU0sVUFBVSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZDLElBQUksTUFBTSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxNQUFNO2dCQUNGLE1BQUEsTUFBQSxNQUFBLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSwwQ0FDcEIsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUNyRCwwQ0FBRSxJQUFJLDBDQUNILFlBQVksR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLFFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FDckYsQ0FBQztTQUNUO1FBRUQsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE9BQU8sTUFBTSxDQUNULHNCQUFzQixHQUFHLENBQUMsSUFBSSxvQ0FBb0MsQ0FDckUsQ0FBQztTQUNMO1FBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRTlCLElBQUksV0FBVyxDQUFDO1FBQ2hCLElBQUksTUFBQSxNQUFBLE1BQU0sQ0FBQyxNQUFNLDBDQUFFLE9BQU8sMENBQUUsSUFBSSxFQUFFO1lBQzlCLFdBQVcsR0FBRyxJQUFBLDJCQUFpQixFQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9EO1FBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSw0QkFBa0IsQ0FBQztZQUNuQyxHQUFHLEVBQUU7Z0JBQ0QsT0FBTyxFQUFFLEtBQUs7YUFDakI7U0FDSixDQUFDLENBQUM7UUFFSCxNQUFNLFdBQVcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDcEMsSUFBSSxFQUFFO2dCQUNGLFdBQVc7YUFDZDtZQUNELE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUk7WUFDMUIsTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUUsS0FBSztTQUNkLENBQUMsQ0FBQztRQUNILElBQUksV0FBVyxZQUFZLEtBQUssRUFBRTtZQUM5QixNQUFNLFdBQVcsQ0FBQztTQUNyQjtRQUVELElBQUksR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRTNCLE9BQU8sQ0FBQztZQUNKLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUEvREQsMENBK0RDIn0=