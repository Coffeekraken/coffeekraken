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
const s_docblock_1 = __importDefault(require("@coffeekraken/s-docblock"));
const s_docmap_1 = __importDefault(require("@coffeekraken/s-docmap"));
const scrapeUrl_1 = __importDefault(require("@coffeekraken/sugar/node/og/scrapeUrl"));
const package_1 = require("@coffeekraken/sugar/package");
const path_1 = require("@coffeekraken/sugar/path");
function docmapApiData({ req, res, pageConfig }) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        if (!req.params.namespace) {
            throw new Error(`[SFrontendServer.docmapApiData] Missing "namespace" parameter from the url...`);
        }
        const bench = new s_bench_1.default('data.docmapApiData');
        bench.step('beforeDocmapRead');
        const docmap = new s_docmap_1.default();
        const docmapJson = yield docmap.read();
        const docObj = docmapJson.map[req.params.namespace];
        if (!docObj) {
            return reject(`The api documentation "${req.path}" you requested does not exists...`);
        }
        bench.step('afterDocmapRead');
        let firstBlockWithNamespace, nextBlockWithNamespace;
        const docblocksInstance = new s_docblock_1.default(docObj.path, {
            renderMarkdown: true,
            filter: (docblock) => {
                if (docblock.private)
                    return false;
                if (docblock.id === req.params.namespace) {
                    firstBlockWithNamespace = docblock;
                    return true;
                }
                if (firstBlockWithNamespace &&
                    !nextBlockWithNamespace &&
                    !docblock.namespace) {
                    return true;
                }
                if (firstBlockWithNamespace &&
                    !nextBlockWithNamespace &&
                    docblock.namespace) {
                    nextBlockWithNamespace = docblock;
                    return false;
                }
                return false;
            },
        });
        yield docblocksInstance.parse();
        const docblocks = docblocksInstance.toObject();
        if (docblocks.length) {
            if (docblocks[0].see) {
                for (let i = 0; i < docblocks[0].see.length; i++) {
                    console.log(`<yellow>[og]</yellow> Scraping opengraph from url "<cyan>${docblocks[0].see[i].url}</cyan>"`);
                    docblocks[0].see[i].og = yield (0, scrapeUrl_1.default)(docblocks[0].see[i].url);
                }
            }
        }
        bench.step('afterDocblockParsing');
        resolve({
            docblocks,
            packageJson: (0, package_1.__packageJsonSync)(),
            packageRoot: (0, path_1.__packageRootDir)(),
        });
    }));
}
exports.default = docmapApiData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLDBFQUFtRDtBQUNuRCxzRUFBK0M7QUFDL0Msc0ZBQWdFO0FBQ2hFLHlEQUFnRTtBQUNoRSxtREFBNEQ7QUFFNUQsU0FBd0IsYUFBYSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUU7SUFDMUQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUN6QyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDdkIsTUFBTSxJQUFJLEtBQUssQ0FDWCwrRUFBK0UsQ0FDbEYsQ0FBQztTQUNMO1FBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFFakQsS0FBSyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRS9CLE1BQU0sTUFBTSxHQUFHLElBQUksa0JBQVMsRUFBRSxDQUFDO1FBQy9CLE1BQU0sVUFBVSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVwRCxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsT0FBTyxNQUFNLENBQ1QsMEJBQTBCLEdBQUcsQ0FBQyxJQUFJLG9DQUFvQyxDQUN6RSxDQUFDO1NBQ0w7UUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFOUIsSUFBSSx1QkFBdUIsRUFBRSxzQkFBc0IsQ0FBQztRQUVwRCxNQUFNLGlCQUFpQixHQUFHLElBQUksb0JBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ25ELGNBQWMsRUFBRSxJQUFJO1lBQ3BCLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUNqQixJQUFJLFFBQVEsQ0FBQyxPQUFPO29CQUFFLE9BQU8sS0FBSyxDQUFDO2dCQUNuQyxJQUFJLFFBQVEsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7b0JBQ3RDLHVCQUF1QixHQUFHLFFBQVEsQ0FBQztvQkFDbkMsT0FBTyxJQUFJLENBQUM7aUJBQ2Y7Z0JBQ0QsSUFDSSx1QkFBdUI7b0JBQ3ZCLENBQUMsc0JBQXNCO29CQUN2QixDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQ3JCO29CQUNFLE9BQU8sSUFBSSxDQUFDO2lCQUNmO2dCQUNELElBQ0ksdUJBQXVCO29CQUN2QixDQUFDLHNCQUFzQjtvQkFDdkIsUUFBUSxDQUFDLFNBQVMsRUFDcEI7b0JBQ0Usc0JBQXNCLEdBQUcsUUFBUSxDQUFDO29CQUNsQyxPQUFPLEtBQUssQ0FBQztpQkFDaEI7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQztTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0saUJBQWlCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDaEMsTUFBTSxTQUFTLEdBQUcsaUJBQWlCLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFL0MsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ2xCLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtnQkFDbEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUM5QyxPQUFPLENBQUMsR0FBRyxDQUNQLDREQUE0RCxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUNoRyxDQUFDO29CQUNGLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLE1BQU0sSUFBQSxtQkFBVyxFQUN0QyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FDMUIsQ0FBQztpQkFDTDthQUNKO1NBQ0o7UUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFFbkMsT0FBTyxDQUFDO1lBQ0osU0FBUztZQUNULFdBQVcsRUFBRSxJQUFBLDJCQUFpQixHQUFFO1lBQ2hDLFdBQVcsRUFBRSxJQUFBLHVCQUFnQixHQUFFO1NBQ2xDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDO0FBN0VELGdDQTZFQyJ9