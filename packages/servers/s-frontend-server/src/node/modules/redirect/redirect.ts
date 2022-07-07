import __dirname from '@coffeekraken/sugar/node/fs/dirname';

export default async function redirect(express, settings, config) {
    // register handler
    config.handlers.redirect = {
        path: `${__dirname()}/redirectHandler`,
    };

    return true;
}
