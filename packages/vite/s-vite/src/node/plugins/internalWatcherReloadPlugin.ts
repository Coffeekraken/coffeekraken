// @ts-nocheck

import { __packageRootDir } from '@coffeekraken/sugar/path';
import type { PluginOption } from 'vite';

/**
 * Configuration for the watched paths.
 */
interface Config {
    config: boolean;
}

const _hmrFilesPaths: string[] = [];
let _hmrTimeout;

/**
 * Allows to automatically reload the page when a watched file changes.
 */
export default (config: Config = {}): PluginOption => ({
    name: 's-vite-plugin-internal-watcher-reload',

    apply: 'serve',

    // NOTE: Enable globbing so that Vite keeps track of the template files.
    config: () => ({
        server: { watch: { disableGlobbing: false, followSymlinks: true } },
    }),

    handleHotUpdate(api) {
        // console.log('___UP', api);

        // handle only css reload
        if (!api.file.match(/\.css$/)) {
            return;
        }

        // if the file is not in the _hmrFilesPaths stack
        // it means that it's the first time we see this file
        // so we just add it to the stack and stop here...
        // the file will be handled the next time
        if (!_hmrFilesPaths.includes(api.file)) {
            _hmrFilesPaths.push(api.file);
            return;
        }

        // make use of timeout to avoid multiple
        // hmr reload
        clearTimeout(_hmrTimeout);
        _hmrTimeout = setTimeout(() => {
            const servePath = api.file
                .replace(`${__packageRootDir()}`, '')
                .replace(/^\/src/, '/dist');

            // notify the frontend
            api.server.ws.send({
                type: 'custom',
                event: 'sugar.update.css',
                data: {
                    filePath: api.file,
                    path: servePath,
                },
            });
        }, 100);

        // server.ws.send({
        //   type: 'custom',
        //   event: 'special-update',
        //   data: {}
        // })
        return [];
    },

    // configureServer({ watcher, ws, config: { logger } }: ViteDevServer) {
    //     config = __deepMerge(
    //         {
    //             config: true,
    //             css: true,
    //         },
    //         config,
    //     );

    //     const configFiles = __SugarConfig.foldersRealPaths.map(
    //         (p) => `${p}/*.config.js`,
    //     );

    //     const shouldReloadConfigs = __picomatch(configFiles);
    //     const checkReload = (path: string) => {
    //         if (!path.match(/\.config\.js$/) && !path.match(/\.css$/)) return;

    //         // let passChecks = false;

    //         // if (shouldReloadConfigs(path) && config.config) passChecks = true;
    //         // if (!passChecks && path.match(/\.css$/) && config.css)
    //         //     passChecks = true;

    //         // if (!passChecks) return;

    //         let type = 'update';
    //         if (path.match(/\.css$/)) {
    //             type = 'css.update';
    //         }

    //         console.log('up', type, path);

    //         setTimeout(() => ws.send({ type, event: 'sugar' }, path), 100);
    //     };

    //     __SEventEmitter.global.on(
    //         's-postcss-sugar-plugin-import-update',
    //         (e) => {
    //             console.log('PPP', e);
    //             checkReload(e.path);
    //         },
    //     );

    //     const localWatcher = __chokidar.watch(configFiles, {
    //         ignoreInitial: true,
    //     });

    //     // Ensure Vite keeps track of the files and triggers HMR as needed.
    //     // watcher.add(configFiles)

    //     // Do a full page reload if any of the watched files changes.
    //     localWatcher.on('add', checkReload);
    //     localWatcher.on('change', checkReload);
    // },
});
