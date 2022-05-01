import __SBench from '@coffeekraken/s-bench';
import __SDocblock from '@coffeekraken/s-docblock';
import __SDocMap from '@coffeekraken/s-docmap';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __scrapeUrl from '@coffeekraken/sugar/node/og/scrapeUrl';
import __fs from 'fs';

export default function docmapStyleguideData({ req, res, pageConfig }) {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        if (!req.params.path) {
            throw new Error(
                `[SFrontendServer.docmapStyleguideData] Missing "path" parameter from the url...`,
            );
        }

        __SBench.start('data.docmapStyleguideData');

        __SBench.step('data.docmapStyleguideData', 'beforeDocmapRead');

        const docmap = new __SDocMap();
        const docmapJson = await docmap.read();
        const styleguideMenu = docmapJson.menu.custom.styleguide;
        let styleguideObj =
            styleguideMenu.slug[`/styleguide/${req.params.path}`];

        if (!styleguideObj) {
            styleguideObj =
                docmapJson.menu.packages?.[
                    `${req.params.organisation}/${req.params.package}`
                ]?.slug?.[
                    `/package/${req.params.organisation}/${req.params.package}/styleguide/${req.params.path}`
                ];
        }

        __SBench.step('data.docmapStyleguideData', 'afterDocmapRead');

        if (!styleguideObj || !__fs.existsSync(styleguideObj.docmap.path)) {
            return reject(
                `The styleguide "${req.path}" you requested does not exists...`,
            );
        }

        const finalReqPath = `/styleguide/${req.params.path}`;

        __SBench.step('data.docmapStyleguideData', 'beforeDocblockParsing');

        const docblocksInstance = new __SDocblock(styleguideObj.docmap.path, {
            docblock: {
                renderMarkdown: false,
                filterByTag: {
                    menu: (value) => {
                        if (!value || typeof value !== 'string') return false;
                        const parts = value.split(/\s{2,99999999}/);
                        if (parts.length >= 2 && parts[1] === finalReqPath)
                            return true;
                        return false;
                    },
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

        __SBench.step('data.docmapStyleguideData', 'afterDocblockParsing');

        resolve({
            docblocks,
        });
    });
}
