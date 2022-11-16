var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SBench from '@coffeekraken/s-bench';
import __SDocmap from '@coffeekraken/s-docmap';
import __SMarkdownBuilder from '@coffeekraken/s-markdown-builder';
import __SPromise from '@coffeekraken/s-promise';
import { __packageJsonSync } from '@coffeekraken/sugar/package';
export default function docmapDocumentationData({ req, res, pageConfig }) {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        let html;
        if (!req.params.path) {
            throw new Error(`[SFrontendServer.docmapDocumentationData] Missing "path" parameter from the url...`);
        }
        const bench = new __SBench('data.docmapDocumentationData');
        bench.step('beforeDocmapRead');
        const docmap = new __SDocmap();
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
            packageJson = __packageJsonSync(docObj.docmap.package.name);
        }
        const builder = new __SMarkdownBuilder();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sa0JBQWtCLE1BQU0sa0NBQWtDLENBQUM7QUFDbEUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFaEUsTUFBTSxDQUFDLE9BQU8sVUFBVSx1QkFBdUIsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFO0lBQ3BFLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O1FBQzVELElBQUksSUFBSSxDQUFDO1FBRVQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQ1gsb0ZBQW9GLENBQ3ZGLENBQUM7U0FDTDtRQUVELE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFFM0QsS0FBSyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRS9CLE1BQU0sTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFDL0IsTUFBTSxVQUFVLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkMsSUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE1BQU07Z0JBQ0YsTUFBQSxNQUFBLE1BQUEsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLDBDQUNwQixHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQ3JELDBDQUFFLElBQUksMENBQ0gsWUFBWSxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sUUFBUSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUNyRixDQUFDO1NBQ1Q7UUFFRCxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsT0FBTyxNQUFNLENBQ1Qsc0JBQXNCLEdBQUcsQ0FBQyxJQUFJLG9DQUFvQyxDQUNyRSxDQUFDO1NBQ0w7UUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFOUIsSUFBSSxXQUFXLENBQUM7UUFDaEIsSUFBSSxNQUFBLE1BQUEsTUFBTSxDQUFDLE1BQU0sMENBQUUsT0FBTywwQ0FBRSxJQUFJLEVBQUU7WUFDOUIsV0FBVyxHQUFHLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9EO1FBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1FBRXpDLE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUMxQixPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ1YsSUFBSSxFQUFFO2dCQUNGLFdBQVc7YUFDZDtZQUNELE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUk7WUFDMUIsTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUUsS0FBSztTQUNkLENBQUMsQ0FDTCxDQUFDO1FBQ0YsSUFBSSxXQUFXLFlBQVksS0FBSyxFQUFFO1lBQzlCLE1BQU0sV0FBVyxDQUFDO1NBQ3JCO1FBRUQsSUFBSSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFM0IsT0FBTyxDQUFDO1lBQ0osSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9