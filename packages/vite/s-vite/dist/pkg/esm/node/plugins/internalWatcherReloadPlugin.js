// @ts-nocheck
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __SugarConfig from '@coffeekraken/s-sugar-config';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __chokidar from 'chokidar';
import __picomatch from 'picomatch';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sV0FBVyxNQUFNLFdBQVcsQ0FBQztBQVVwQzs7R0FFRztBQUNILGVBQWUsQ0FBQyxTQUFpQixFQUFFLEVBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELElBQUksRUFBRSx1Q0FBdUM7SUFFN0MsS0FBSyxFQUFFLE9BQU87SUFFZCx3RUFBd0U7SUFDeEUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDWCxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsRUFBRTtLQUN0RSxDQUFDO0lBRUYsZUFBZSxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBaUI7UUFDOUQsTUFBTSxHQUFHLFdBQVcsQ0FDaEI7WUFDSSxNQUFNLEVBQUUsSUFBSTtZQUNaLEdBQUcsRUFBRSxJQUFJO1NBQ1osRUFDRCxNQUFNLENBQ1QsQ0FBQztRQUVGLE1BQU0sV0FBVyxHQUFHLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQ2xELENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUM1QixDQUFDO1FBRUYsTUFBTSxtQkFBbUIsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckQsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRTtZQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO2dCQUFFLE9BQU87WUFFbEUsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBRXZCLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU07Z0JBQUUsVUFBVSxHQUFHLElBQUksQ0FBQztZQUNsRSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUc7Z0JBQ2pELFVBQVUsR0FBRyxJQUFJLENBQUM7WUFFdEIsSUFBSSxDQUFDLFVBQVU7Z0JBQUUsT0FBTztZQUV4QixrRUFBa0U7UUFDdEUsQ0FBQyxDQUFDO1FBRUYsZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQ3JCLHNDQUFzQyxFQUN0QyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ0YsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQ0osQ0FBQztRQUVGLE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFO1lBQy9DLGFBQWEsRUFBRSxJQUFJO1NBQ3RCLENBQUMsQ0FBQztRQUVILG1FQUFtRTtRQUNuRSwyQkFBMkI7UUFFM0IsNkRBQTZEO1FBQzdELFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3BDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FDSixDQUFDLENBQUMifQ==