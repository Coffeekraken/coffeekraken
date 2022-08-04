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
    config: () => ({
        server: { watch: { disableGlobbing: false, followSymlinks: true } },
    }),
    configureServer({ watcher, ws, config: { logger } }) {
        config = __deepMerge({
            config: true,
            css: true,
        }, config);
        const configFiles = __SugarConfig.foldersRealPaths.map((p) => `${p}/*.config.js`);
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
            // setTimeout(() => ws.send({ type: 'full-reload' }, path ), 100);
        };
        __SEventEmitter.global.on('s-postcss-sugar-plugin-import-update', (e) => {
            checkReload(e.path);
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFHekQsT0FBTyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBUzVEOztHQUVHO0FBQ0gsZUFBZSxDQUFDLFNBQWlCLEVBQUUsRUFBZ0IsRUFBRSxDQUFDLENBQUM7SUFDbkQsSUFBSSxFQUFFLHVDQUF1QztJQUU3QyxLQUFLLEVBQUUsT0FBTztJQUVkLHdFQUF3RTtJQUN4RSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNYLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxFQUFFO0tBQ3RFLENBQUM7SUFFRixlQUFlLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFpQjtRQUM5RCxNQUFNLEdBQUcsV0FBVyxDQUNoQjtZQUNJLE1BQU0sRUFBRSxJQUFJO1lBQ1osR0FBRyxFQUFFLElBQUk7U0FDWixFQUNELE1BQU0sQ0FDVCxDQUFDO1FBRUYsTUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FDbEQsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQzVCLENBQUM7UUFFRixNQUFNLG1CQUFtQixHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNyRCxNQUFNLFdBQVcsR0FBRyxDQUFDLElBQVksRUFBRSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7Z0JBQUUsT0FBTztZQUVsRSxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFFdkIsSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTTtnQkFBRSxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ2xFLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRztnQkFDakQsVUFBVSxHQUFHLElBQUksQ0FBQztZQUV0QixJQUFJLENBQUMsVUFBVTtnQkFBRSxPQUFPO1lBRXhCLGtFQUFrRTtRQUN0RSxDQUFDLENBQUM7UUFFRixlQUFlLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDckIsc0NBQXNDLEVBQ3RDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDRixXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FDSixDQUFDO1FBRUYsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUU7WUFDL0MsYUFBYSxFQUFFLElBQUk7U0FDdEIsQ0FBQyxDQUFDO1FBRUgsbUVBQW1FO1FBQ25FLDJCQUEyQjtRQUUzQiw2REFBNkQ7UUFDN0QsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDcEMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUNKLENBQUMsQ0FBQyJ9