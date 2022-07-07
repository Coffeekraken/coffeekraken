import __dirname from '@coffeekraken/sugar/node/fs/dirname';

export default async function config(express, settings, config) {
    config.middlewares.config = {
        description:
            'Middleware that inject a "config" and a "configFiles" object for the views',
        path: `${__dirname()}/configMiddleware`,
        settings: {},
    };

    return true;
}
