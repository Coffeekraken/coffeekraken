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
function docmapData({ req, res, pageConfig }) {
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
        const docmap = new s_docmap_1.default();
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
        const builder = new s_markdown_builder_1.default({
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
exports.default = docmapData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQStDO0FBQy9DLDBGQUFrRTtBQUVsRSxTQUF3QixVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRTtJQUN2RCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7UUFDakMseUNBQXlDO1FBQ3pDLCtDQUErQztRQUMvQyxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtZQUN6QixXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDN0M7UUFDRCxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ3BCLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN4QztRQUVELHVCQUF1QjtRQUN2QixNQUFNLE1BQU0sR0FBRyxJQUFJLGtCQUFTLEVBQUUsQ0FBQztRQUMvQixNQUFNLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDL0IsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSTtZQUNyQixTQUFTLEVBQUUsV0FBVyxDQUFDLE1BQU07Z0JBQ3pCLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUs7Z0JBQy9CLENBQUMsQ0FBQyxJQUFJO1NBQ2IsQ0FBQyxDQUFDO1FBRUgsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDbkMsT0FBTyxPQUFPLENBQUM7Z0JBQ1gsSUFBSSxFQUFFLGdEQUFnRCxHQUFHLENBQUMsR0FBRyxHQUFHO2FBQ25FLENBQUMsQ0FBQztTQUNOO1FBRUQsMEJBQTBCO1FBQzFCLCtDQUErQztRQUMvQyxrQkFBa0I7UUFDbEIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWhCLG1CQUFtQjtRQUNuQixNQUFNLE9BQU8sR0FBRyxJQUFJLDRCQUFrQixDQUFDO1lBQ25DLEdBQUcsRUFBRTtnQkFDRCxPQUFPLEVBQUUsS0FBSzthQUNqQjtTQUNKLENBQUMsQ0FBQztRQUVILDZDQUE2QztRQUM3QyxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEQsV0FBVztZQUNYLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsRUFBRTtnQkFDM0MsTUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO29CQUNyQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2pCLE1BQU0sRUFBRSxNQUFNO29CQUNkLElBQUksRUFBRSxLQUFLO2lCQUNkLENBQUMsQ0FBQztnQkFDSCxNQUFNLFdBQVcsR0FBRyxNQUFNLGtCQUFrQixDQUFDO2dCQUU3QyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTtvQkFDckIsTUFBTSxDQUFDLElBQUksQ0FDUCwwQ0FBMEMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUN6RCxDQUFDO2lCQUNMO3FCQUFNO29CQUNILElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRTt3QkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNyQzt5QkFBTTt3QkFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDcEM7aUJBQ0o7YUFDSjtTQUNKO1FBRUQsT0FBTyxDQUFDO1lBQ0osSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQzFCLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDO0FBdEVELDZCQXNFQyJ9