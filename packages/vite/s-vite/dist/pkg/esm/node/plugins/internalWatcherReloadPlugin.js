// @ts-nocheck
import { __packageRootDir } from '@coffeekraken/sugar/path';
const _hmrFilesPaths = [];
let _hmrTimeout;
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
                .replace(`${__packageRootDir()}`, '')
                .replace(/^\/src/, '/dist');
            // notify the frontend
            api.server.ws.send({
                type: 'custom',
                event: 'sugar.update.css',
                data: {
                    srcPath: api.file,
                    srcRelPath: api.file.replace(`${__packageRootDir()}/`, ''),
                    distPath: api.file.replace('/src/', '/dist/'),
                    distRelPath: api.file
                        .replace(`${__packageRootDir()}/`, '')
                        .replace('/src/', '/dist/'),
                    url: servePath,
                },
            });
        }, 100);
        return [];
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQVU1RCxNQUFNLGNBQWMsR0FBYSxFQUFFLENBQUM7QUFDcEMsSUFBSSxXQUFXLENBQUM7QUFFaEI7O0dBRUc7QUFDSCxlQUFlLENBQUMsU0FBaUIsRUFBRSxFQUFnQixFQUFFLENBQUMsQ0FBQztJQUNuRCxJQUFJLEVBQUUsdUNBQXVDO0lBRTdDLEtBQUssRUFBRSxPQUFPO0lBRWQsd0VBQXdFO0lBQ3hFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ1gsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLEVBQUU7S0FDdEUsQ0FBQztJQUVGLGVBQWUsQ0FBQyxHQUFHO1FBQ2YseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZELE9BQU87U0FDVjtRQUVELGlEQUFpRDtRQUNqRCxxREFBcUQ7UUFDckQsa0RBQWtEO1FBQ2xELHlDQUF5QztRQUN6QyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsT0FBTztTQUNWO1FBRUQsd0NBQXdDO1FBQ3hDLGFBQWE7UUFDYixZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDMUIsV0FBVyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDMUIsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLElBQUk7aUJBQ3JCLE9BQU8sQ0FBQyxHQUFHLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7aUJBQ3BDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFaEMsc0JBQXNCO1lBQ3RCLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDZixJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsa0JBQWtCO2dCQUN6QixJQUFJLEVBQUU7b0JBQ0YsT0FBTyxFQUFFLEdBQUcsQ0FBQyxJQUFJO29CQUNqQixVQUFVLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO29CQUMxRCxRQUFRLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQztvQkFDN0MsV0FBVyxFQUFFLEdBQUcsQ0FBQyxJQUFJO3lCQUNoQixPQUFPLENBQUMsR0FBRyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO3lCQUNyQyxPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQztvQkFDL0IsR0FBRyxFQUFFLFNBQVM7aUJBQ2pCO2FBQ0osQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRVIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0osQ0FBQyxDQUFDIn0=