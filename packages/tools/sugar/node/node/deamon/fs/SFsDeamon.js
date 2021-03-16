"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
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
     * @return      {SPromise}                                   An SPromise instance on which you can subscribe for events like "update", "add" or "unlink"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZzRGVhbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25vZGUvZGVhbW9uL2ZzL1NGc0RlYW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCx1RUFBaUQ7QUFDakQseURBQW1DO0FBQ25DLDBFQUFvRDtBQUVwRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStCRztBQUNILE1BQXFCLFNBQVUsU0FBUSxpQkFBUztJQWE5Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3ZCLEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixFQUFFLEVBQUUsV0FBVztZQUNmLFlBQVksRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUN2QixPQUFPLDBEQUEwRCxTQUFTLENBQUMsT0FBTyxhQUFhLENBQUM7WUFDbEcsQ0FBQztTQUNGLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQW5DSjs7Ozs7Ozs7O1dBU0c7UUFDSCx3QkFBbUIsR0FBRyxFQUFFLENBQUM7UUEyQnZCLGdCQUFnQjtRQUNoQixJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDckIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksRUFBRSxFQUFFO2dCQUNoRCxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDLENBQUMsa0JBQWtCO1FBQ25ELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsS0FBSyxDQUFDLEtBQUssRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUN4QixRQUFRLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELEtBQUssR0FBRyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUN4RCxNQUFNLFlBQVksR0FBRyxJQUFJLDBCQUFrQixFQUFFLENBQUM7UUFDOUMsWUFBWSxDQUFDLEdBQUcsQ0FBQztZQUNmLEtBQUs7U0FDTixDQUFDLENBQUM7UUFDSCxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDN0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzRCxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7Z0JBQUUsT0FBTztZQUN2QixJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztRQUNILGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVDLDZCQUE2QjtRQUM3QixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbkMsQ0FBQztDQUNGO0FBL0VELDRCQStFQyJ9