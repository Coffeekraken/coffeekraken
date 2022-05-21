import __SPromise from '@coffeekraken/s-promise';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';

export default function sitemap(express, settings, config) {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        // handlers
        config.handlers.sitemapJson = {
            path: `${__dirname()}/sitemapJsonHandler`,
            ettings: {},
        };

        // pages
        config.pages.sitemapXml = {
            slugs: ['/sitemap.json'],
            handler: 'sitemapJson',
        };

        resolve(true);
    });
}
