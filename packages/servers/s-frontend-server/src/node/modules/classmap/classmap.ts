import { __dirname } from '@coffeekraken/sugar/fs';

export default async function classmap({ express, settings, config }) {
    // handlers
    config.handlers.classmapJson = {
        description: 'Load and serve the classmap.json file',
        path: `${__dirname()}/classmapJsonHandler`,
        ettings: {},
    };

    // pages
    config.pages.classmapJson = {
        description: 'Serve the classmap.json',
        slugs: ['/classmap.json'],
        handler: 'classmapJson',
    };

    return true;
}
