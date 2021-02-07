"use strict";
// @ts-nocheck
// @to-work
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
module.exports = fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3YXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFdBQVc7Ozs7QUFJWCx3REFBa0M7QUFDbEMsbUVBQTZDO0FBQzdDLG9EQUE4QjtBQUM5Qiw2RUFBdUQ7QUFHdkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxNQUFNLEVBQUUsR0FBVyxTQUFTLEtBQUssQ0FDL0IsS0FBd0IsRUFDeEIsV0FBMkIsRUFBRTtJQUU3QixRQUFRLG1CQUNOLEtBQUssRUFBRSxJQUFJLEVBQ1gsYUFBYSxFQUFFLElBQUksRUFDbkIsT0FBTyxFQUFFLENBQUMsc0JBQXNCLEVBQUUsY0FBYyxDQUFDLElBQzlDLFFBQVEsQ0FDWixDQUFDO0lBRUYsSUFBSSxPQUFPLENBQUM7SUFFWixNQUFNLE9BQU8sR0FBRyxJQUFJLGtCQUFVLENBQzVCLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDNUIsT0FBTyxHQUFHLGtCQUFVO1lBQ2xCLGFBQWE7YUFDWixLQUFLLENBQUMsS0FBSyxvQkFDUCxRQUFRLEVBQ1g7YUFDRCxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDbEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUN4QyxHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUcsSUFBSSxJQUFJO2FBQzFCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDO2FBQ0QsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3JCLE1BQU0sSUFBSSxHQUFHLElBQUksZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDeEMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxHQUFHLElBQUksSUFBSTthQUMxQixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQzthQUNELEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNyQixNQUFNLElBQUksR0FBRyxJQUFJLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQ3hDLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRyxJQUFJLElBQUk7Z0JBQ3pCLGNBQWMsRUFBRSxLQUFLO2FBQ3RCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDO2FBQ0QsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDO2FBQ0QsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDO2FBQ0QsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDO2FBQ0QsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQzthQUNELEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSztnQkFDTCxJQUFJO2dCQUNKLE9BQU87YUFDUixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsRUFDRDtRQUNFLEVBQUUsRUFBRSxnQkFBZ0I7S0FDckIsQ0FDRixDQUFDO0lBRUYsdUJBQWUsQ0FBQztJQUNoQixHQUFHLEVBQUU7UUFDSCxPQUFPLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUM7SUFFRixPQUFPLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7UUFDekIsSUFBSSxPQUFPLEtBQUssU0FBUztZQUFFLE9BQU87UUFDbEMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2xCLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQyxDQUFDO0FBQ0YsaUJBQVMsRUFBRSxDQUFDIn0=