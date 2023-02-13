import { __dirname } from '@coffeekraken/sugar/fs';

export default function sitemap({ express, settings, config }) {
    return new Promise(async (resolve) => {
        // handlers
        config.handlers.sitemapJson = {
            description: 'Serve the sitemap.xml in JSON',
            path: `${__dirname()}/sitemapJsonHandler`,
            ettings: {},
        };

        // pages
        config.pages.sitemapXml = {
            description: 'Serve the sitemap.xml in JSON',
            slugs: ['/sitemap.json'],
            handler: 'sitemapJson',
        };

        resolve(true);
    });
}
