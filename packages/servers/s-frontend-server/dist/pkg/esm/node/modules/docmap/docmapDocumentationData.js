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
        __SBench.start('data.docmapDocumentationData');
        __SBench.step('data.docmapDocumentationData', 'beforeDocmapRead');
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
        __SBench.step('data.docmapDocumentationData', 'afterDocmapRead');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sa0JBQWtCLE1BQU0sa0NBQWtDLENBQUM7QUFDbEUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFaEUsTUFBTSxDQUFDLE9BQU8sVUFBVSx1QkFBdUIsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFO0lBQ3BFLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O1FBQzVELElBQUksSUFBSSxDQUFDO1FBRVQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQ1gsb0ZBQW9GLENBQ3ZGLENBQUM7U0FDTDtRQUVELFFBQVEsQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUUvQyxRQUFRLENBQUMsSUFBSSxDQUFDLDhCQUE4QixFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFbEUsTUFBTSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUMvQixNQUFNLFVBQVUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QyxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsTUFBTTtnQkFDRixNQUFBLE1BQUEsTUFBQSxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsMENBQ3BCLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FDckQsMENBQUUsSUFBSSwwQ0FDSCxZQUFZLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxRQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQ3JGLENBQUM7U0FDVDtRQUVELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxPQUFPLE1BQU0sQ0FDVCxzQkFBc0IsR0FBRyxDQUFDLElBQUksb0NBQW9DLENBQ3JFLENBQUM7U0FDTDtRQUVELFFBQVEsQ0FBQyxJQUFJLENBQUMsOEJBQThCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUVqRSxJQUFJLFdBQVcsQ0FBQztRQUNoQixJQUFJLE1BQUEsTUFBQSxNQUFNLENBQUMsTUFBTSwwQ0FBRSxPQUFPLDBDQUFFLElBQUksRUFBRTtZQUM5QixXQUFXLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDL0Q7UUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7UUFFekMsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQzFCLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDVixJQUFJLEVBQUU7Z0JBQ0YsV0FBVzthQUNkO1lBQ0QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSTtZQUMxQixNQUFNLEVBQUUsTUFBTTtZQUNkLElBQUksRUFBRSxLQUFLO1NBQ2QsQ0FBQyxDQUNMLENBQUM7UUFDRixJQUFJLFdBQVcsWUFBWSxLQUFLLEVBQUU7WUFDOUIsTUFBTSxXQUFXLENBQUM7U0FDckI7UUFFRCxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUUzQixPQUFPLENBQUM7WUFDSixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=