import __SBench from '@coffeekraken/s-bench';
import __SDocblock from '@coffeekraken/s-docblock';
import __SDocMap from '@coffeekraken/s-docmap';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __scrapeUrl from '@coffeekraken/sugar/node/og/scrapeUrl';
import __namespaceCompliant from '@coffeekraken/sugar/shared/string/namespaceCompliant';

export default function docmapApiData({ req, res, pageConfig }) {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        if (!req.params.namespace) {
            throw new Error(
                `[SFrontendServer.docmapApiData] Missing "namespace" parameter from the url...`,
            );
        }

        __SBench.start('data.docmapApiData');

        __SBench.step('data.docmapApiData', 'beforeDocmapRead');

        const docmap = new __SDocMap();
        const docmapJson = await docmap.read();
        const docObj = docmapJson.map[req.params.namespace];

        if (!docObj) {
            return reject(
                `The api documentation "${req.path}" you requested does not exists...`,
            );
        }

        __SBench.step('data.docmapApiData', 'afterDocmapRead');

        const docblocksInstance = new __SDocblock(docObj.path, {
            docblock: {
                renderMarkdown: true,
                filter: (docblock) => {
                    if (
                        __namespaceCompliant(
                            `${docblock.namespace}.${docblock.name}`,
                        ) === req.params.namespace
                    ) {
                        return true;
                    }
                    return false;
                },
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
        });
    });
}
