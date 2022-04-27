import __SDocmap from '@coffeekraken/s-docmap';
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';

export default async function dynamic(express, settings, config) {
    // register handler
    config.handlers.dynamic = {
        path: `${__dirname()}/dynamicHandler`,
    };

    return true;
}
