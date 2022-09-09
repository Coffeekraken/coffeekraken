import { __dirname } from '@coffeekraken/sugar/fs';

export default async function frontspec(express, settings, config) {
    config.middlewares.frontspec = {
        description:
            'Gives access to a "frontspec" object in the "res.templateData" passed to the template',
        path: `${__dirname()}/frontspecMiddleware`,
        settings: {},
    };

    return true;
}
