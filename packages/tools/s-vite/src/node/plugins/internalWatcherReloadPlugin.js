// @ts-nocheck
import __picomatch from 'picomatch';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SugarConfig from '@coffeekraken/s-sugar-config';
/**
 * Allows to automatically reload the page when a watched file changes.
 */
export default (config = {}) => ({
    name: 's-vite-plugin-internal-watcher-reload',
    apply: 'serve',
    // NOTE: Enable globbing so that Vite keeps track of the template files.
    config: () => ({ server: { watch: { disableGlobbing: false, followSymlinks: true } } }),
    configureServer({ watcher, ws, config: { logger } }) {
        config = __deepMerge({
            config: true
        }, config);
        const configFiles = __SugarConfig.foldersRealPaths.map(p => `${p}/*.config.js`);
        const shouldReload = __picomatch(configFiles);
        const checkReload = (path) => {
            if (shouldReload(path)) {
                setTimeout(() => ws.send({ type: 'full-reload' }), 100);
                // if (log)
                //   logger.info(`${green('page reload')} ${dim(relative(root, path))}`, { clear: true, timestamp: true })
            }
        };
        // Ensure Vite keeps track of the files and triggers HMR as needed.
        watcher.add(configFiles);
        // Do a full page reload if any of the watched files changes.
        watcher.on('add', checkReload);
        watcher.on('change', checkReload);
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJuYWxXYXRjaGVyUmVsb2FkUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW50ZXJuYWxXYXRjaGVyUmVsb2FkUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxXQUFXLENBQUE7QUFDbkMsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFVekQ7O0dBRUc7QUFDSCxlQUFlLENBQUMsU0FBaUIsRUFBRSxFQUFnQixFQUFFLENBQUMsQ0FBQztJQUNyRCxJQUFJLEVBQUUsdUNBQXVDO0lBRTdDLEtBQUssRUFBRSxPQUFPO0lBRWQsd0VBQXdFO0lBQ3hFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBRXZGLGVBQWUsQ0FBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQWlCO1FBQ2pFLE1BQU0sR0FBRyxXQUFXLENBQUM7WUFDakIsTUFBTSxFQUFFLElBQUk7U0FDZixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRVgsTUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUVoRixNQUFNLFlBQVksR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDN0MsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRTtZQUNuQyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdEIsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtnQkFDdkQsV0FBVztnQkFDWCwwR0FBMEc7YUFDM0c7UUFDSCxDQUFDLENBQUE7UUFFRCxtRUFBbUU7UUFDbkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUV4Qiw2REFBNkQ7UUFDN0QsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFDOUIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDbkMsQ0FBQztDQUNGLENBQUMsQ0FBQSJ9