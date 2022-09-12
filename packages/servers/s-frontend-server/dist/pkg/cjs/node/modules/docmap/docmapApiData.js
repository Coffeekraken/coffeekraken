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
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const scrapeUrl_1 = __importDefault(require("@coffeekraken/sugar/node/og/scrapeUrl"));
const package_1 = require("@coffeekraken/sugar/package");
const path_1 = require("@coffeekraken/sugar/path");
function docmapApiData({ req, res, pageConfig }) {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        if (!req.params.namespace) {
            throw new Error(`[SFrontendServer.docmapApiData] Missing "namespace" parameter from the url...`);
        }
        s_bench_1.default.start('data.docmapApiData');
        s_bench_1.default.step('data.docmapApiData', 'beforeDocmapRead');
        const docmap = new s_docmap_1.default();
        const docmapJson = yield docmap.read();
        const docObj = docmapJson.map[req.params.namespace];
        if (!docObj) {
            return reject(`The api documentation "${req.path}" you requested does not exists...`);
        }
        s_bench_1.default.step('data.docmapApiData', 'afterDocmapRead');
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
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<yellow>[og]</yellow> Scraping opengraph from url "<cyan>${docblocks[0].see[i].url}</cyan>"`,
                    });
                    docblocks[0].see[i].og = yield (0, scrapeUrl_1.default)(docblocks[0].see[i].url);
                }
            }
        }
        s_bench_1.default.step('data.docmapApiData', 'afterDocblockParsing');
        resolve({
            docblocks,
            packageJson: (0, package_1.__packageJsonSync)(),
            packageRoot: (0, path_1.__packageRootDir)(),
        });
    }));
}
exports.default = docmapApiData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLDBFQUFtRDtBQUNuRCxzRUFBK0M7QUFDL0MsZ0VBQXlDO0FBQ3pDLHdFQUFpRDtBQUNqRCxzRkFBZ0U7QUFFaEUseURBQWdFO0FBQ2hFLG1EQUE0RDtBQUU1RCxTQUF3QixhQUFhLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRTtJQUMxRCxPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM1RCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDdkIsTUFBTSxJQUFJLEtBQUssQ0FDWCwrRUFBK0UsQ0FDbEYsQ0FBQztTQUNMO1FBRUQsaUJBQVEsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUVyQyxpQkFBUSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBRXhELE1BQU0sTUFBTSxHQUFHLElBQUksa0JBQVMsRUFBRSxDQUFDO1FBQy9CLE1BQU0sVUFBVSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVwRCxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsT0FBTyxNQUFNLENBQ1QsMEJBQTBCLEdBQUcsQ0FBQyxJQUFJLG9DQUFvQyxDQUN6RSxDQUFDO1NBQ0w7UUFFRCxpQkFBUSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBRXZELElBQUksdUJBQXVCLEVBQUUsc0JBQXNCLENBQUM7UUFFcEQsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLG9CQUFXLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNuRCxjQUFjLEVBQUUsSUFBSTtZQUNwQixNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDakIsSUFBSSxRQUFRLENBQUMsT0FBTztvQkFBRSxPQUFPLEtBQUssQ0FBQztnQkFDbkMsSUFBSSxRQUFRLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO29CQUN0Qyx1QkFBdUIsR0FBRyxRQUFRLENBQUM7b0JBQ25DLE9BQU8sSUFBSSxDQUFDO2lCQUNmO2dCQUNELElBQ0ksdUJBQXVCO29CQUN2QixDQUFDLHNCQUFzQjtvQkFDdkIsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUNyQjtvQkFDRSxPQUFPLElBQUksQ0FBQztpQkFDZjtnQkFDRCxJQUNJLHVCQUF1QjtvQkFDdkIsQ0FBQyxzQkFBc0I7b0JBQ3ZCLFFBQVEsQ0FBQyxTQUFTLEVBQ3BCO29CQUNFLHNCQUFzQixHQUFHLFFBQVEsQ0FBQztvQkFDbEMsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO2dCQUNELE9BQU8sS0FBSyxDQUFDO1lBQ2pCLENBQUM7U0FDSixDQUFDLENBQUM7UUFFSCxNQUFNLGlCQUFpQixDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2hDLE1BQU0sU0FBUyxHQUFHLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRS9DLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNsQixJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDOUMsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDUixJQUFJLEVBQUUsZUFBTSxDQUFDLFNBQVM7d0JBQ3RCLEtBQUssRUFBRSw0REFBNEQsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVU7cUJBQ3ZHLENBQUMsQ0FBQztvQkFDSCxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxNQUFNLElBQUEsbUJBQVcsRUFDdEMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQzFCLENBQUM7aUJBQ0w7YUFDSjtTQUNKO1FBRUQsaUJBQVEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUU1RCxPQUFPLENBQUM7WUFDSixTQUFTO1lBQ1QsV0FBVyxFQUFFLElBQUEsMkJBQWlCLEdBQUU7WUFDaEMsV0FBVyxFQUFFLElBQUEsdUJBQWdCLEdBQUU7U0FDbEMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUE5RUQsZ0NBOEVDIn0=