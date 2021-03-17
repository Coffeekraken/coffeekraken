"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SProcess_1 = __importDefault(require("../../process/SProcess"));
const chokidar_1 = __importDefault(require("chokidar"));
const deepMerge_1 = __importDefault(require("../../../shared/object/deepMerge"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZzRGVhbW9uUHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNGc0RlYW1vblByb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsc0VBQWdEO0FBQ2hELHdEQUFrQztBQUVsQyxpRkFBMkQ7QUFDM0QsMkRBQXFDO0FBQ3JDLHlFQUFtRDtBQUNuRCx3RkFBa0U7QUFFbEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ0gsTUFBcUIsZ0JBQWlCLFNBQVEsa0JBQVU7SUFLdEQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUN2QixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLEVBQUUsRUFBRSxrQkFBa0I7WUFDdEIsSUFBSSxFQUFFLDJCQUEyQjtTQUNsQyxFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFHSjs7Ozs7Ozs7O1dBU0c7UUFDSCxnQkFBVyxHQUFHLEVBQUUsQ0FBQztJQVpqQixDQUFDO0lBY0Q7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCRztJQUNILE9BQU8sQ0FBQyxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDM0IsUUFBUSxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFckQsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNQLEtBQUssRUFBRSxnQkFBZ0I7WUFDdkIsS0FBSyxFQUFFLGdDQUFnQyxRQUFRLENBQUMsSUFBSSxpQ0FBaUM7U0FDdEYsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFFBQVEsR0FBRyxrQkFBVTthQUN2QixLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssa0JBQ2pCLFVBQVUsRUFBRSxJQUFJLEVBQ2hCLGFBQWEsRUFBRSxJQUFJLEVBQ25CLGNBQWMsRUFBRSxJQUFJLElBQ2pCLFFBQVEsRUFDWDthQUNELEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ1AsS0FBSyxFQUFFLGdCQUFnQjtnQkFDdkIsS0FBSyxFQUFFLHlCQUF5QixRQUFRLENBQUMsSUFBSSwyQ0FBMkM7YUFDekYsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDO2FBQ0QsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3pCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsSUFBSTtnQkFBRSxPQUFPO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUNQLEtBQUssRUFBRSxlQUFlO2dCQUN0QixLQUFLLEVBQUUsMEJBQTBCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUNoRCxxQkFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQzlCLEVBQUUsQ0FDSCxvQkFBb0IsSUFBSSxDQUFDLElBQUksV0FBVzthQUMxQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUM7YUFDRCxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDdEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxJQUFJO2dCQUFFLE9BQU87WUFDbEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ1AsS0FBSyxFQUFFLGFBQWE7Z0JBQ3BCLEtBQUssRUFBRSx1QkFBdUIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQzdDLHFCQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFDOUIsRUFBRSxDQUNILG1CQUFtQixJQUFJLENBQUMsSUFBSSxXQUFXO2FBQ3pDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQzthQUNELEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN6QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFbEMsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFDUCxLQUFLLEVBQUUsZUFBZTtnQkFDdEIsS0FBSyxFQUFFLHVCQUF1QixRQUFRLENBQUMsT0FBTyxDQUM1QyxxQkFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsRUFDN0IsRUFBRSxDQUNILFNBQVM7YUFDWCxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDbEIsSUFBSSxFQUFFLFFBQVE7YUFDZixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSSxJQUFJLENBQUMsUUFBUTtZQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDekMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELHdCQUF3QixDQUFDLFFBQVE7UUFDL0IsSUFBSSxJQUFJLENBQUM7UUFDVCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDOUIsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2Y7YUFBTTtZQUNMLElBQUksR0FBRyxlQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ25DO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOztBQTFJSCxtQ0EySUM7QUExSVEsMkJBQVUsR0FBRztJQUNsQixJQUFJLEVBQUUsNEJBQW9CO0NBQzNCLENBQUMifQ==