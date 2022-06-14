import __SBench from '@coffeekraken/s-bench';
import __SDocblock from '@coffeekraken/s-docblock';
import __SDocmap from '@coffeekraken/s-docmap';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __scrapeUrl from '@coffeekraken/sugar/node/og/scrapeUrl';
import __namespaceCompliant from '@coffeekraken/sugar/shared/string/namespaceCompliant';
import __packageJsonSync from '@coffeekraken/sugar/node/package/jsonSync';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';

export default function docmapApiData({ req, res, pageConfig }) {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        if (!req.params.namespace) {
            throw new Error(
                `[SFrontendServer.docmapApiData] Missing "namespace" parameter from the url...`,
            );
        }

        __SBench.start('data.docmapApiData');

        __SBench.step('data.docmapApiData', 'beforeDocmapRead');

        const docmap = new __SDocmap();
        const docmapJson = await docmap.read();
        const docObj = docmapJson.map[req.params.namespace];

        if (!docObj) {
            return reject(
                `The api documentation "${req.path}" you requested does not exists...`,
            );
        }

        __SBench.step('data.docmapApiData', 'afterDocmapRead');

        let firstBlockWithNamespace, nextBlockWithNamespace;

        const docblocksInstance = new __SDocblock(docObj.path, {
            renderMarkdown: true,
            filter: (docblock) => {
                if (docblock.private) return false;
                if (docblock.id === req.params.namespace) {
                    firstBlockWithNamespace = docblock;
                    return true;
                }
                if (
                    firstBlockWithNamespace &&
                    !nextBlockWithNamespace &&
                    !docblock.namespace
                ) {
                    return true;
                }
                if (
                    firstBlockWithNamespace &&
                    !nextBlockWithNamespace &&
                    docblock.namespace
                ) {
                    nextBlockWithNamespace = docblock;
                    return false;
                }
                return false;
            },
        });

        await docblocksInstance.parse();
        const docblocks = docblocksInstance.toObject();

        if (docblocks.length) {
            if (docblocks[0].see) {
                for (let i = 0; i < docblocks[0].see.length; i++) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[og]</yellow> Scraping opengraph from url "<cyan>${docblocks[0].see[i].url}</cyan>"`,
                    });
                    docblocks[0].see[i].og = await __scrapeUrl(
                        docblocks[0].see[i].url,
                    );
                }
            }
        }

        __SBench.step('data.docmapApiData', 'afterDocblockParsing');

        resolve({
            docblocks,
            packageJson: __packageJsonSync(),
            packageRoot: __packageRoot(),
        });
    });
}
