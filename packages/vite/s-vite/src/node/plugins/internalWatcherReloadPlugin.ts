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
        // handle only css reload
        if (!api.file.match(/\.css$/) || !api.file.match(/\/src/)) {
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
                    srcPath: api.file,
                    srcRelPath: api.file.replace(`${__packageRootDir()}/`, ''),
                    distPath: api.file.replace('/src/', '/dist/'),
                    distRelPath: api.file
                        .replace(`${__packageRootDir()}/`, '')
                        .replace('/src/', '/dist/'),
                    url: servePath,
                },
            });
        }, 100);

        return [];
    },
});
