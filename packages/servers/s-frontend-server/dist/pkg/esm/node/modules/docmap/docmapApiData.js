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
import __SDocblock from '@coffeekraken/s-docblock';
import __SDocmap from '@coffeekraken/s-docmap';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __scrapeUrl from '@coffeekraken/sugar/node/og/scrapeUrl';
import { __packageJsonSync } from '@coffeekraken/sugar/package';
import { __packageRootDir } from '@coffeekraken/sugar/path';
export default function docmapApiData({ req, res, pageConfig }) {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        if (!req.params.namespace) {
            throw new Error(`[SFrontendServer.docmapApiData] Missing "namespace" parameter from the url...`);
        }
        const bench = new __SBench('data.docmapApiData');
        bench.step('beforeDocmapRead');
        const docmap = new __SDocmap();
        const docmapJson = yield docmap.read();
        const docObj = docmapJson.map[req.params.namespace];
        if (!docObj) {
            return reject(`The api documentation "${req.path}" you requested does not exists...`);
        }
        bench.step('afterDocmapRead');
        let firstBlockWithNamespace, nextBlockWithNamespace;
        const docblocksInstance = new __SDocblock(docObj.path, {
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
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[og]</yellow> Scraping opengraph from url "<cyan>${docblocks[0].see[i].url}</cyan>"`,
                    });
                    docblocks[0].see[i].og = yield __scrapeUrl(docblocks[0].see[i].url);
                }
            }
        }
        bench.step('afterDocblockParsing');
        resolve({
            docblocks,
            packageJson: __packageJsonSync(),
            packageRoot: __packageRootDir(),
        });
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLHVDQUF1QyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTVELE1BQU0sQ0FBQyxPQUFPLFVBQVUsYUFBYSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUU7SUFDMUQsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM1RCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDdkIsTUFBTSxJQUFJLEtBQUssQ0FDWCwrRUFBK0UsQ0FDbEYsQ0FBQztTQUNMO1FBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUVqRCxLQUFLLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFFL0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUMvQixNQUFNLFVBQVUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QyxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFcEQsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE9BQU8sTUFBTSxDQUNULDBCQUEwQixHQUFHLENBQUMsSUFBSSxvQ0FBb0MsQ0FDekUsQ0FBQztTQUNMO1FBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRTlCLElBQUksdUJBQXVCLEVBQUUsc0JBQXNCLENBQUM7UUFFcEQsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ25ELGNBQWMsRUFBRSxJQUFJO1lBQ3BCLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUNqQixJQUFJLFFBQVEsQ0FBQyxPQUFPO29CQUFFLE9BQU8sS0FBSyxDQUFDO2dCQUNuQyxJQUFJLFFBQVEsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7b0JBQ3RDLHVCQUF1QixHQUFHLFFBQVEsQ0FBQztvQkFDbkMsT0FBTyxJQUFJLENBQUM7aUJBQ2Y7Z0JBQ0QsSUFDSSx1QkFBdUI7b0JBQ3ZCLENBQUMsc0JBQXNCO29CQUN2QixDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQ3JCO29CQUNFLE9BQU8sSUFBSSxDQUFDO2lCQUNmO2dCQUNELElBQ0ksdUJBQXVCO29CQUN2QixDQUFDLHNCQUFzQjtvQkFDdkIsUUFBUSxDQUFDLFNBQVMsRUFDcEI7b0JBQ0Usc0JBQXNCLEdBQUcsUUFBUSxDQUFDO29CQUNsQyxPQUFPLEtBQUssQ0FBQztpQkFDaEI7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQztTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0saUJBQWlCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDaEMsTUFBTSxTQUFTLEdBQUcsaUJBQWlCLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFL0MsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ2xCLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtnQkFDbEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUM5QyxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUzt3QkFDdEIsS0FBSyxFQUFFLDREQUE0RCxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVTtxQkFDdkcsQ0FBQyxDQUFDO29CQUNILFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLE1BQU0sV0FBVyxDQUN0QyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FDMUIsQ0FBQztpQkFDTDthQUNKO1NBQ0o7UUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFFbkMsT0FBTyxDQUFDO1lBQ0osU0FBUztZQUNULFdBQVcsRUFBRSxpQkFBaUIsRUFBRTtZQUNoQyxXQUFXLEVBQUUsZ0JBQWdCLEVBQUU7U0FDbEMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==