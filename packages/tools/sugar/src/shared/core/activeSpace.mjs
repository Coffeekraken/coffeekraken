// @ts-nocheck
import __deepMerge from '../object/deepMerge';
import __minimatch from 'minimatch';
import __isGlob from 'is-glob';
/**
 * @name                    activeSpace
 * @namespace            js.core
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
export default activeSpaceApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlU3BhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvc2hhcmVkL2NvcmUvYWN0aXZlU3BhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sV0FBVyxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sV0FBVyxNQUFNLFdBQVcsQ0FBQztBQUNwQyxPQUFPLFFBQVEsTUFBTSxTQUFTLENBQUM7QUFFL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUNILE1BQU0sMEJBQTBCLEdBQUcsRUFBRSxDQUFDO0FBQ3RDLE1BQU0saUJBQWlCLEdBQUcsRUFBRSxDQUFDO0FBQzdCLElBQUksbUJBQW1CLEdBQUcsSUFBSSxDQUFDO0FBQy9CLE1BQU0sY0FBYyxHQUFHO0lBQ3JCOzs7Ozs7Ozs7O09BVUc7SUFDSCxHQUFHLEVBQUUsR0FBRyxFQUFFO1FBQ1IsT0FBTyxtQkFBbUIsQ0FBQztJQUM3QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxPQUFPLEdBQUcsSUFBSSxFQUFFLE1BQU0sR0FBRyxLQUFLLEVBQUUsRUFBRTtRQUNuRCxJQUFJLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUNwQyxNQUFNLElBQUksS0FBSyxDQUNiLDhDQUE4QyxXQUFXLHNHQUFzRyxDQUNoSyxDQUFDO1NBQ0g7UUFFRCw4REFBOEQ7UUFDOUQsSUFBSSxtQkFBbUIsS0FBSyxXQUFXLElBQUksT0FBTyxFQUFFO1lBQ2xELGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNyQztRQUVELHVCQUF1QjtRQUN2QixtQkFBbUIsR0FBRyxXQUFXLENBQUM7UUFFbEMscUJBQXFCO1FBQ3JCLGNBQWMsQ0FBQyxj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