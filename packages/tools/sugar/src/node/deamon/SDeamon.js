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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RlYW1vbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNEZWFtb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsd0VBQWlEO0FBRWpELG9FQUE4QztBQUM5Qyw2RUFBdUQ7QUFFdkQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sT0FBUSxTQUFRLG1CQUFVO0lBOEI5Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3ZCLEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsRUFBRSxFQUFFLFNBQVM7WUFDYixZQUFZLEVBQUUsRUFBRTtZQUNoQixhQUFhLEVBQUUsSUFBSTtZQUNuQixTQUFTLEVBQUUsSUFBSTtTQUNoQixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFsREo7Ozs7Ozs7Ozs7V0FVRztRQUNILFVBQUssR0FBRyxNQUFNLENBQUM7UUFFZjs7Ozs7Ozs7OztXQVVHO1FBQ0gsU0FBSSxHQUFHO1lBQ0wsUUFBUSxFQUFFLGdCQUFnQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksMkZBQTJGO1lBQzFJLE1BQU0sRUFBRSxnQkFBZ0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLGdEQUFnRDtTQUM5RixDQUFDO0lBd0JGLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILEVBQUUsQ0FBQyxNQUFNLEVBQUUsUUFBUTtRQUNqQixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7WUFDNUIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNsRCxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDbkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sR0FBRyxDQUFDLEdBQUcsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN0RDtRQUVELE9BQU8sS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxTQUFTLENBQUMsU0FBUztRQUNqQixJQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUztZQUN4QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxLQUFLLFVBQVUsRUFDOUM7WUFDQSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSTtRQUN4QixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkMsSUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWE7WUFDNUIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsS0FBSyxVQUFVLEVBQ2xEO1lBQ0EsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNyRDtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILEtBQUssQ0FBQyxZQUFZO1FBQ2hCLG1CQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVwQyxlQUFlO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRS9CLDZDQUE2QztRQUM3QyxZQUFZO2FBQ1QsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7WUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQzthQUNELEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztRQUVMLHVCQUFlLENBQUMsR0FBRyxFQUFFO1lBQ25CLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7Q0FDRjtBQUVELGtCQUFlLE9BQU8sQ0FBQyJ9