import __SPromise from '@coffeekraken/s-promise';
import { __dirname } from '@coffeekraken/sugar/fs';

export default function carpenter(express, settings, config) {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        // handlers
        config.handlers.carpenterJson = {
            description: 'Serve the carpenter data in JSON',
            path: `${__dirname()}/carpenterHandler`,
            ettings: {},
        };

        // pages
        config.pages.carpenter = {
            description: 'Serve the carpenter data in JSON',
            slugs: ['/carpenter.json'],
            handler: 'carpenterJson',
        };

        resolve(true);
    });
}
