import __SDocblock from '@coffeekraken/s-docblock';
import __SDocmap from '@coffeekraken/s-docmap';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __writeTmpFile } from '@coffeekraken/sugar/fs';
import __fs from 'fs';

export default async function (sharedData) {
    // return {
    //     error: sharedData,
    // };

    const req = sharedData.req;

    try {
        // if (!req.path) {
        //     throw new Error(
        //         `[SFrontendServer.docmapStyleguideData] Missing "path" parameter from the url...`,
        //     );
        // }

        await __SSugarConfig.load();

        const docmap = new __SDocmap();
        const docmapJson = await docmap.read();

        const styleguideMenu = docmapJson.menu.custom.styleguide;
        let styleguideObj = styleguideMenu.slug[req.path];

        // return {
        //     error: Object.keys(styleguideObj),
        // };

        if (!styleguideObj) {
            styleguideObj =
                docmapJson.menu.packages?.[
                    `${req.params.organisation}/${req.params.package}`
                ]?.slug?.[
                    `/package/${req.params.organisation}/${req.params.package}/styleguide/${req.path}`
                ];
        }

        if (!styleguideObj) {
            return {
                error: `The styleguide "${req.path}" you requested does not exists...`,
            };
        }
        if (!__fs.existsSync(styleguideObj.docmap.path)) {
            return {
                error: `The file "${styleguideObj.docmap.path}" does not exists on the filesystem...`,
            };
        }

        const slugsStack = [];
        const docblocksInstance = new __SDocblock(styleguideObj.docmap.path, {
            renderMarkdown: false,
            filterByTag: {
                menu: (value) => {
                    if (!value || typeof value !== 'string') return false;
                    const parts = value.split(/\s{2,99999999}/);
                    if (parts.length >= 2 && parts[1] === req.path) {
                        if (slugsStack.includes(parts[1])) return false;
                        slugsStack.push(parts[1]);
                        return true;
                    }
                    return false;
                },
            },
        });
        await docblocksInstance.parse();
        const docblocks = docblocksInstance.toObject();

        // if (docblocks.length) {
        //     if (docblocks[0].see) {
        //         for (let i = 0; i < docblocks[0].see.length; i++) {
        //             console.log(
        //                 `<yellow>[og]</yellow> Scraping opengraph from url "<cyan>${docblocks[0].see[i].url}</cyan>"`,
        //             );
        //             try {
        //                 docblocks[0].see[i].og = await __scrapeUrl(
        //                     docblocks[0].see[i].url,
        //                 );
        //             } catch (e) {
        //                 return {
        //                     error: e.toString(),
        //                 };
        //             }
        //         }
        //     }
        // }

        console.log(docmap.menu);

        const tmpPath = await __writeTmpFile(
            JSON.stringify({
                styleguideMenu: docmap.menu.custom,
                docblocks,
            }),
            {
                path: 'execFromPhp.json',
            },
        );

        return {
            filePath: tmpPath,
        };

        return {
            docblocks,
            // styleguideMenu: docmap.menu.custom.styleguide.tree.styleguide,
        };

        // return {
        //     error: tmpPath,
        // };

        // return {
        //     filePath: tmpPath,
        // };
    } catch (e) {
        return {
            error: e.toString(),
        };
    }
}
