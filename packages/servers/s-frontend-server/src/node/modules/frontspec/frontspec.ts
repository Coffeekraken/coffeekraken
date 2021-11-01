import __SDocmap from '@coffeekraken/s-docmap';
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';

export default async function frontspec(express, settings, config) {
    config.middlewares.frontspec = {
        path: `${__dirname()}/frontspecMiddleware`,
        settings: {},
    };

    return true;
}
