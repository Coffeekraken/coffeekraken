// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../object/deepMerge", "minimatch", "is-glob"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const deepMerge_1 = __importDefault(require("../object/deepMerge"));
    const minimatch_1 = __importDefault(require("minimatch"));
    const is_glob_1 = __importDefault(require("is-glob"));
    /**
     * @name                    activeSpace
     * @namespace           sugar.js.core
     * @type                    Object
     * @status              wip
     *
     * This object expose some functions that are usefull to manage the "active" space of your application.
     * An active space is represented by a string formated like so "something.cool.hello". This mean that your app is
     * in the "something.cool.hello" space and depending on that, you can enable or disable some features like for example
     * keypress that have to be active only in certain "space" of your application.
     * The exposed functions are these ones:
     * - set: This allows you to set the active space
     * - get: This allows you to get the current active space
     * - is: This allows you to check if the passed active space string is in the current active space
     * - previous: This allows you to go back 1 activeSpace in the stack
     * - on: This allows you to register callbacks attached to an activeSpace
     * - append: This allows you to append an activeSpace string to the current one
     *
     * @todo        interface
     * @todo        doc
     * @todo        rethink scope and potential utility of this
     *
     * @example           js
     * import activeSpace from '@coffeekraken/sugar/core/activeSpace';
     * activeSpace.set('hello.world');
     * activeSpace.get(); // => hello.world
     * activeSpace.is('hello'); // => false
     * activeSpace.is('hello.world.coco'); // => false
     * activeSpace.is('hello.**'); // => true
     *
     * @since       2.0.0
     * @see       https://www.npmjs.com/package/minimatch
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    const _activeSpaceCallbacksStack = {};
    const _activeSpaceStack = [];
    let _activeSpaceCurrent = null;
    const activeSpaceApi = {
        /**
         * @name                get
         * @type                Function
         *
         * This function allows you to get the current active space
         *
         * @return      {String}                  The current active space
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        get: () => {
            return _activeSpaceCurrent;
        },
        /**
         * @name                set
         * @type                Function
         *
         * This function allows you to set the current active space
         *
         * @param       {String}      activeSpace       The active space to set
         * @param       {Boolean}       [history=true]    Specify if you want that this action make en new entry in history or not
         * @param       {Boolean}     [silent=false]    Specify if you want to have errors throwed or not
         * @return      {String}                  The current active space
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        set: (activeSpace, history = true, silent = false) => {
            if (!silent && is_glob_1.default(activeSpace)) {
                throw new Error(`You try to set as activeSpace this string "${activeSpace}". It seems that this string is a glob pattern and activeSpace does not have to be a glob pattern...`);
            }
            // check if the passed activeSpace is the same as the last one
            if (_activeSpaceCurrent !== activeSpace && history) {
                _activeSpaceStack.push(activeSpace);
            }
            // set the active space
            _activeSpaceCurrent = activeSpace;
            // call the callbacks
            activeSpaceApi._callCallbacks();
            return activeSpaceApi.get();
        },
        /**
         * @name              append
         * @type              Function
         *
         * This function take the current activeSpace string and add the passed one to set the new activeSpace string
         *
         * @param       {String}      activeSpace         The activeSpace to append
         * @param       {Boolean}       [history=true]    Specify if you want that this action make en new entry in history or not
         * @return      {String}                          Return the current active space
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        append: (activeSpace, history = true) => {
            // get the current one
            const currentActiveSpace = activeSpaceApi.get() || '';
            if (currentActiveSpace !== '' &&
                minimatch_1.default(currentActiveSpace, `**.${activeSpace}`))
                return activeSpaceApi.get();
            const currentActiveSpaceArray = currentActiveSpace.split('.');
            const activeSpaceArray = activeSpace.split('.');
            activeSpaceApi.set([...currentActiveSpaceArray, ...activeSpaceArray].join('.'), history);
            return activeSpaceApi.get();
        },
        /**
         * @name                remove
         * @type                Function
         *
         * This function simply remove the passed string from the activeSpace stack
         *
         * @param       {String}        toRemove          The string to remove
         * @param       {Boolean}       [history=true]    Specify if you want that this action make en new entry in history or not
         * @return      {String}                          Return the current active space
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        remove: (toRemove, history = true) => {
            // get the current
            const currentActiveSpace = activeSpaceApi.get();
            // generate new active space
            let newActiveSpace = currentActiveSpace.replace(toRemove, '');
            // clean the new active space
            if (newActiveSpace.substr(-1) === '.')
                newActiveSpace = newActiveSpace.slice(0, -1);
            if (newActiveSpace.substr(0, 1) === '.')
                newActiveSpace = newActiveSpace.substr(1);
            // check if we need to append in the history
            activeSpaceApi.set(newActiveSpace, history);
            // return the current active space
            return activeSpaceApi.get();
        },
        /**
         * @name                previous
         * @type                Function
         *
         * This function simply go back by 1 in the activeSpace stack
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         * @return      {String}                          Return the current active space
         */
        previous: () => {
            if (_activeSpaceStack.length <= 1)
                return;
            _activeSpaceStack.splice(-1, 1);
            activeSpaceApi.set(_activeSpaceStack[_activeSpaceStack.length - 1], false);
            return activeSpaceApi.get();
        },
        /**
         * @name                is
         * @type                Function
         *
         * This function allows you to check if the active space string that you pass match with the current active space or not.
         * The checking process is done using the "minimatch" package that let you use cool features like "*", "**", etc...
         *
         * @param       {String}        activeSpaceToCheck          The active space string that you want to check
         * @param       {String}        [currentActiveSpace=activeSpaceApi.get()]       The current active space to check against the passed one
         * @return      {Boolean}                                   true if the passed active space string match the current one, false if not
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        is: (activeSpaceToCheck, currentActiveSpace = activeSpaceApi.get()) => {
            if (!currentActiveSpace)
                return false;
            return minimatch_1.default(currentActiveSpace, activeSpaceToCheck);
        },
        /**
         * @name            on
         * @type            Function
         *
         * This function allows you to register a callback linked with an activeSpace string
         * that will be called once the activeSpace is matched
         *
         * @param         {String}        activeSpaceToCheck        The active space to check
         * @param         {Function}      callback                  The callback function to call when the activeSpace is matched
         * @param         {Object}        [settings={}]             A settings object to configure your activeSpace callback behavior:
         * - once (false) {Boolean}: Specify if you want the callback to be called only once. This will just set the "count" setting to 1
         * - count (-1) {Number}: Specify how many times you want the callback to be called. -1 mean unlimited.
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        on: (activeSpaceToCheck, callback, settings = {}) => {
            settings = deepMerge_1.default({
                once: false,
                count: -1
            }, settings);
            // check if this activeSpace is already eixisting
            if (!_activeSpaceCallbacksStack[activeSpaceToCheck])
                _activeSpaceCallbacksStack[activeSpaceToCheck] = [];
            // check if the once setting is true
            if (settings.once)
                settings.count = 1;
            // add the callback object to the stack
            _activeSpaceCallbacksStack[activeSpaceToCheck].push({
                activeSpaceToCheck,
                callback,
                settings,
                called: 0
            });
        },
        /**
         * @name          _callCallbacks
         * @type          Function
         * @private
         *
         * Call the callbacks when an activeSpace has been setted
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        _callCallbacks: () => {
            // call the registered callbacks that match this activeSpace
            Object.keys(_activeSpaceCallbacksStack).forEach((activeSpaceToCheck) => {
                // check if the active space match or not
                if (!activeSpaceApi.is(activeSpaceToCheck))
                    return;
                // loop on every callbacks registered
                _activeSpaceCallbacksStack[activeSpaceToCheck].forEach((activeSpaceCallbackObj) => {
                    // call the callback
                    activeSpaceCallbackObj.callback();
                    // increase the called property
                    activeSpaceCallbackObj.called++;
                    // check if we have reached call count
                    if (activeSpaceCallbackObj.settings.count === -1)
                        return;
                    if (activeSpaceCallbackObj.called >=
                        activeSpaceCallbackObj.settings.count) {
                        activeSpaceCallbackObj.delete = true;
                    }
                    // filter activeSpaceCallbackObj to remove the "delete" once
                    _activeSpaceCallbacksStack[activeSpaceToCheck] = _activeSpaceCallbacksStack[activeSpaceToCheck].filter((obj) => {
                        return obj.delete !== true;
                    });
                });
            });
        }
    };
    exports.default = activeSpaceApi;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlU3BhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhY3RpdmVTcGFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxvRUFBOEM7SUFDOUMsMERBQW9DO0lBQ3BDLHNEQUErQjtJQUUvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUNHO0lBQ0gsTUFBTSwwQkFBMEIsR0FBRyxFQUFFLENBQUM7SUFDdEMsTUFBTSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFDN0IsSUFBSSxtQkFBbUIsR0FBRyxJQUFJLENBQUM7SUFDL0IsTUFBTSxjQUFjLEdBQUc7UUFDckI7Ozs7Ozs7Ozs7V0FVRztRQUNILEdBQUcsRUFBRSxHQUFHLEVBQUU7WUFDUixPQUFPLG1CQUFtQixDQUFDO1FBQzdCLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0gsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLE9BQU8sR0FBRyxJQUFJLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBRSxFQUFFO1lBQ25ELElBQUksQ0FBQyxNQUFNLElBQUksaUJBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDcEMsTUFBTSxJQUFJLEtBQUssQ0FDYiw4Q0FBOEMsV0FBVyxzR0FBc0csQ0FDaEssQ0FBQzthQUNIO1lBRUQsOERBQThEO1lBQzlELElBQUksbUJBQW1CLEtBQUssV0FBVyxJQUFJLE9BQU8sRUFBRTtnQkFDbEQsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3JDO1lBRUQsdUJBQXVCO1lBQ3ZCLG1CQUFtQixHQUFHLFdBQVcsQ0FBQztZQUVsQyxxQkFBcUI7WUFDckIsY0FBYyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBRWhDLE9BQU8sY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzlCLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7O1dBWUc7UUFDSCxNQUFNLEVBQUUsQ0FBQyxXQUFX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