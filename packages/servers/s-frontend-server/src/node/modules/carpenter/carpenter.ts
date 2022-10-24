import __SPromise from '@coffeekraken/s-promise';
import { __dirname } from '@coffeekraken/sugar/fs';

export default function carpenter(express, settings, config) {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        // handlers
        config.handlers.carpenterJson = {
            description: 'Serve the carpenter data in JSON',
            path: `${__dirname()}/carpenterJsonHandler`,
            ettings: {},
        };
        config.handlers.carpenter = {
            description:
                'Serve the carpenter page that display a component at a time',
            path: `${__dirname()}/carpenterHandler`,
            ettings: {},
        };

        // pages
        config.pages.carpenterJson = {
            description: 'Serve the carpenter data in JSON',
            slugs: ['/carpenter.json'],
            handler: 'carpenterJson',
        };

        config.pages.carpenter = {
            description:
                'Serve the carpenter page that display a component at a time',
            slugs: ['/carpenter', '/carpenter/:dotpath'],
            handler: 'carpenter',
        };

        resolve(true);
    });
}
