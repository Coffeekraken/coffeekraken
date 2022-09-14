"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_event_emitter_1 = __importDefault(require("@coffeekraken/s-event-emitter"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const object_1 = require("@coffeekraken/sugar/object");
const chokidar_1 = __importDefault(require("chokidar"));
const picomatch_1 = __importDefault(require("picomatch"));
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
    configureServer({ watcher, ws, config: { logger } }) {
        config = (0, object_1.__deepMerge)({
            config: true,
            css: true,
        }, config);
        const configFiles = s_sugar_config_1.default.foldersRealPaths.map((p) => `${p}/*.config.js`);
        const shouldReloadConfigs = (0, picomatch_1.default)(configFiles);
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
        s_event_emitter_1.default.global.on('s-postcss-sugar-plugin-import-update', (e) => {
            checkReload(e.path);
        });
        const localWatcher = chokidar_1.default.watch(configFiles, {
            ignoreInitial: true,
        });
        // Ensure Vite keeps track of the files and triggers HMR as needed.
        // watcher.add(configFiles)
        // Do a full page reload if any of the watched files changes.
        localWatcher.on('add', checkReload);
        localWatcher.on('change', checkReload);
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9GQUE0RDtBQUM1RCxrRkFBeUQ7QUFDekQsdURBQXlEO0FBQ3pELHdEQUFrQztBQUNsQywwREFBb0M7QUFVcEM7O0dBRUc7QUFDSCxrQkFBZSxDQUFDLFNBQWlCLEVBQUUsRUFBZ0IsRUFBRSxDQUFDLENBQUM7SUFDbkQsSUFBSSxFQUFFLHVDQUF1QztJQUU3QyxLQUFLLEVBQUUsT0FBTztJQUVkLHdFQUF3RTtJQUN4RSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNYLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxFQUFFO0tBQ3RFLENBQUM7SUFFRixlQUFlLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFpQjtRQUM5RCxNQUFNLEdBQUcsSUFBQSxvQkFBVyxFQUNoQjtZQUNJLE1BQU0sRUFBRSxJQUFJO1lBQ1osR0FBRyxFQUFFLElBQUk7U0FDWixFQUNELE1BQU0sQ0FDVCxDQUFDO1FBRUYsTUFBTSxXQUFXLEdBQUcsd0JBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQ2xELENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUM1QixDQUFDO1FBRUYsTUFBTSxtQkFBbUIsR0FBRyxJQUFBLG1CQUFXLEVBQUMsV0FBVyxDQUFDLENBQUM7UUFDckQsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRTtZQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO2dCQUFFLE9BQU87WUFFbEUsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBRXZCLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU07Z0JBQUUsVUFBVSxHQUFHLElBQUksQ0FBQztZQUNsRSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUc7Z0JBQ2pELFVBQVUsR0FBRyxJQUFJLENBQUM7WUFFdEIsSUFBSSxDQUFDLFVBQVU7Z0JBQUUsT0FBTztZQUV4QixrRUFBa0U7UUFDdEUsQ0FBQyxDQUFDO1FBRUYseUJBQWUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUNyQixzQ0FBc0MsRUFDdEMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNGLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUNKLENBQUM7UUFFRixNQUFNLFlBQVksR0FBRyxrQkFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUU7WUFDL0MsYUFBYSxFQUFFLElBQUk7U0FDdEIsQ0FBQyxDQUFDO1FBRUgsbUVBQW1FO1FBQ25FLDJCQUEyQjtRQUUzQiw2REFBNkQ7UUFDN0QsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDcEMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUNKLENBQUMsQ0FBQyJ9