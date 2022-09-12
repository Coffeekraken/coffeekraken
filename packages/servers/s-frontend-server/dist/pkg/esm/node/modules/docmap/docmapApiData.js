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
            packageRoot: __packageRootDir(),
        });
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLHVDQUF1QyxDQUFDO0FBRWhFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTVELE1BQU0sQ0FBQyxPQUFPLFVBQVUsYUFBYSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUU7SUFDMUQsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM1RCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDdkIsTUFBTSxJQUFJLEtBQUssQ0FDWCwrRUFBK0UsQ0FDbEYsQ0FBQztTQUNMO1FBRUQsUUFBUSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRXJDLFFBQVEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUV4RCxNQUFNLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQy9CLE1BQU0sVUFBVSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENB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