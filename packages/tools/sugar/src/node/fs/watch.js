"use strict";
// @ts-nocheck
// @to-work
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chokidar_1 = __importDefault(require("chokidar"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const SFile_1 = __importDefault(require("./SFile"));
const onProcessExit_1 = __importDefault(require("../process/onProcessExit"));
/**
 * @name              watch
 * @namespace           sugar.node.fs
 * @type                Function
 * @async
 * @status              beta
 *
 * This function wrap the "chokidar" awesome library into an SPromise based "api" with some
 * cool features like getting back an SFile instance for each files updated, etc...
 *
 * @param         {String|String[]}             paths           The paths you want to watch. Exactly the same as chokidar ```paths``` argument
 * @param         {IWatchSettings}              [settings={}]      Some settings to configure your watch process. Support all the chokidar ones and some others listed bellow
 * @return        {SPromise}                                    An SPromise through which you will be able to listen for events like "add", "change", etc... All the chokidar events are supported
 *
 * @setting         {Boolean}       [SFile=true]            Specify if you want to get back some SFile instances instead of the simple path string
 *
 * @todo            tests
 * @todo            doc
 * @todo            {Feature}       Add support for SDirectory
 *
 * @example             js
 * import watch from '@coffeekraken/sugar/node/fs/watch';
 * watch('my/cool/directory/*.js').on('change', (file) => {
 *
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const fn = function watch(paths, settings = {}) {
    settings = Object.assign({ SFile: true, ignoreInitial: true, ignored: ['**/node_modules/**/*', '**/.git/**/*'] }, settings);
    let watcher;
    const promise = new SPromise_1.default(({ resolve, reject, emit }) => {
        watcher = chokidar_1.default
            // @ts-ignore
            .watch(paths, Object.assign({}, settings))
            .on('add', (path) => {
            const file = new SFile_1.default(path.toString(), {
                cwd: settings.cwd || null
            });
            emit('add', file);
        })
            .on('change', (path) => {
            const file = new SFile_1.default(path.toString(), {
                cwd: settings.cwd || null
            });
            emit('change', file);
        })
            .on('unlink', (path) => {
            const file = new SFile_1.default(path.toString(), {
                cwd: settings.cwd || null,
                checkExistence: false
            });
            emit('unlink', file);
        })
            .on('addDir', (path) => {
            emit('addDir', path);
        })
            .on('unlinkDir', (path) => {
            emit('unlinkDir', path);
        })
            .on('error', (error) => {
            emit('error', error);
        })
            .on('ready', () => {
            emit('ready');
        })
            .on('raw', (event, path, details) => {
            emit('raw', {
                event,
                path,
                details
            });
        });
    }, {
        id: 'sugar.fs.watch'
    });
    onProcessExit_1.default;
    () => {
        return watcher.close();
    };
    promise.on('finally', () => {
        if (watcher === undefined)
            return;
        watcher.close();
    });
    return promise;
};
exports.default = fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3YXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFdBQVc7Ozs7O0FBSVgsd0RBQWtDO0FBQ2xDLG1FQUE2QztBQUM3QyxvREFBOEI7QUFDOUIsNkVBQXVEO0FBR3ZEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsTUFBTSxFQUFFLEdBQVcsU0FBUyxLQUFLLENBQy9CLEtBQXdCLEVBQ3hCLFdBQTJCLEVBQUU7SUFFN0IsUUFBUSxtQkFDTixLQUFLLEVBQUUsSUFBSSxFQUNYLGFBQWEsRUFBRSxJQUFJLEVBQ25CLE9BQU8sRUFBRSxDQUFDLHNCQUFzQixFQUFFLGNBQWMsQ0FBQyxJQUM5QyxRQUFRLENBQ1osQ0FBQztJQUVGLElBQUksT0FBTyxDQUFDO0lBRVosTUFBTSxPQUFPLEdBQUcsSUFBSSxrQkFBVSxDQUM1QixDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVCLE9BQU8sR0FBRyxrQkFBVTtZQUNsQixhQUFhO2FBQ1osS0FBSyxDQUFDLEtBQUssb0JBQ1AsUUFBUSxFQUNYO2FBQ0QsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2xCLE1BQU0sSUFBSSxHQUFHLElBQUksZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDeEMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxHQUFHLElBQUksSUFBSTthQUMxQixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQzthQUNELEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNyQixNQUFNLElBQUksR0FBRyxJQUFJLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQ3hDLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRyxJQUFJLElBQUk7YUFDMUIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUM7YUFDRCxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDckIsTUFBTSxJQUFJLEdBQUcsSUFBSSxlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUN4QyxHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUcsSUFBSSxJQUFJO2dCQUN6QixjQUFjLEVBQUUsS0FBSzthQUN0QixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQzthQUNELEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNyQixJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQzthQUNELEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN4QixJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQzthQUNELEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNyQixJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQzthQUNELEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUM7YUFDRCxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRTtZQUNsQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLEtBQUs7Z0JBQ0wsSUFBSTtnQkFDSixPQUFPO2FBQ1IsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLEVBQ0Q7UUFDRSxFQUFFLEVBQUUsZ0JBQWdCO0tBQ3JCLENBQ0YsQ0FBQztJQUVGLHVCQUFlLENBQUM7SUFDaEIsR0FBRyxFQUFFO1FBQ0gsT0FBTyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDO0lBRUYsT0FBTyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1FBQ3pCLElBQUksT0FBTyxLQUFLLFNBQVM7WUFBRSxPQUFPO1FBQ2xDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNsQixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMsQ0FBQztBQUNGLGtCQUFlLEVBQUUsQ0FBQyJ9