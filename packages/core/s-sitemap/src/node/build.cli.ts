// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import __SSitemap from './SSitemap';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const sitemap = new __SSitemap();
        const buildPromise = sitemap.build(stringArgs);
        pipe(buildPromise);
        resolve(await buildPromise);
    });
};
