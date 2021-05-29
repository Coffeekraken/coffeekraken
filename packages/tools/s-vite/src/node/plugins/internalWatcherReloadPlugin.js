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
        const configFiles = __SugarConfig.filesRealPaths;
        console.log(configFiles);
        // console.log(config);
        // const w = __chokidar.watch(configFiles.map(path => {
        //     return `${path}/*.js`;
        // }), {
        //     ignoreInitial: true
        // });
        // w.on('change', (path) => {
        //     setTimeout(() => {
        //         console.log('up', path);
        //         ws.send({ type: 'full-reload', path: '*' });
        //     }, 500);
        // });
        // __onProcessExit(() => {
        //     w.close();
        // });
        const shouldReload = __picomatch(configFiles);
        const checkReload = (path) => {
            console.log('UP', path);
            if (shouldReload(path)) {
                console.log('SHOULD', path);
                setTimeout(() => ws.send({ type: 'full-reload', path: '*' }), 1000);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJuYWxXYXRjaGVyUmVsb2FkUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW50ZXJuYWxXYXRjaGVyUmVsb2FkUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxXQUFXLENBQUE7QUFDbkMsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFVekQ7O0dBRUc7QUFDSCxlQUFlLENBQUMsU0FBaUIsRUFBRSxFQUFnQixFQUFFLENBQUMsQ0FBQztJQUNyRCxJQUFJLEVBQUUsdUNBQXVDO0lBRTdDLEtBQUssRUFBRSxPQUFPO0lBRWQsd0VBQXdFO0lBQ3hFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBRXZGLGVBQWUsQ0FBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQWlCO1FBQ2pFLE1BQU0sR0FBRyxXQUFXLENBQUM7WUFDakIsTUFBTSxFQUFFLElBQUk7U0FDZixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRVgsTUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDLGNBQWMsQ0FBQztRQUVqRCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXpCLHVCQUF1QjtRQUV2Qix1REFBdUQ7UUFDdkQsNkJBQTZCO1FBQzdCLFFBQVE7UUFDUiwwQkFBMEI7UUFDMUIsTUFBTTtRQUVOLDZCQUE2QjtRQUM3Qix5QkFBeUI7UUFDekIsbUNBQW1DO1FBQ25DLHVEQUF1RDtRQUN2RCxlQUFlO1FBQ2YsTUFBTTtRQUNOLDBCQUEwQjtRQUMxQixpQkFBaUI7UUFDakIsTUFBTTtRQUVOLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUM3QyxNQUFNLFdBQVcsR0FBRyxDQUFDLElBQVksRUFBRSxFQUFFO1lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzFCLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDOUIsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO2dCQUNuRSxXQUFXO2dCQUNYLDBHQUEwRzthQUMzRztRQUNILENBQUMsQ0FBQTtRQUVELG1FQUFtRTtRQUNuRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBRXhCLDZEQUE2RDtRQUM3RCxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQTtRQUM5QixPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0NBQ0YsQ0FBQyxDQUFBIn0=