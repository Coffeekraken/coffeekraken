// @ts-nocheck

import __picomatch from 'picomatch';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SugarConfig from '@coffeekraken/s-sugar-config';
import type { PluginOption, ViteDevServer } from 'vite';
import __fs from 'fs';
import __chokidar from 'chokidar';
import __SEventEmitter from '@coffeekraken/s-event-emitter';

/**
 * Configuration for the watched paths.
 */
interface Config {
    config: boolean;
}

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

    configureServer({ watcher, ws, config: { logger } }: ViteDevServer) {
        config = __deepMerge(
            {
                config: true,
                css: true,
            },
            config,
        );

        const configFiles = __SugarConfig.foldersRealPaths.map(
            (p) => `${p}/*.config.js`,
        );

        const shouldReloadConfigs = __picomatch(configFiles);
        const checkReload = (path: string) => {
            if (!path.match(/\.config\.js$/) && !path.match(/\.css$/)) return;

            let passChecks = false;

            if (shouldReloadConfigs(path) && config.config) passChecks = true;
            if (!passChecks && path.match(/\.css$/) && config.css)
                passChecks = true;

            if (!passChecks) return;

            // setTimeout(() => ws.send({ type: 'full-reload' }, path ), 100);
        };

        __SEventEmitter.global.on(
            's-postcss-sugar-plugin-import-update',
            (e) => {
                checkReload(e.path);
            },
        );

        const localWatcher = __chokidar.watch(configFiles, {
            ignoreInitial: true,
        });

        // Ensure Vite keeps track of the files and triggers HMR as needed.
        // watcher.add(configFiles)

        // Do a full page reload if any of the watched files changes.
        localWatcher.on('add', checkReload);
        localWatcher.on('change', checkReload);
    },
});
