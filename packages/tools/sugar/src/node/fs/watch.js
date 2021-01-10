"use strict";
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
 * @beta
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
    const promise = new SPromise_1.default((resolve, reject, trigger) => {
        watcher = chokidar_1.default
            // @ts-ignore
            .watch(paths, Object.assign({}, settings))
            .on('add', (path) => {
            const file = new SFile_1.default(path.toString(), {
                cwd: settings.cwd || null
            });
            trigger('add', file);
        })
            .on('change', (path) => {
            const file = new SFile_1.default(path.toString(), {
                cwd: settings.cwd || null
            });
            trigger('change', file);
        })
            .on('unlink', (path) => {
            const file = new SFile_1.default(path.toString(), {
                cwd: settings.cwd || null,
                checkExistence: false
            });
            trigger('unlink', file);
        })
            .on('addDir', (path) => {
            trigger('addDir', path);
        })
            .on('unlinkDir', (path) => {
            trigger('unlinkDir', path);
        })
            .on('error', (error) => {
            trigger('error', error);
        })
            .on('ready', () => {
            trigger('ready');
        })
            .on('raw', (event, path, details) => {
            trigger('raw', {
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
//# sourceMappingURL=watch.js.map