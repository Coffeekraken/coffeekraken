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
import __SMarkdownBuilder from '@coffeekraken/s-markdown-builder';
export default function docmapData({ req, res, pageConfig }) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sa0JBQWtCLE1BQU0sa0NBQWtDLENBQUM7QUFFbEUsTUFBTSxDQUFDLE9BQU8sVUFBVSxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRTtJQUN2RCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7UUFDakMseUNBQXlDO1FBQ3pDLCtDQUErQztRQUMvQyxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtZQUN6QixXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDN0M7UUFDRCxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ3BCLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN4QztRQUVELHVCQUF1QjtRQUN2QixNQUFNLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQy9CLE1BQU0sTUFBTSxHQUFHLE1BQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUMvQixJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJO1lBQ3JCLFNBQVMsRUFBRSxXQUFXLENBQUMsTUFBTTtnQkFDekIsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSztnQkFDL0IsQ0FBQyxDQUFDLElBQUk7U0FDYixDQUFDLENBQUM7UUFFSCxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRTtZQUNuQyxPQUFPLE9BQU8sQ0FBQztnQkFDWCxJQUFJLEVBQUUsZ0RBQWdELEdBQUcsQ0FBQyxHQUFHLEdBQUc7YUFDbkUsQ0FBQyxDQUFDO1NBQ047UUFFRCwwQkFBMEI7UUFDMUIsK0NBQStDO1FBQy9DLGtCQUFrQjtRQUNsQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFaEIsbUJBQW1CO1FBQ25CLE1BQU0sT0FBTyxHQUFHLElBQUksa0JBQWtCLENBQUM7WUFDbkMsR0FBRyxFQUFFO2dCQUNELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1NBQ0osQ0FBQyxDQUFDO1FBRUgsNkNBQTZDO1FBQzdDLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4RCxXQUFXO1lBQ1gsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFO2dCQUMzQyxNQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7b0JBQ3JDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDakIsTUFBTSxFQUFFLE1BQU07b0JBQ2QsSUFBSSxFQUFFLEtBQUs7aUJBQ2QsQ0FBQyxDQUFDO2dCQUNILE1BQU0sV0FBVyxHQUFHLE1BQU0sa0JBQWtCLENBQUM7Z0JBRTdDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO29CQUNyQixNQUFNLENBQUMsSUFBSSxDQUNQLDBDQUEwQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQ3pELENBQUM7aUJBQ0w7cUJBQU07b0JBQ0gsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFO3dCQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3JDO3lCQUFNO3dCQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNwQztpQkFDSjthQUNKO1NBQ0o7UUFFRCxPQUFPLENBQUM7WUFDSixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDMUIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==