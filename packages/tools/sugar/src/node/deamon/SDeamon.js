"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SPromise_1 = __importDefault(require("../promise/SPromise"));
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
class SDeamon extends SPromise_1.default {
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
        SPromise_1.default.pipe(watchPromise, this);
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
module.exports = SDeamon;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RlYW1vbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNEZWFtb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7QUFFZCxtRUFBNkM7QUFFN0Msb0VBQThDO0FBQzlDLDZFQUF1RDtBQUV2RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxPQUFRLFNBQVEsa0JBQVU7SUE4QjlCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDdkIsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxFQUFFLEVBQUUsU0FBUztZQUNiLFlBQVksRUFBRSxFQUFFO1lBQ2hCLGFBQWEsRUFBRSxJQUFJO1lBQ25CLFNBQVMsRUFBRSxJQUFJO1NBQ2hCLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQWxESjs7Ozs7Ozs7OztXQVVHO1FBQ0gsVUFBSyxHQUFHLE1BQU0sQ0FBQztRQUVmOzs7Ozs7Ozs7O1dBVUc7UUFDSCxTQUFJLEdBQUc7WUFDTCxRQUFRLEVBQUUsZ0JBQWdCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSwyRkFBMkY7WUFDMUksTUFBTSxFQUFFLGdCQUFnQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksZ0RBQWdEO1NBQzlGLENBQUM7SUF3QkYsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRO1FBQ2pCLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUTtZQUM1QixNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNuQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0MsTUFBTSxHQUFHLENBQUMsR0FBRyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3REO1FBRUQsT0FBTyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILFNBQVMsQ0FBQyxTQUFTO1FBQ2pCLElBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTO1lBQ3hCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEtBQUssVUFBVSxFQUM5QztZQUNBLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDNUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsYUFBYSxDQUFDLE1BQU0sRUFBRSxJQUFJO1FBQ3hCLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNuQyxJQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYTtZQUM1QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxLQUFLLFVBQVUsRUFDbEQ7WUFDQSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3JEO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsS0FBSyxDQUFDLFlBQVk7UUFDaEIsa0JBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXBDLGVBQWU7UUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFL0IsNkNBQTZDO1FBQzdDLFlBQVk7YUFDVCxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztZQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDO2FBQ0QsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBRUwsdUJBQWUsQ0FBQyxHQUFHLEVBQUU7WUFDbkIsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztDQUNGO0FBRUQsaUJBQVMsT0FBTyxDQUFDIn0=