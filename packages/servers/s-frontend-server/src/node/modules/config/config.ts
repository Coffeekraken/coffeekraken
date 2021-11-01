import __SDocmap from '@coffeekraken/s-docmap';
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';

export default async function config(express, settings, config) {
    config.middlewares.config = {
        path: `${__dirname()}/configMiddleware`,
        settings: {},
    };

    return true;
}
