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
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
const s_markdown_builder_1 = __importDefault(require("@coffeekraken/s-markdown-builder"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
function docmapData({ req, res, pageConfig }) {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
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
                if (s_env_1.default.is('verbose')) {
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
exports.default = docmapData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQStDO0FBQy9DLGdFQUF5QztBQUN6QywwRkFBa0U7QUFDbEUsd0VBQWlEO0FBRWpELFNBQXdCLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFO0lBQ3ZELE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVELHlDQUF5QztRQUN6QywrQ0FBK0M7UUFDL0MsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUU7WUFDekIsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUNwQixXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDeEM7UUFFRCx1QkFBdUI7UUFDdkIsTUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBUyxFQUFFLENBQUM7UUFDL0IsTUFBTSxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQy9CLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUk7WUFDckIsU0FBUyxFQUFFLFdBQVcsQ0FBQyxNQUFNO2dCQUN6QixDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLO2dCQUMvQixDQUFDLENBQUMsSUFBSTtTQUNiLENBQUMsQ0FBQztRQUVILG9CQUFvQjtRQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ25DLE9BQU8sT0FBTyxDQUFDO2dCQUNYLElBQUksRUFBRSxnREFBZ0QsR0FBRyxDQUFDLEdBQUcsR0FBRzthQUNuRSxDQUFDLENBQUM7U0FDTjtRQUVELDBCQUEwQjtRQUMxQiwrQ0FBK0M7UUFDL0Msa0JBQWtCO1FBQ2xCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVoQixtQkFBbUI7UUFDbkIsTUFBTSxPQUFPLEdBQUcsSUFBSSw0QkFBa0IsQ0FBQztZQUNuQyxHQUFHLEVBQUU7Z0JBQ0QsT0FBTyxFQUFFLEtBQUs7YUFDakI7U0FDSixDQUFDLENBQUM7UUFFSCw2Q0FBNkM7UUFDN0MsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hELFdBQVc7WUFDWCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLEVBQUU7Z0JBQzNDLE1BQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztvQkFDckMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUNqQixNQUFNLEVBQUUsTUFBTTtvQkFDZCxJQUFJLEVBQUUsS0FBSztpQkFDZCxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxlQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUN0QixJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFDNUI7Z0JBQ0QsTUFBTSxXQUFXLEdBQUcsTUFBTSxrQkFBa0IsQ0FBQztnQkFFN0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7b0JBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQ1AsMENBQTBDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FDekQsQ0FBQztpQkFDTDtxQkFBTTtvQkFDSCxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUU7d0JBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDckM7eUJBQU07d0JBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ3BDO2lCQUNKO2FBQ0o7U0FDSjtRQUVELE9BQU8sQ0FBQztZQUNKLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUMxQixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQXpFRCw2QkF5RUMifQ==