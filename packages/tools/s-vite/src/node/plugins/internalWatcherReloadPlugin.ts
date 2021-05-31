// @ts-nocheck

import __picomatch from 'picomatch'
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SugarConfig from '@coffeekraken/s-sugar-config';
import type { PluginOption, ViteDevServer } from 'vite'

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
  config: () => ({ server: { watch: { disableGlobbing: false, followSymlinks: true } } }),

  configureServer ({ watcher, ws, config: { logger } }: ViteDevServer) {
    config = __deepMerge({
        config: true
    }, config);

    const configFiles = __SugarConfig.foldersRealPaths.map(p => `${p}/*.config.js`);

    const shouldReload = __picomatch(configFiles)
    const checkReload = (path: string) => {
      if (shouldReload(path)) {
        setTimeout(() => ws.send({ type: 'full-reload' }), 100)
        // if (log)
        //   logger.info(`${green('page reload')} ${dim(relative(root, path))}`, { clear: true, timestamp: true })
      }
    }

    // Ensure Vite keeps track of the files and triggers HMR as needed.
    watcher.add(configFiles)

    // Do a full page reload if any of the watched files changes.
    watcher.on('add', checkReload)
    watcher.on('change', checkReload)
  },
})