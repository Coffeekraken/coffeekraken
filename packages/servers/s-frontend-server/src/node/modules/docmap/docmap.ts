import __SDocmap from '@coffeekraken/s-docmap';
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';
import __SPromise from '@coffeekraken/s-promise';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';

export default function docmap(express, settings, config) {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const docmap = new __SDocmap();
        const docmapJson = await pipe(docmap.read());
        const menu = docmapJson.menu;

        config.middlewares.docmap = {
            path: `${__dirname()}/docmapMiddleware`,
            settings: {},
        };

        // @ts-ignore
        Object.keys(menu.slug).forEach((slug) => {
            config.routes[slug] = {
                handler: 'markdown',
            };
        });

        if (menu.packages) {
            Object.keys(menu.packages).forEach((packageName) => {
                // @ts-ignore
                const packageObj = menu.packages[packageName];
                Object.keys(packageObj?.slug ?? {}).forEach((slug) => {
                    config.routes[slug] = {
                        handler: 'markdown',
                    };
                });
            });
        }

        resolve(true);
    });
}
