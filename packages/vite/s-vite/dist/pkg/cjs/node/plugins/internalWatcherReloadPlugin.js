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
        if (!api.file.match(/\.css$/)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLG1EQUE0RDtBQVU1RCxNQUFNLGNBQWMsR0FBYSxFQUFFLENBQUM7QUFDcEMsSUFBSSxXQUFXLENBQUM7QUFFaEI7O0dBRUc7QUFDSCxrQkFBZSxDQUFDLFNBQWlCLEVBQUUsRUFBZ0IsRUFBRSxDQUFDLENBQUM7SUFDbkQsSUFBSSxFQUFFLHVDQUF1QztJQUU3QyxLQUFLLEVBQUUsT0FBTztJQUVkLHdFQUF3RTtJQUN4RSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNYLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxFQUFFO0tBQ3RFLENBQUM7SUFFRixlQUFlLENBQUMsR0FBRztRQUNmLDZCQUE2QjtRQUU3Qix5QkFBeUI7UUFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzNCLE9BQU87U0FDVjtRQUVELGlEQUFpRDtRQUNqRCxxREFBcUQ7UUFDckQsa0RBQWtEO1FBQ2xELHlDQUF5QztRQUN6QyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsT0FBTztTQUNWO1FBRUQsd0NBQXdDO1FBQ3hDLGFBQWE7UUFDYixZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDMUIsV0FBVyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDMUIsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLElBQUk7aUJBQ3JCLE9BQU8sQ0FBQyxHQUFHLElBQUEsdUJBQWdCLEdBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztpQkFDcEMsT0FBTyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUVoQyxzQkFBc0I7WUFDdEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dCQUNmLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxrQkFBa0I7Z0JBQ3pCLElBQUksRUFBRTtvQkFDRixRQUFRLEVBQUUsR0FBRyxDQUFDLElBQUk7b0JBQ2xCLElBQUksRUFBRSxTQUFTO2lCQUNsQjthQUNKLENBQUMsQ0FBQztRQUNQLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVSLG1CQUFtQjtRQUNuQixvQkFBb0I7UUFDcEIsNkJBQTZCO1FBQzdCLGFBQWE7UUFDYixLQUFLO1FBQ0wsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQsd0VBQXdFO0lBQ3hFLDRCQUE0QjtJQUM1QixZQUFZO0lBQ1osNEJBQTRCO0lBQzVCLHlCQUF5QjtJQUN6QixhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLFNBQVM7SUFFVCw4REFBOEQ7SUFDOUQscUNBQXFDO0lBQ3JDLFNBQVM7SUFFVCw0REFBNEQ7SUFDNUQsOENBQThDO0lBQzlDLDZFQUE2RTtJQUU3RSxxQ0FBcUM7SUFFckMsZ0ZBQWdGO0lBQ2hGLG9FQUFvRTtJQUNwRSxvQ0FBb0M7SUFFcEMsc0NBQXNDO0lBRXRDLCtCQUErQjtJQUMvQixzQ0FBc0M7SUFDdEMsbUNBQW1DO0lBQ25DLFlBQVk7SUFFWix5Q0FBeUM7SUFFekMsMEVBQTBFO0lBQzFFLFNBQVM7SUFFVCxpQ0FBaUM7SUFDakMsa0RBQWtEO0lBQ2xELG1CQUFtQjtJQUNuQixxQ0FBcUM7SUFDckMsbUNBQW1DO0lBQ25DLGFBQWE7SUFDYixTQUFTO0lBRVQsMkRBQTJEO0lBQzNELCtCQUErQjtJQUMvQixVQUFVO0lBRVYsMEVBQTBFO0lBQzFFLGtDQUFrQztJQUVsQyxvRUFBb0U7SUFDcEUsMkNBQTJDO0lBQzNDLDhDQUE4QztJQUM5QyxLQUFLO0NBQ1IsQ0FBQyxDQUFDIn0=