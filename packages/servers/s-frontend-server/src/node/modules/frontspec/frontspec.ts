import __SDocmap from '@coffeekraken/s-docmap';
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';

export default async function frontspec(express, settings, config) {
    config.middlewares.frontspec = {
        description:
            'Gives access to a "frontspec" object in the "res.templateData" passed to the template',
        path: `${__dirname()}/frontspecMiddleware`,
        settings: {},
    };

    return true;
}
