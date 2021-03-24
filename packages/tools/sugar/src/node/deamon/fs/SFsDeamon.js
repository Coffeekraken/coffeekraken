"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../../shared/object/deepMerge"));
const SDeamon_1 = __importDefault(require("../SDeamon"));
const SFsDeamonProcess_1 = __importDefault(require("./SFsDeamonProcess"));
/**
 * @name            SFsDeamon
 * @namespace       sugar.node.deamon.fs
 * @type            Class
 * @extends         SDeamon
 * @status              wip
 *
 * This class is a wrapper of the SFsDeamonCli and the SFsDeamonProcess to allows you to
 * start quickly some watch processes and kill them with ease
 *
 * @param       {Object}        [settings={}]             Specify some settings to configure your filesystem deamon instance
 * - id (deamon.fs.unnamed) {String}: A unique id for your watch instance
 * - name (Unnamed SFsDeamon) {String}: A name for your watch instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SFsDeamon from '@coffeekraken/sugar/node/deamon/fs/SFsDeamon';
 * const deamon = new SFsDeamon({});
 * deamon.watch('/my/cool/path/*.js').on('update', file => {
 *    // do something
 * });
 * const otherDeamon = deamon.watch('something/*.js');
 * otherDeamon.on('unlink', file => {});
 * otherDeamon.cancel();
 * deamon.cancel(); // kill all the watch processes
 *
 * @since         2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFsDeamon extends SDeamon_1.default {
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
            name: 'Unnamed SFsDeamon',
            id: 'SFsDeamon',
            updateStacks: ['update', 'add', 'unlink'],
            updateLog: (updateObj) => {
                return `<yellow>Update</yellow> detected on the file "<magenta>${updateObj.relPath}</magenta>"`;
            }
        }, settings));
        /**
         * @name          _watchPromisesStack
         * @type          Array<SPromise>
         * @private
         *
         * Store all the running watch processes
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._watchPromisesStack = [];
        // handle cancel
        this.on('cancel', () => {
            this._watchPromisesStack.forEach((watchProcess) => {
                watchProcess.kill();
            });
            this._watchPromisesStack = []; // just to be sure
        });
    }
    /**
     * @name            watch
     * @type            Function
     * @async
     *
     * This method allows you to start a watch process on some files
     * by passing either a simple path, a glob pattern or an Array of these.
     *
     * @param       {String|Array<String>}        input         The file(s) you want to watch by specifying a path, a glob pattern or an Array of these
     * @param       {Object}                  [settings={}]       An object of settings to override the default one passed in the constructor only for this watch process
     * @return      {SPromise}                                   An SPromise instance on which you can subscribe for events like "update", "add" or "unlink"
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    watch(watch, settings = {}) {
        settings = deepMerge_1.default(this._settings, settings);
        watch = typeof watch === 'string' ? watch : watch.watch;
        const watchProcess = new SFsDeamonProcess_1.default();
        watchProcess.run({
            watch
        });
        watchProcess.on('cancel', () => {
            const idx = this._watchPromisesStack.indexOf(watchProcess);
            if (idx === -1)
                return;
            this._watchPromisesStack.splice(idx, 1);
        });
        // save the watch process in the stack for later
        this._watchPromisesStack.push(watchProcess);
        // return the current promise
        return super.watch(watchProcess);
    }
}
exports.default = SFsDeamon;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZzRGVhbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0ZzRGVhbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGlGQUEyRDtBQUMzRCx5REFBbUM7QUFDbkMsMEVBQW9EO0FBRXBEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0JHO0FBQ0gsTUFBcUIsU0FBVSxTQUFRLGlCQUFTO0lBYTlDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDdkIsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxJQUFJLEVBQUUsbUJBQW1CO1lBQ3pCLEVBQUUsRUFBRSxXQUFXO1lBQ2YsWUFBWSxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUM7WUFDekMsU0FBUyxFQUFFLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ3ZCLE9BQU8sMERBQTBELFNBQVMsQ0FBQyxPQUFPLGFBQWEsQ0FBQztZQUNsRyxDQUFDO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBbkNKOzs7Ozs7Ozs7V0FTRztRQUNILHdCQUFtQixHQUFHLEVBQUUsQ0FBQztRQTJCdkIsZ0JBQWdCO1FBQ2hCLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUNyQixJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hELFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUMsQ0FBQyxrQkFBa0I7UUFDbkQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxLQUFLLENBQUMsS0FBSyxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ3hCLFFBQVEsR0FBRyxtQkFBVyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDakQsS0FBSyxHQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3hELE1BQU0sWUFBWSxHQUFHLElBQUksMEJBQWtCLEVBQUUsQ0FBQztRQUM5QyxZQUFZLENBQUMsR0FBRyxDQUFDO1lBQ2YsS0FBSztTQUNOLENBQUMsQ0FBQztRQUNILFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUM3QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzNELElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFBRSxPQUFPO1lBQ3ZCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDNUMsNkJBQTZCO1FBQzdCLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNuQyxDQUFDO0NBQ0Y7QUEvRUQsNEJBK0VDIn0=