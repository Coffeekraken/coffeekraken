import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __path from 'path';

export default function (env, config) {
    return {
        sources: {
            coffeekrakenio: {
                active: true,
                settings: {},
                path: __path.resolve(__dirname(), '../src/node/sitemap'),
            },
        },
    };
}
