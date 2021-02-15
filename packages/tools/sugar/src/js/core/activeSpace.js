// @ts-nocheck
// @shared
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
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
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var minimatch_1 = __importDefault(require("minimatch"));
    var is_glob_1 = __importDefault(require("is-glob"));
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
    var _activeSpaceCallbacksStack = {};
    var _activeSpaceStack = [];
    var _activeSpaceCurrent = null;
    var activeSpaceApi = {
        /**
         * @name                get
         * @type                Function
         *
         * This function allows you to get the current active space
         *
         * @return      {String}                  The current active space
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        get: function () {
            return _activeSpaceCurrent;
        },
        /**
         * @name                set
         * @type                Function
         *
         * This function allows you to set the current active space
         *
         * @param       {String}      activeSpace       The active space to set
         * @param       {Boolean}       [history=true]    Specify if you want that this action make en new entry in history or not
         * @param       {Boolean}     [silent=false]    Specify if you want to have errors throwed or not
         * @return      {String}                  The current active space
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        set: function (activeSpace, history, silent) {
            if (history === void 0) { history = true; }
            if (silent === void 0) { silent = false; }
            if (!silent && is_glob_1.default(activeSpace)) {
                throw new Error("You try to set as activeSpace this string \"" + activeSpace + "\". It seems that this string is a glob pattern and activeSpace does not have to be a glob pattern...");
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
         * @param       {String}      activeSpace         The activeSpace to append
         * @param       {Boolean}       [history=true]    Specify if you want that this action make en new entry in history or not
         * @return      {String}                          Return the current active space
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        append: function (activeSpace, history) {
            if (history === void 0) { history = true; }
            // get the current one
            var currentActiveSpace = activeSpaceApi.get() || '';
            if (currentActiveSpace !== '' &&
                minimatch_1.default(currentActiveSpace, "**." + activeSpace))
                return activeSpaceApi.get();
            var currentActiveSpaceArray = currentActiveSpace.split('.');
            var activeSpaceArray = activeSpace.split('.');
            activeSpaceApi.set(__spreadArrays(currentActiveSpaceArray, activeSpaceArray).join('.'), history);
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
         * @return      {String}                          Return the current active space
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        remove: function (toRemove, history) {
            if (history === void 0) { history = true; }
            // get the current
            var currentActiveSpace = activeSpaceApi.get();
            // generate new active space
            var newActiveSpace = currentActiveSpace.replace(toRemove, '');
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
         * @return      {String}                          Return the current active space
         */
        previous: function () {
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
         * @param       {String}        activeSpaceToCheck          The active space string that you want to check
         * @param       {String}        [currentActiveSpace=activeSpaceApi.get()]       The current active space to check against the passed one
         * @return      {Boolean}                                   true if the passed active space string match the current one, false if not
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        is: function (activeSpaceToCheck, currentActiveSpace) {
            if (currentActiveSpace === void 0) { currentActiveSpace = activeSpaceApi.get(); }
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
         * @param         {String}        activeSpaceToCheck        The active space to check
         * @param         {Function}      callback                  The callback function to call when the activeSpace is matched
         * @param         {Object}        [settings={}]             A settings object to configure your activeSpace callback behavior:
         * - once (false) {Boolean}: Specify if you want the callback to be called only once. This will just set the "count" setting to 1
         * - count (-1) {Number}: Specify how many times you want the callback to be called. -1 mean unlimited.
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        on: function (activeSpaceToCheck, callback, settings) {
            if (settings === void 0) { settings = {}; }
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
                activeSpaceToCheck: activeSpaceToCheck,
                callback: callback,
                settings: settings,
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
        _callCallbacks: function () {
            // call the registered callbacks that match this activeSpace
            Object.keys(_activeSpaceCallbacksStack).forEach(function (activeSpaceToCheck) {
                // check if the active space match or not
                if (!activeSpaceApi.is(activeSpaceToCheck))
                    return;
                // loop on every callbacks registered
                _activeSpaceCallbacksStack[activeSpaceToCheck].forEach(function (activeSpaceCallbackObj) {
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
                    _activeSpaceCallbacksStack[activeSpaceToCheck] = _activeSpaceCallbacksStack[activeSpaceToCheck].filter(function (obj) {
                        return obj.delete !== true;
                    });
                });
            });
        }
    };
    exports.default = activeSpaceApi;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlU3BhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhY3RpdmVTcGFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVWLGtFQUE4QztJQUM5Qyx3REFBb0M7SUFDcEMsb0RBQStCO0lBRS9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQ0c7SUFDSCxJQUFNLDBCQUEwQixHQUFHLEVBQUUsQ0FBQztJQUN0QyxJQUFNLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztJQUM3QixJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQztJQUMvQixJQUFNLGNBQWMsR0FBRztRQUNyQjs7Ozs7Ozs7OztXQVVHO1FBQ0gsR0FBRyxFQUFFO1lBQ0gsT0FBTyxtQkFBbUIsQ0FBQztRQUM3QixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNILEdBQUcsRUFBRSxVQUFDLFdBQVcsRUFBRSxPQUFjLEVBQUUsTUFBYztZQUE5Qix3QkFBQSxFQUFBLGNBQWM7WUFBRSx1QkFBQSxFQUFBLGNBQWM7WUFDL0MsSUFBSSxDQUFDLE1BQU0sSUFBSSxpQkFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUNwQyxNQUFNLElBQUksS0FBSyxDQUNiLGlEQUE4QyxXQUFXLDBHQUFzRyxDQUNoSyxDQUFDO2FBQ0g7WUFFRCw4REFBOEQ7WUFDOUQsSUFBSSxtQkFBbUIsS0FBSyxXQUFXLElBQUksT0FBTyxFQUFFO2dCQUNsRCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDckM7WUFFRCx1QkFBdUI7WUFDdkIsbUJBQW1CLEdBQUcsV0FBVyxDQUFDO1lBRWxDLHFCQUFxQjtZQUNyQixjQUFjLENBQUMsY0FBYyxFQUFFLENBQUM7WUFFaEMsT0FBTyxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDOUIsQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7V0FZRztRQUNI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