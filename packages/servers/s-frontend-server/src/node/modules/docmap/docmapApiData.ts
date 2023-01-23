import __SBench from '@coffeekraken/s-bench';
import __SDocblock from '@coffeekraken/s-docblock';
import __SDocmap from '@coffeekraken/s-docmap';
import __scrapeUrl from '@coffeekraken/sugar/node/og/scrapeUrl';
import { __packageJsonSync } from '@coffeekraken/sugar/package';
import { __packageRootDir } from '@coffeekraken/sugar/path';

export default function docmapApiData({ req, res, pageConfig }) {
    return new Promise(async (resolve, reject) => {
        if (!req.params.namespace) {
            throw new Error(
                `[SFrontendServer.docmapApiData] Missing "namespace" parameter from the url...`,
            );
        }

        const bench = new __SBench('data.docmapApiData');

        bench.step('beforeDocmapRead');

        const docmap = new __SDocmap();
        const docmapJson = await docmap.read();
        const docObj = docmapJson.map[req.params.namespace];

        if (!docObj) {
            return reject(
                `The api documentation "${req.path}" you requested does not exists...`,
            );
        }

        bench.step('afterDocmapRead');

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
                    console.log(
                        `<yellow>[og]</yellow> Scraping opengraph from url "<cyan>${docblocks[0].see[i].url}</cyan>"`,
                    );
                    docblocks[0].see[i].og = await __scrapeUrl(
                        docblocks[0].see[i].url,
                    );
                }
            }
        }

        bench.step('afterDocblockParsing');

        resolve({
            docblocks,
            packageJson: __packageJsonSync(),
            packageRoot: __packageRootDir(),
        });
    });
}
