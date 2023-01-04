"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("@coffeekraken/sugar/path");
const _hmrFilesPaths = [];
let _hmrTimeout;
/**
 * Allows to automatically reload the page when a watched file changes.
 */
exports.default = (config = {}) => ({
    name: 's-vite-plugin-internal-watcher-reload',
    apply: 'serve',
    // NOTE: Enable globbing so that Vite keeps track of the template files.
    config: () => ({
        server: { watch: { disableGlobbing: false, followSymlinks: true } },
    }),
    handleHotUpdate(api) {
        // console.log('___UP', api);
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
                .replace(`${(0, path_1.__packageRootDir)()}`, '')
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLG1EQUE0RDtBQVU1RCxNQUFNLGNBQWMsR0FBYSxFQUFFLENBQUM7QUFDcEMsSUFBSSxXQUFXLENBQUM7QUFFaEI7O0dBRUc7QUFDSCxrQkFBZSxDQUFDLFNBQWlCLEVBQUUsRUFBZ0IsRUFBRSxDQUFDLENBQUM7SUFDbkQsSUFBSSxFQUFFLHVDQUF1QztJQUU3QyxLQUFLLEVBQUUsT0FBTztJQUVkLHdFQUF3RTtJQUN4RSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNYLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxFQUFFO0tBQ3RFLENBQUM7SUFFRixlQUFlLENBQUMsR0FBRztRQUNmLDZCQUE2QjtRQUU3Qix5QkFBeUI7UUFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdkQsT0FBTztTQUNWO1FBRUQsaURBQWlEO1FBQ2pELHFEQUFxRDtRQUNyRCxrREFBa0Q7UUFDbEQseUNBQXlDO1FBQ3pDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixPQUFPO1NBQ1Y7UUFFRCx3Q0FBd0M7UUFDeEMsYUFBYTtRQUNiLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMxQixXQUFXLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUMxQixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsSUFBSTtpQkFDckIsT0FBTyxDQUFDLEdBQUcsSUFBQSx1QkFBZ0IsR0FBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO2lCQUNwQyxPQUFPLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRWhDLHNCQUFzQjtZQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLGtCQUFrQjtnQkFDekIsSUFBSSxFQUFFO29CQUNGLFFBQVEsRUFBRSxHQUFHLENBQUMsSUFBSTtvQkFDbEIsSUFBSSxFQUFFLFNBQVM7aUJBQ2xCO2FBQ0osQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRVIsbUJBQW1CO1FBQ25CLG9CQUFvQjtRQUNwQiw2QkFBNkI7UUFDN0IsYUFBYTtRQUNiLEtBQUs7UUFDTCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRCx3RUFBd0U7SUFDeEUsNEJBQTRCO0lBQzVCLFlBQVk7SUFDWiw0QkFBNEI7SUFDNUIseUJBQXlCO0lBQ3pCLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIsU0FBUztJQUVULDhEQUE4RDtJQUM5RCxxQ0FBcUM7SUFDckMsU0FBUztJQUVULDREQUE0RDtJQUM1RCw4Q0FBOEM7SUFDOUMsNkVBQTZFO0lBRTdFLHFDQUFxQztJQUVyQyxnRkFBZ0Y7SUFDaEYsb0VBQW9FO0lBQ3BFLG9DQUFvQztJQUVwQyxzQ0FBc0M7SUFFdEMsK0JBQStCO0lBQy9CLHNDQUFzQztJQUN0QyxtQ0FBbUM7SUFDbkMsWUFBWTtJQUVaLHlDQUF5QztJQUV6QywwRUFBMEU7SUFDMUUsU0FBUztJQUVULGlDQUFpQztJQUNqQyxrREFBa0Q7SUFDbEQsbUJBQW1CO0lBQ25CLHFDQUFxQztJQUNyQyxtQ0FBbUM7SUFDbkMsYUFBYTtJQUNiLFNBQVM7SUFFVCwyREFBMkQ7SUFDM0QsK0JBQStCO0lBQy9CLFVBQVU7SUFFViwwRUFBMEU7SUFDMUUsa0NBQWtDO0lBRWxDLG9FQUFvRTtJQUNwRSwyQ0FBMkM7SUFDM0MsOENBQThDO0lBQzlDLEtBQUs7Q0FDUixDQUFDLENBQUMifQ==