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
                    srcPath: api.file,
                    srcRelPath: api.file.replace(`${(0, path_1.__packageRootDir)()}/`, ''),
                    distPath: api.file.replace('/src/', '/dist/'),
                    distRelPath: api.file
                        .replace(`${(0, path_1.__packageRootDir)()}/`, '')
                        .replace('/src/', '/dist/'),
                    url: servePath,
                },
            });
        }, 100);
        return [];
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLG1EQUE0RDtBQVU1RCxNQUFNLGNBQWMsR0FBYSxFQUFFLENBQUM7QUFDcEMsSUFBSSxXQUFXLENBQUM7QUFFaEI7O0dBRUc7QUFDSCxrQkFBZSxDQUFDLFNBQWlCLEVBQUUsRUFBZ0IsRUFBRSxDQUFDLENBQUM7SUFDbkQsSUFBSSxFQUFFLHVDQUF1QztJQUU3QyxLQUFLLEVBQUUsT0FBTztJQUVkLHdFQUF3RTtJQUN4RSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNYLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxFQUFFO0tBQ3RFLENBQUM7SUFFRixlQUFlLENBQUMsR0FBRztRQUNmLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN2RCxPQUFPO1NBQ1Y7UUFFRCxpREFBaUQ7UUFDakQscURBQXFEO1FBQ3JELGtEQUFrRDtRQUNsRCx5Q0FBeUM7UUFDekMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLE9BQU87U0FDVjtRQUVELHdDQUF3QztRQUN4QyxhQUFhO1FBQ2IsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFCLFdBQVcsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQzFCLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxJQUFJO2lCQUNyQixPQUFPLENBQUMsR0FBRyxJQUFBLHVCQUFnQixHQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7aUJBQ3BDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFaEMsc0JBQXNCO1lBQ3RCLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDZixJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsa0JBQWtCO2dCQUN6QixJQUFJLEVBQUU7b0JBQ0YsT0FBTyxFQUFFLEdBQUcsQ0FBQyxJQUFJO29CQUNqQixVQUFVLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFBLHVCQUFnQixHQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7b0JBQzFELFFBQVEsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDO29CQUM3QyxXQUFXLEVBQUUsR0FBRyxDQUFDLElBQUk7eUJBQ2hCLE9BQU8sQ0FBQyxHQUFHLElBQUEsdUJBQWdCLEdBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQzt5QkFDckMsT0FBTyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUM7b0JBQy9CLEdBQUcsRUFBRSxTQUFTO2lCQUNqQjthQUNKLENBQUMsQ0FBQztRQUNQLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVSLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKLENBQUMsQ0FBQyJ9