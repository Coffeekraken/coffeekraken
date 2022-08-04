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
import __packageJsonSync from '@coffeekraken/sugar/node/package/jsonSync';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sa0JBQWtCLE1BQU0sa0NBQWtDLENBQUM7QUFDbEUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxpQkFBaUIsTUFBTSwyQ0FBMkMsQ0FBQztBQUUxRSxNQUFNLENBQUMsT0FBTyxVQUFVLHVCQUF1QixDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUU7SUFDcEUsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTs7UUFDNUQsSUFBSSxJQUFJLENBQUM7UUFFVCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FDWCxvRkFBb0YsQ0FDdkYsQ0FBQztTQUNMO1FBRUQsUUFBUSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBRS9DLFFBQVEsQ0FBQyxJQUFJLENBQUMsOEJBQThCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUVsRSxNQUFNLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQy9CLE1BQU0sVUFBVSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZDLElBQUksTUFBTSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxNQUFNO2dCQUNGLE1BQUEsTUFBQSxNQUFBLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSwwQ0FDcEIsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUNyRCwwQ0FBRSxJQUFJLDBDQUNILFlBQVksR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLFFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FDckYsQ0FBQztTQUNUO1FBRUQsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE9BQU8sTUFBTSxDQUNULHNCQUFzQixHQUFHLENBQUMsSUFBSSxvQ0FBb0MsQ0FDckUsQ0FBQztTQUNMO1FBRUQsUUFBUSxDQUFDLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBRWpFLElBQUksV0FBVyxDQUFDO1FBQ2hCLElBQUksTUFBQSxNQUFBLE1BQU0sQ0FBQyxNQUFNLDBDQUFFLE9BQU8sMENBQUUsSUFBSSxFQUFFO1lBQzlCLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMvRDtRQUVELE1BQU0sT0FBTyxHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQztRQUV6QyxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FDMUIsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUNWLElBQUksRUFBRTtnQkFDRixXQUFXO2FBQ2Q7WUFDRCxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJO1lBQzFCLE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFFLEtBQUs7U0FDZCxDQUFDLENBQ0wsQ0FBQztRQUNGLElBQUksV0FBVyxZQUFZLEtBQUssRUFBRTtZQUM5QixNQUFNLFdBQVcsQ0FBQztTQUNyQjtRQUVELElBQUksR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRTNCLE9BQU8sQ0FBQztZQUNKLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==