"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SProcess_1 = __importDefault(require("../../process/SProcess"));
const chokidar_1 = __importDefault(require("chokidar"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SFile_1 = __importDefault(require("../../fs/SFile"));
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
const SFsDeamonInterface_1 = __importDefault(require("./interface/SFsDeamonInterface"));
/**
 * @name                SFsDeamonProcess
 * @namespace           sugar.node.deamon.fs
 * @type                Class
 * @extends             SProcess
 * @status              wip
 *
 * This class allows you to simply launch some watch processes in order to be notified when some files are
 * updated, deleted or created on the filesystem.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
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
     * - update: emited when a file has been updated
     * - delete: emited when a file has been deleted
     * - add: emited when a file has been added
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
            .watch(params.watch, Object.assign({ persistent: true, ignoreInitial: true, followSymlinks: true }, settings))
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
            this.emit('update', file.toObject());
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
            this.emit('add', file.toObject());
        })
            .on('unlink', (filepath) => {
            delete this._filesCache[filepath];
            this.log({
                group: 'Deleted files',
                value: `File deleted: "<red>${filepath.replace(packageRoot_1.default(filepath) + '/', '')}</red>"`
            });
            this.emit('unlink', {
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
            file = SFile_1.default.instanciate(filepath);
            this._filesCache[filepath] = file;
        }
        return file;
    }
}
exports.default = SFsDeamonProcess;
SFsDeamonProcess.interfaces = {
    this: SFsDeamonInterface_1.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZzRGVhbW9uUHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ub2RlL2RlYW1vbi9mcy9TRnNEZWFtb25Qcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHNFQUFnRDtBQUNoRCx3REFBa0M7QUFFbEMsdUVBQWlEO0FBQ2pELDJEQUFxQztBQUNyQyx5RUFBbUQ7QUFDbkQsd0ZBQWtFO0FBRWxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUNILE1BQXFCLGdCQUFpQixTQUFRLGtCQUFVO0lBS3REOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDdkIsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxFQUFFLEVBQUUsa0JBQWtCO1lBQ3RCLElBQUksRUFBRSwyQkFBMkI7U0FDbEMsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBR0o7Ozs7Ozs7OztXQVNHO1FBQ0gsZ0JBQVcsR0FBRyxFQUFFLENBQUM7SUFaakIsQ0FBQztJQWNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQkc7SUFDSCxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQzNCLFFBQVEsR0FBRyxtQkFBVyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXJELElBQUksQ0FBQyxHQUFHLENBQUM7WUFDUCxLQUFLLEVBQUUsZ0JBQWdCO1lBQ3ZCLEtBQUssRUFBRSxnQ0FBZ0MsUUFBUSxDQUFDLElBQUksaUNBQWlDO1NBQ3RGLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxRQUFRLEdBQUcsa0JBQVU7YUFDdkIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLGtCQUNqQixVQUFVLEVBQUUsSUFBSSxFQUNoQixhQUFhLEVBQUUsSUFBSSxFQUNuQixjQUFjLEVBQUUsSUFBSSxJQUNqQixRQUFRLEVBQ1g7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