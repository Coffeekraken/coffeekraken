var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SDocmap from '@coffeekraken/s-docmap';
import __SEnv from '@coffeekraken/s-env';
import __SMarkdownBuilder from '@coffeekraken/s-markdown-builder';
import __SPromise from '@coffeekraken/s-promise';
export default function docmapData({ req, res, pageConfig }) {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        // building the namespace with the passed
        // :organisation and :package params in the url
        let namespaceAr = [];
        if (req.params.organisation) {
            namespaceAr.push(req.params.organisation);
        }
        if (req.params.package) {
            namespaceAr.push(req.params.package);
        }
        // searching the docmap
        const docmap = new __SDocmap();
        const result = yield docmap.search({
            slug: req.params.path,
            namespace: namespaceAr.length
                ? `${namespaceAr.join('.')}.**`
                : '**',
        });
        // handle no results
        if (!Object.keys(result.items).length) {
            return resolve({
                body: `No data found in the docmap for the request "${req.url}"`,
            });
        }
        // initiate the html array
        // that will handle the result of the different
        // builders bellow
        let htmlAr = [];
        // Markdown builder
        const builder = new __SMarkdownBuilder({
            log: {
                summary: false,
            },
        });
        // loop on each results to build them in html
        for (let [namespace, item] of Object.entries(result.items)) {
            // markdown
            if (item.path.match(/\.md(\.[a-zA-Z0-9]+)?$/)) {
                const markdownResPromise = builder.build({
                    inPath: item.path,
                    target: 'html',
                    save: false,
                });
                if (__SEnv.is('verbose')) {
                    pipe(markdownResPromise);
                }
                const markdownRes = yield markdownResPromise;
                if (!markdownRes.length) {
                    htmlAr.push(`Error when building the markdown file "${item.path}"`);
                }
                else {
                    if (markdownRes[0].error) {
                        console.log(markdownRes[0].error);
                        htmlAr.push(markdownRes[0].error);
                    }
                    else {
                        htmlAr.push(markdownRes[0].code);
                    }
                }
            }
        }
        resolve({
            body: htmlAr.join('\n'),
        });
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sa0JBQWtCLE1BQU0sa0NBQWtDLENBQUM7QUFDbEUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFFakQsTUFBTSxDQUFDLE9BQU8sVUFBVSxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRTtJQUN2RCxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVELHlDQUF5QztRQUN6QywrQ0FBK0M7UUFDL0MsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUU7WUFDekIsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUNwQixXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDeEM7UUFFRCx1QkFBdUI7UUFDdkIsTUFBTSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUMvQixNQUFNLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDL0IsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSTtZQUNyQixTQUFTLEVBQUUsV0FBVyxDQUFDLE1BQU07Z0JBQ3pCLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUs7Z0JBQy9CLENBQUMsQ0FBQyxJQUFJO1NBQ2IsQ0FBQyxDQUFDO1FBRUgsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDbkMsT0FBTyxPQUFPLENBQUM7Z0JBQ1gsSUFBSSxFQUFFLGdEQUFnRCxHQUFHLENBQUMsR0FBRyxHQUFHO2FBQ25FLENBQUMsQ0FBQztTQUNOO1FBRUQsMEJBQTBCO1FBQzFCLCtDQUErQztRQUMvQyxrQkFBa0I7UUFDbEIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWhCLG1CQUFtQjtRQUNuQixNQUFNLE9BQU8sR0FBRyxJQUFJLGtCQUFrQixDQUFDO1lBQ25DLEdBQUcsRUFBRTtnQkFDRCxPQUFPLEVBQUUsS0FBSzthQUNqQjtTQUNKLENBQUMsQ0FBQztRQUVILDZDQUE2QztRQUM3QyxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEQsV0FBVztZQUNYLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsRUFBRTtnQkFDM0MsTUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO29CQUNyQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2pCLE1BQU0sRUFBRSxNQUFNO29CQUNkLElBQUksRUFBRSxLQUFLO2lCQUNkLENBQUMsQ0FBQztnQkFDSCxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lCQUM1QjtnQkFDRCxNQUFNLFdBQVcsR0FBRyxNQUFNLGtCQUFrQixDQUFDO2dCQUU3QyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTtvQkFDckIsTUFBTSxDQUFDLElBQUksQ0FDUCwwQ0FBMEMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUN6RCxDQUFDO2lCQUNMO3FCQUFNO29CQUNILElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRTt3QkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNyQzt5QkFBTTt3QkFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDcEM7aUJBQ0o7YUFDSjtTQUNKO1FBRUQsT0FBTyxDQUFDO1lBQ0osSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQzFCLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=