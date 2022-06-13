import __dirname from '@coffeekraken/sugar/node/fs/dirname';

export default async function dynamic(express, settings, config) {
    // register handler
    config.handlers['404'] = {
        description: 'Handle the 404 page',
        path: `${__dirname()}/404Handler`,
        settings: {},
    };

    return true;
}
