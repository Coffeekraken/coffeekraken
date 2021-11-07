import __path from 'path';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';

export default (env, config) => {
    if (env.platform !== 'node') return;
    return {
        sources: {
            docmap: {
                /**
                 * @name            active
                 * @namespace       config.sitemap.sources.docmap
                 * @type            Boolean
                 * @default         true
                 *
                 * Specify if you want to use the docmap.json as a sitemap source
                 *
                 * @since           2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                active: true,
                settings: {},
                path: __path.resolve(
                    `${__dirname()}/../node/sources/SSitemapDocmapSource`,
                ),
            },
        },
    };
};
