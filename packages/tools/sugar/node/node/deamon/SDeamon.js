"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const onProcessExit_1 = __importDefault(require("../process/onProcessExit"));
/**
 * @name                SDeamon
 * @namespace           sugar.node.deamon
 * @type                Class
 * @extends             SPromise
 * @implments           SDeamonInterface
 * @status              wip
 *
 * This class is the base one for all the "Deamons" classes like SFsDeamon, etc...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @event       state       emited when the state change
 *
 * @ince          2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SDeamon extends s_promise_1.default {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        super(deepMerge_1.default({
            id: 'SDeamon',
            updateStacks: [],
            processParams: null,
            updateLog: null
        }, settings));
        /**
         * @name        state
         * @type        String
         * @values      idle, watching, error
         * @default     idle
         *
         * Store the watching process state
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.state = 'idle';
        /**
         * @name        logs
         * @type        Object
         *
         * Store the different logs messages like:
         * - watching: Displayed when the deamon pass in watching mode
         * - paused: Displayed when the deamon pass in pause mode
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.logs = {
            watching: `The "<yellow>${this.constructor.name}</yellow>" deamon has been <green>started</green> and <green>watch for changes</green>...`,
            paused: `The "<yellow>${this.constructor.name}</yellow>" deamon has been <cyan>paused</cyan>`
        };
    }
    /**
     * @name          on
     * @type          Function
     *
     * Override the ```on``` SPromise method to allow the use of the "update" shortcut.
     * When using the "update" shortcut, the registered events will actually be the one
     * specified in the ```settings.updateStacks```.
     *
     * @param           {String|Array}      stacks        The stacks in which you want register your callback. Either an Array like ['then','finally'], or a String like "then,finally"
     * @param           {Function}        callback        The callback function to register
     * @return          {SPromise}                  The SPromise instance to maintain chainability
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    on(stacks, callback) {
        if (typeof stacks === 'string')
            stacks = stacks.split(',').map((l) => l.trim());
        if (stacks.indexOf('update') !== -1) {
            stacks.splice(stacks.indexOf('update'), 1);
            stacks = [...stacks, ...this._settings.updateStacks];
        }
        return super.on(stacks.join(','), callback);
    }
    /**
     * @name          getUpdateLog
     * @type          Function
     *
     * This function is used to generate the update log string
     * depending on the updated file, data, etc...
     *
     * @param         {Object}     updateObj           The update object given by the proper deamon type
     * @return        {String}                          The generated update string
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    updateLog(updateObj) {
        if (this._settings.updateLog &&
            typeof this._settings.updateLog === 'function') {
            return this._settings.updateLog(updateObj);
        }
        return null;
    }
    /**
     * @name          processParams
     * @type          Function
     *
     * This method can be called to process the passed params object
     * using the function setted in the settings.processParams
     *
     * @param       {Object}        params      The params object to process
     * @param       {Object}        data        The update data object
     * @return      {Object}                    The processed params
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    processParams(params, data) {
        params = Object.assign({}, params);
        if (this._settings.processParams &&
            typeof this._settings.processParams === 'function') {
            params = this._settings.processParams(params, data);
        }
        return params;
    }
    /**
     * @name          watch
     * @type          Function
     *
     * This method take the extended watch method promise as parameter
     * to listen on it automatically for events like "close", etc...
     * It also pipe the events from the promise on the instance directly
     * to you can listen for event directly on the class instance itself
     *
     * @param       {SPromise}          watchPromise        The watch promise instance
     * @return      {SPromise}                              The watch promise instance passed
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    watch(watchPromise) {
        s_promise_1.default.pipe(watchPromise, this);
        // update state
        this.state = 'watching';
        this.emit('state', this.state);
        // listen for the end of the watching process
        watchPromise
            .on('finally', () => {
            this.state = 'idle';
            this.emit('state', this.state);
        })
            .on('error', () => {
            this.state = 'error';
            this.emit('state', this.state);
        });
        onProcessExit_1.default(() => {
            watchPromise.cancel();
        });
        return watchPromise;
    }
}
exports.default = SDeamon;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RlYW1vbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL2RlYW1vbi9TRGVhbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQUVqRCxvRUFBOEM7QUFDOUMsNkVBQXVEO0FBRXZEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLE9BQVEsU0FBUSxtQkFBVTtJQThCOUI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUN2QixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLEVBQUUsRUFBRSxTQUFTO1lBQ2IsWUFBWSxFQUFFLEVBQUU7WUFDaEIsYUFBYSxFQUFFLElBQUk7WUFDbkIsU0FBUyxFQUFFLElBQUk7U0FDaEIsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBbERKOzs7Ozs7Ozs7O1dBVUc7UUFDSCxVQUFLLEdBQUcsTUFBTSxDQUFDO1FBRWY7Ozs7Ozs7Ozs7V0FVRztRQUNILFNBQUksR0FBRztZQUNMLFFBQVEsRUFBRSxnQkFBZ0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLDJGQUEyRjtZQUMxSSxNQUFNLEVBQUUsZ0JBQWdCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxnREFBZ0Q7U0FDOUYsQ0FBQztJQXdCRixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVE7UUFDakIsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRO1lBQzVCLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDbEQsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ25DLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMzQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDdEQ7UUFFRCxPQUFPLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsU0FBUyxDQUFDLFNBQVM7UUFDakIsSUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVM7WUFDeEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsS0FBSyxVQUFVLEVBQzlDO1lBQ0EsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUk7UUFDeEIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLElBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhO1lBQzVCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEtBQUssVUFBVSxFQUNsRDtZQUNBLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDckQ7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxLQUFLLENBQUMsWUFBWTtRQUNoQixtQkFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFcEMsZUFBZTtRQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUvQiw2Q0FBNkM7UUFDN0MsWUFBWTthQUNULEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUM7YUFDRCxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztZQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7UUFFTCx1QkFBZSxDQUFDLEdBQUcsRUFBRTtZQUNuQixZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxPQUFPLENBQUMifQ==