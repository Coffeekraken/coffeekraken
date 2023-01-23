// @ts-nocheck

import __SSitemapBuilder from '../node/SSitemapBuilder';

export default (stringArgs = '') => {
    return new Promise(async (resolve) => {
        const sitemap = new __SSitemapBuilder();
        const result = await sitemap.build(stringArgs);
        resolve(result);
    });
};
