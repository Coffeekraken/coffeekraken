// @ts-nocheck
import __deepMerge from '../object/deepMerge';
import __minimatch from 'minimatch';
import __isGlob from 'is-glob';
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
        if (!silent && __isGlob(activeSpace)) {
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
            __minimatch(currentActiveSpace, `**.${activeSpace}`))
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
        return __minimatch(currentActiveSpace, activeSpaceToCheck);
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
        settings = __deepMerge({
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
                _activeSpaceCallbacksStack[activeSpaceToCheck] =
                    _activeSpaceCallbacksStack[activeSpaceToCheck].filter((obj) => {
                        return obj.delete !== true;
                    });
            });
        });
    },
};
export default activeSpaceApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlU3BhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhY3RpdmVTcGFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxXQUFXLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sUUFBUSxNQUFNLFNBQVMsQ0FBQztBQUUvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQ0c7QUFDSCxNQUFNLDBCQUEwQixHQUFHLEVBQUUsQ0FBQztBQUN0QyxNQUFNLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztBQUM3QixJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQztBQUMvQixNQUFNLGNBQWMsR0FBRztJQUNuQjs7Ozs7Ozs7OztPQVVHO0lBQ0gsR0FBRyxFQUFFLEdBQUcsRUFBRTtRQUNOLE9BQU8sbUJBQW1CLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxHQUFHLElBQUksRUFBRSxNQUFNLEdBQUcsS0FBSyxFQUFFLEVBQUU7UUFDakQsSUFBSSxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FDWCw4Q0FBOEMsV0FBVyxzR0FBc0csQ0FDbEssQ0FBQztTQUNMO1FBRUQsOERBQThEO1FBQzlELElBQUksbUJBQW1CLEtBQUssV0FBVyxJQUFJLE9BQU8sRUFBRTtZQUNoRCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDdkM7UUFFRCx1QkFBdUI7UUFDdkIsbUJBQW1CLEdBQUcsV0FBVyxDQUFDO1FBRWxDLHFCQUFxQjtRQUNyQixjQUFjLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFaEMsT0FBTyxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVE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