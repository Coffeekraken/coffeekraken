import { __dirname } from '@coffeekraken/sugar/fs';
import { __packageJsonSync } from '@coffeekraken/sugar/package';
import __path from 'path';

export default (api) => {
    const packageJsonHighest = __packageJsonSync(process.cwd(), {
        highest: true,
    });

    let dashboardLazyProxyUrl = '',
        dashboardInitProxyUrl = '';

    if (packageJsonHighest.name === '@coffeekraken/coffeekraken') {
        // const dashboardLazyPath = __path.resolve(
        //     __dirname(),
        //     '../../../../src/js/lazy.ts',
        // );
        // dashboardLazyProxyUrl = `http://localhost:5173/@fs${dashboardLazyPath}`;
        const dashboardInitPath = __path.resolve(
            __dirname(),
            '../../../../src/js/init.ts',
        );
        dashboardInitProxyUrl = `http://0.0.0.0:5173/@fs${dashboardInitPath}`;
    }

    return {
        server: {
            proxy: {
                // '/sugar/dashboard/lazy.js': {
                //     target: dashboardLazyProxyUrl,
                //     changeOrigin: true,
                //     rewrite: (path) =>
                //         path.replace('/sugar/dashboard/lazy.js', ''),
                // },
                '/sugar/dashboard/init.js': {
                    target: dashboardInitProxyUrl,
                    changeOrigin: true,
                    rewrite: (path) =>
                        path.replace('/sugar/dashboard/init.js', ''),
                },
            },
        },
    };
};
