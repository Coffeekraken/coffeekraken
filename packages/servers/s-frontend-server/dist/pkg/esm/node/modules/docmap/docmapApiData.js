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
import __packageJsonSync from '@coffeekraken/sugar/node/package/jsonSync';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
export default function docmapApiData({ req, res, pageConfig }) {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        if (!req.params.namespace) {
            throw new Error(`[SFrontendServer.docmapApiData] Missing "namespace" parameter from the url...`);
        }
        __SBench.start('data.docmapApiData');
        __SBench.step('data.docmapApiData', 'beforeDocmapRead');
        const docmap = new __SDocmap();
        const docmapJson = yield docmap.read();
        const docObj = docmapJson.map[req.params.namespace];
        if (!docObj) {
            return reject(`The api documentation "${req.path}" you requested does not exists...`);
        }
        __SBench.step('data.docmapApiData', 'afterDocmapRead');
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
        __SBench.step('data.docmapApiData', 'afterDocblockParsing');
        resolve({
            docblocks,
            packageJson: __packageJsonSync(),
            packageRoot: __packageRoot(),
        });
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLHVDQUF1QyxDQUFDO0FBRWhFLE9BQU8saUJBQWlCLE1BQU0sMkNBQTJDLENBQUM7QUFDMUUsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFFdEUsTUFBTSxDQUFDLE9BQU8sVUFBVSxhQUFhLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRTtJQUMxRCxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVELElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTtZQUN2QixNQUFNLElBQUksS0FBSyxDQUNYLCtFQUErRSxDQUNsRixDQUFDO1NBQ0w7UUFFRCxRQUFRLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFFckMsUUFBUSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBRXhELE1BQU0sTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFDL0IsTUFBTSxVQUFVLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkMsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXBELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxPQUFPLE1BQU0sQ0FDVCwwQkFBMEIsR0FBRyxDQUFDLElBQUksb0NBQW9DLENBQ3pFLENBQUM7U0FDTDtRQUVELFFBQVEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUV2RCxJQUFJLHVCQUF1QixFQUFFLHNCQUFzQixDQUFDO1FBRXBELE1BQU0saUJBQWlCLEdBQUcsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNuRCxjQUFjLEVBQUUsSUFBSTtZQUNwQixNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDakIsSUFBSSxRQUFRLENBQUMsT0FBTztvQkFBRSxPQUFPLEtBQUssQ0FBQztnQkFDbkMsSUFBSSxRQUFRLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO29CQUN0Qyx1QkFBdUIsR0FBRyxRQUFRLENBQUM7b0JBQ25DLE9BQU8sSUFBSSxDQUFDO2lCQUNmO2dCQUNELElBQ0ksdUJBQXVCO29CQUN2QixDQUFDLHNCQUFzQjtvQkFDdkIsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUNyQjtvQkFDRSxPQUFPLElBQUksQ0FBQztpQkFDZjtnQkFDRCxJQUNJLHVCQUF1QjtvQkFDdkIsQ0FBQyxzQkFBc0I7b0JBQ3ZCLFFBQVEsQ0FBQyxTQUFTLEVBQ3BCO29CQUNFLHNCQUFzQixHQUFHLFFBQVEsQ0FBQztvQkFDbEMsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO2dCQUNELE9BQU8sS0FBSyxDQUFDO1lBQ2pCLENBQUM7U0FDSixDQUFDLENBQUM7UUFFSCxNQUFNLGlCQUFpQixDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2hDLE1BQU0sU0FBUyxHQUFHLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRS9DLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNsQixJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDOUMsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVM7d0JBQ3RCLEtBQUssRUFBRSw0REFBNEQsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVU7cUJBQ3ZHLENBQUMsQ0FBQztvQkFDSCxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxNQUFNLFdBQVcsQ0FDdEMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQzFCLENBQUM7aUJBQ0w7YUFDSjtTQUNKO1FBRUQsUUFBUSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1FBRTVELE9BQU8sQ0FBQztZQUNKLFNBQVM7WUFDVCxXQUFXLEVBQUUsaUJBQWlCLEVBQUU7WUFDaEMsV0FBVyxFQUFFLGFBQWEsRUFBRTtTQUMvQixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9