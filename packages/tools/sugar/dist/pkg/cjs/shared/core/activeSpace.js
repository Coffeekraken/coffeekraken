"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_glob_1 = __importDefault(require("is-glob"));
const minimatch_1 = __importDefault(require("minimatch"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
/**
 * @name                    activeSpace
 * @namespace            js.core
 * @type                    Object
 * @platform          js
 * @platform          node
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    set: (activeSpace, history = true, silent = false) => {
        if (!silent && (0, is_glob_1.default)(activeSpace)) {
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    append: (activeSpace, history = true) => {
        // get the current one
        const currentActiveSpace = activeSpaceApi.get() || '';
        if (currentActiveSpace !== '' &&
            (0, minimatch_1.default)(currentActiveSpace, `**.${activeSpace}`))
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    is: (activeSpaceToCheck, currentActiveSpace = activeSpaceApi.get()) => {
        if (!currentActiveSpace)
            return false;
        return (0, minimatch_1.default)(currentActiveSpace, activeSpaceToCheck);
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    on: (activeSpaceToCheck, callback, settings = {}) => {
        settings = (0, deepMerge_1.default)({
            once: false,
            count: -1,
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
            called: 0,
        });
    },
    /**
     * @name          _callCallbacks
     * @type          Function
     * @private
     *
     * Call the callbacks when an activeSpace has been setted
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
    },
};
exports.default = activeSpaceApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHNEQUErQjtBQUMvQiwwREFBb0M7QUFDcEMsb0VBQThDO0FBRTlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DRztBQUNILE1BQU0sMEJBQTBCLEdBQUcsRUFBRSxDQUFDO0FBQ3RDLE1BQU0saUJBQWlCLEdBQUcsRUFBRSxDQUFDO0FBQzdCLElBQUksbUJBQW1CLEdBQUcsSUFBSSxDQUFDO0FBQy9CLE1BQU0sY0FBYyxHQUFHO0lBQ25COzs7Ozs7Ozs7O09BVUc7SUFDSCxHQUFHLEVBQUUsR0FBRyxFQUFFO1FBQ04sT0FBTyxtQkFBbUIsQ0FBQztJQUMvQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxPQUFPLEdBQUcsSUFBSSxFQUFFLE1BQU0sR0FBRyxLQUFLLEVBQUUsRUFBRTtRQUNqRCxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUEsaUJBQVEsRUFBQyxXQUFXLENBQUMsRUFBRTtZQUNsQyxNQUFNLElBQUksS0FBSyxDQUNYLDhDQUE4QyxXQUFXLHNHQUFzRyxDQUNsSyxDQUFDO1NBQ0w7UUFFRCw4REFBOEQ7UUFDOUQsSUFBSSxtQkFBbUIsS0FBSyxXQUFXLElBQUksT0FBTyxFQUFFO1lBQ2hELGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN2QztRQUVELHVCQUF1QjtRQUN2QixtQkFBbUIsR0FBRyxXQUFXLENBQUM7UUFFbEMscUJBQXFCO1FBQ3JCLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUVoQyxPQUFPLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxFQUFFLENBQUMsV0FBVyxFQUFFLE9BQU8sR0FBRyxJQUFJLEVBQUUsRUFBRTtRQUNwQyxzQkFBc0I7UUFDdEIsTUFBTSxrQkFBa0IsR0FBRyxjQUFjLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDO1FBRXRELElBQ0ksa0JBQWtCLEtBQUssRUFBRTtZQUN6QixJQUFBLG1CQUFXLEVBQUMsa0JBQWtCLEVBQUUsTUFBTSxXQUFXLEVBQUUsQ0FBQztZQUVwRCxPQUFPLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVoQyxNQUFNLHVCQUF1QixHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5RCxNQUFNLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEQsY0FBYyxDQUFDLEdBQUcsQ0FDZCxDQUFDLEdBQUcsdUJBQXVCLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFDM0QsT0FBTyxDQUNWLENBQUM7UUFDRixPQUFPLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sR0FBRyxJQUFJLEVBQUUsRUFBRTtRQUNqQyxrQkFBa0I7UUFDbEIsTUFBTSxrQkFBa0IsR0FBRyxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDaEQsNEJBQTRCO1FBQzVCLElBQUksY0FBYyxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUQsNkJBQTZCO1FBQzdCLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUc7WUFDakMsY0FBYyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakQsSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHO1lBQ25DLGNBQWMsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlDLDRDQUE0QztRQUM1QyxjQUFjLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM1QyxrQ0FBa0M7UUFDbEMsT0FBTyxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFFBQVEsRUFBRSxHQUFHLEVBQUU7UUFDWCxJQUFJLGlCQUFpQixDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQUUsT0FBTztRQUMxQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEMsY0FBYyxDQUFDLEdBQUcsQ0FDZCxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQy9DLEtBQUssQ0FDUixDQUFDO1FBQ0YsT0FBTyxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0IsR0FBRyxjQUFjLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRTtRQUNsRSxJQUFJLENBQUMsa0JBQWtCO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDdEMsT0FBTyxJQUFBLG1CQUFXLEVBQUMsa0JBQWtCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsRUFBRSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLFFBQVEsR0FBRyxFQUFFLEVBQUUsRUFBRTtRQUNoRCxRQUFRLEdBQUcsSUFBQSxtQkFBVyxFQUNsQjtZQUNJLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUNaLEVBQ0QsUUFBUSxDQUNYLENBQUM7UUFDRixpREFBaUQ7UUFDakQsSUFBSSxDQUFDLDBCQUEwQixDQUFDLGtCQUFrQixDQUFDO1lBQy9DLDBCQUEwQixDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3hELG9DQUFvQztRQUNwQyxJQUFJLFFBQVEsQ0FBQyxJQUFJO1lBQUUsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDdEMsdUNBQXVDO1FBQ3ZDLDBCQUEwQixDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2hELGtCQUFrQjtZQUNsQixRQUFRO1lBQ1IsUUFBUTtZQUNSLE1BQU0sRUFBRSxDQUFDO1NBQ1osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsY0FBYyxFQUFFLEdBQUcsRUFBRTtRQUNqQiw0REFBNEQ7UUFDNUQsTUFBTSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLE9BQU8sQ0FDM0MsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFO1lBQ25CLHlDQUF5QztZQUN6QyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztnQkFBRSxPQUFPO1lBQ25ELHFDQUFxQztZQUNyQywwQkFBMEIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE9BQU8sQ0FDbEQsQ0FBQyxzQkFBc0IsRUFBRSxFQUFFO2dCQUN2QixvQkFBb0I7Z0JBQ3BCLHNCQUFzQixDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNsQywrQkFBK0I7Z0JBQy9CLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNoQyxzQ0FBc0M7Z0JBQ3RDLElBQUksc0JBQXNCLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUM7b0JBQzVDLE9BQU87Z0JBQ1gsSUFDSSxzQkFBc0IsQ0FBQyxNQUFNO29CQUM3QixzQkFBc0IsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUN2QztvQkFDRSxzQkFBc0IsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2lCQUN4QztnQkFDRCw0REFBNEQ7Z0JBQzVELDBCQUEwQixDQUN0QixrQkFBa0IsQ0FDckIsR0FBRywwQkFBMEIsQ0FDMUIsa0JBQWtCLENBQ3JCLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQ2IsT0FBTyxHQUFHLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQztnQkFDL0IsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQ0osQ0FBQztRQUNOLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUM7QUFFRixrQkFBZSxjQUFjLENBQUMifQ==