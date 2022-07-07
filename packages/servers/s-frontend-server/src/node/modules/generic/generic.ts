import __dirname from '@coffeekraken/sugar/node/fs/dirname';

export default async function generic(express, settings, config) {
    // register handler
    config.handlers.generic = {
        description:
            'Generic handler that make use of the "views" property of your page config to render them using the SViewRenderer',
        path: `${__dirname()}/genericHandler`,
    };

    return true;
}
