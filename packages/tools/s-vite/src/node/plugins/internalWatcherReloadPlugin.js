// @ts-nocheck
import __picomatch from 'picomatch';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __globalEventEmitter from '@coffeekraken/sugar/node/event/globalEventEmitter';
import __chokidar from 'chokidar';
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
            config: true,
            css: true
        }, config);
        const configFiles = __SugarConfig.foldersRealPaths.map(p => `${p}/*.config.js`);
        const shouldReloadConfigs = __picomatch(configFiles);
        const checkReload = (path) => {
            if (!path.match(/\.config\.js$/) && !path.match(/\.css$/))
                return;
            let passChecks = false;
            if (shouldReloadConfigs(path) && config.config)
                passChecks = true;
            if (!passChecks && path.match(/\.css$/) && config.css)
                passChecks = true;
            if (!passChecks)
                return;
            setTimeout(() => ws.send({ type: 'full-reload' }, path), 100);
        };
        __globalEventEmitter.on('s-postcss-sugar-plugin-import-update', (e) => {
            checkReload(e.path);
        });
        const localWatcher = __chokidar.watch(configFiles, {
            ignoreInitial: true
        });
        // Ensure Vite keeps track of the files and triggers HMR as needed.
        // watcher.add(configFiles)
        // Do a full page reload if any of the watched files changes.
        localWatcher.on('add', checkReload);
        localWatcher.on('change', checkReload);
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJuYWxXYXRjaGVyUmVsb2FkUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW50ZXJuYWxXYXRjaGVyUmVsb2FkUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxXQUFXLENBQUE7QUFDbkMsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFFekQsT0FBTyxvQkFBb0IsTUFBTSxtREFBbUQsQ0FBQztBQUVyRixPQUFPLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFTbEM7O0dBRUc7QUFDSCxlQUFlLENBQUMsU0FBaUIsRUFBRSxFQUFnQixFQUFFLENBQUMsQ0FBQztJQUNyRCxJQUFJLEVBQUUsdUNBQXVDO0lBRTdDLEtBQUssRUFBRSxPQUFPO0lBRWQsd0VBQXdFO0lBQ3hFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBRXZGLGVBQWUsQ0FBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQWlCO1FBQ2pFLE1BQU0sR0FBRyxXQUFXLENBQUM7WUFDakIsTUFBTSxFQUFFLElBQUk7WUFDWixHQUFHLEVBQUUsSUFBSTtTQUNaLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFWCxNQUFNLFdBQVcsR0FBRyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRWhGLE1BQU0sbUJBQW1CLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3BELE1BQU0sV0FBVyxHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUU7WUFFbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztnQkFBRSxPQUFPO1lBR2xFLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztZQUV2QixJQUFJLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNO2dCQUFFLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDbEUsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxHQUFHO2dCQUFFLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFFekUsSUFBSSxDQUFDLFVBQVU7Z0JBQUUsT0FBTztZQUd4QixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFBRSxJQUFJLENBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUE7UUFFRCxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsc0NBQXNDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNwRSxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUU7WUFDakQsYUFBYSxFQUFFLElBQUk7U0FDcEIsQ0FBQyxDQUFDO1FBRUgsbUVBQW1FO1FBQ25FLDJCQUEyQjtRQUUzQiw2REFBNkQ7UUFDN0QsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFDbkMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDeEMsQ0FBQztDQUNGLENBQUMsQ0FBQSJ9