"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SProcess_1 = __importDefault(require("../../process/SProcess"));
const chokidar_1 = __importDefault(require("chokidar"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SFsFile_1 = __importDefault(require("../../fs/SFsFile"));
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
const SFsDeamonInterface_1 = __importDefault(require("./interface/SFsDeamonInterface"));
/**
 * @name                SFsDeamonProcess
 * @namespace           sugar.node.deamon.fs
 * @type                Class
 * @extends             SProcess
 *
 * This class allows you to simply launch some watch processes in order to be notified when some files are
 * updated, deleted or created on the filesystem.
 *
 * @example           js
 * import SFsDeamonProcess from '@coffeekraken/sugar/node/deamon/fs/SFsDeamonProcess';
 * const deamon = new SFsDeamonProcess();
 * demon.on('update', up => {
 *    // do somethong on update
 * });
 * deamon.watch('./my/cool/files/*.js');
 * deamon.watch('./my/other/cool/files/*.js', {
 *    id: 'other'
 * }).on('update', up => {
 *    // do something
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFsDeamonProcess extends SProcess_1.default {
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        super(deepMerge_1.default({
            id: 'SFsDeamonProcess',
            name: 'Filesystem Deamon Process'
        }, settings));
        /**
         * @name            _filesCache
         * @type            Object
         * @private
         *
         * Store the already fetched files instances
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._filesCache = {};
    }
    /**
     * @name              process
     * @type              Function
     * @async
     *
     * This method start the watching process and returns you an SPromise instance on which you can subscribe
     * for these events:
     * - update: Triggered when a file has been updated
     * - delete: Triggered when a file has been deleted
     * - add: Triggered when a file has been added
     * The parameter passed along these events are an ```SFileInterface``` compatible object
     *
     * @param         {String|Array<String>}          input           The input glob pattern(s) to specify what to watch
     * @param         {Object}                      [settings={}]     A settings object to override the one passed in the constructor if wanted
     * @return        {SPromise}                                      An SPromise instance to subscribe to some events described above
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    process(params, settings = {}) {
        settings = deepMerge_1.default(this._settings, {}, settings);
        this.log({
            group: 'Initialization',
            value: `#start Starting the "<yellow>${settings.name}</yellow>" filesystem deamon...`
        });
        this._watcher = chokidar_1.default
            .watch(params.watch, {
            persistent: true,
            ignoreInitial: true,
            followSymlinks: true,
            ...settings
        })
            .on('ready', () => {
            this.log({
                group: 'Initialization',
                value: `#success The "<yellow>${settings.name}</yellow>" deamon is <green>ready</green>`
            });
        })
            .on('change', (filepath) => {
            const file = this._getFileInstanceFromPath(filepath);
            if (!file)
                return;
            delete file._settings;
            this.log({
                group: 'Updated files',
                value: `File updated: "<yellow>${file.path.replace(packageRoot_1.default(file.path) + '/', '')}</yellow>" <cyan>${file.size}</cyan>mb`
            });
            this.trigger('update', file.toObject());
        })
            .on('add', (filepath) => {
            const file = this._getFileInstanceFromPath(filepath);
            if (!file)
                return;
            delete file._settings;
            this.log({
                group: 'Added files',
                value: `File added: "<green>${file.path.replace(packageRoot_1.default(file.path) + '/', '')}</green>" <cyan>${file.size}</cyan>mb`
            });
            this.trigger('add', file.toObject());
        })
            .on('unlink', (filepath) => {
            delete this._filesCache[filepath];
            this.log({
                group: 'Deleted files',
                value: `File deleted: "<red>${filepath.replace(packageRoot_1.default(filepath) + '/', '')}</red>"`
            });
            this.trigger('unlink', {
                path: filepath
            });
        });
    }
    kill() {
        if (this._watcher)
            this._watcher.close();
        super.kill();
    }
    _getFileInstanceFromPath(filepath) {
        let file;
        if (this._filesCache[filepath]) {
            file = this._filesCache[filepath];
            file.update();
        }
        else {
            file = new SFsFile_1.default(filepath);
            this._filesCache[filepath] = file;
        }
        return file;
    }
}
exports.default = SFsDeamonProcess;
SFsDeamonProcess.interface = SFsDeamonInterface_1.default;
