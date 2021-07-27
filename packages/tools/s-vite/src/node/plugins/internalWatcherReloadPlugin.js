// @ts-nocheck
import __picomatch from 'picomatch';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __chokidar from 'chokidar';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
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
        __SEventEmitter.global.on('s-postcss-sugar-plugin-import-update', (e) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJuYWxXYXRjaGVyUmVsb2FkUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW50ZXJuYWxXYXRjaGVyUmVsb2FkUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxXQUFXLENBQUE7QUFDbkMsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFHekQsT0FBTyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBUzVEOztHQUVHO0FBQ0gsZUFBZSxDQUFDLFNBQWlCLEVBQUUsRUFBZ0IsRUFBRSxDQUFDLENBQUM7SUFDckQsSUFBSSxFQUFFLHVDQUF1QztJQUU3QyxLQUFLLEVBQUUsT0FBTztJQUVkLHdFQUF3RTtJQUN4RSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUV2RixlQUFlLENBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFpQjtRQUNqRSxNQUFNLEdBQUcsV0FBVyxDQUFDO1lBQ2pCLE1BQU0sRUFBRSxJQUFJO1lBQ1osR0FBRyxFQUFFLElBQUk7U0FDWixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRVgsTUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUVoRixNQUFNLG1CQUFtQixHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUNwRCxNQUFNLFdBQVcsR0FBRyxDQUFDLElBQVksRUFBRSxFQUFFO1lBRW5DLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7Z0JBQUUsT0FBTztZQUdsRSxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFFdkIsSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTTtnQkFBRSxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ2xFLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRztnQkFBRSxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBRXpFLElBQUksQ0FBQyxVQUFVO2dCQUFFLE9BQU87WUFHeEIsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQUUsSUFBSSxDQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFBO1FBRUQsZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsc0NBQXNDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN0RSxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUU7WUFDakQsYUFBYSxFQUFFLElBQUk7U0FDcEIsQ0FBQyxDQUFDO1FBRUgsbUVBQW1FO1FBQ25FLDJCQUEyQjtRQUUzQiw2REFBNkQ7UUFDN0QsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFDbkMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDeEMsQ0FBQztDQUNGLENBQUMsQ0FBQSJ9