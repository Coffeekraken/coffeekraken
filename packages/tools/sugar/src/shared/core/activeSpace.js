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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlU3BhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhY3RpdmVTcGFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxXQUFXLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sUUFBUSxNQUFNLFNBQVMsQ0FBQztBQUUvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUNHO0FBQ0gsTUFBTSwwQkFBMEIsR0FBRyxFQUFFLENBQUM7QUFDdEMsTUFBTSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7QUFDN0IsSUFBSSxtQkFBbUIsR0FBRyxJQUFJLENBQUM7QUFDL0IsTUFBTSxjQUFjLEdBQUc7SUFDckI7Ozs7Ozs7Ozs7T0FVRztJQUNILEdBQUcsRUFBRSxHQUFHLEVBQUU7UUFDUixPQUFPLG1CQUFtQixDQUFDO0lBQzdCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLE9BQU8sR0FBRyxJQUFJLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBRSxFQUFFO1FBQ25ELElBQUksQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3BDLE1BQU0sSUFBSSxLQUFLLENBQ2IsOENBQThDLFdBQVcsc0dBQXNHLENBQ2hLLENBQUM7U0FDSDtRQUVELDhEQUE4RDtRQUM5RCxJQUFJLG1CQUFtQixLQUFLLFdBQVcsSUFBSSxPQUFPLEVBQUU7WUFDbEQsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3JDO1FBRUQsdUJBQXVCO1FBQ3ZCLG1CQUFtQixHQUFHLFdBQVcsQ0FBQztRQUVsQyxxQkFBcUI7UUFDckIsY0FBYyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRWhDLE9BQU8sY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLEVBQUUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxHQUFHLElBQUksRUFBRSxFQUFFO1FBQ3RDLHNCQUFzQjtRQUN0QixNQUFNLGtCQUFrQixHQUFHLGNBQWMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFFdEQsSUFDRSxrQkFBa0IsS0FBSyxFQUFFO1lBQ3pCLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLFdBQVcsRUFBRSxDQUFDO1lBRXBELE9BQU8sY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRTlCLE1BQU0sdUJBQXVCLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlELE1BQU0sZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRCxjQUFjLENBQUMsR0FBRyxDQUNoQixDQUFDLEdBQUcsdUJBQXVCLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFDM0QsT0FBTyxDQUNSLENBQUM7UUFDRixPQUFPLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sR0FBRyxJQUFJLEVBQUUsRUFBRTtRQUNuQyxrQkFBa0I7UUFDbEIsTUFBTSxrQkFBa0IsR0FBRyxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDaEQsNEJBQTRCO1FBQzVCLElBQUksY0FBYyxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUQsNkJBQTZCO1FBQzdCLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUc7WUFDbkMsY0FBYyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHO1lBQ3JDLGNBQWMsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVDLDRDQUE0QztRQUM1QyxjQUFjLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM1QyxrQ0FBa0M7UUFDbEMsT0FBTyxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFFBQVEsRUFBRSxHQUFHLEVBQUU7UUFDYixJQUFJLGlCQUFpQixDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQUUsT0FBTztRQUMxQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0UsT0FBTyxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0IsR0FBRyxjQUFjLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRTtRQUNwRSxJQUFJLENBQUMsa0JBQWtCO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDdEMsT0FBTyxXQUFXLENBQUMsa0JBQWtCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsRUFBRSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLFFBQVEsR0FBRyxFQUFFLEVBQUUsRUFBRTtRQUNsRCxRQUFRLEdBQUcsV0FBVyxDQUNwQjtZQUNFLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUNWLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFDRixpREFBaUQ7UUFDakQsSUFBSSxDQUFDLDBCQUEwQixDQUFDLGtCQUFrQixDQUFDO1lBQ2pELDBCQUEwQixDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3RELG9DQUFvQztRQUNwQyxJQUFJLFFBQVEsQ0FBQyxJQUFJO1lBQUUsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDdEMsdUNBQXVDO1FBQ3ZDLDBCQUEwQixDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2xELGtCQUFrQjtZQUNsQixRQUFRO1lBQ1IsUUFBUTtZQUNSLE1BQU0sRUFBRSxDQUFDO1NBQ1YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsY0FBYyxFQUFFLEdBQUcsRUFBRTtRQUNuQiw0REFBNEQ7UUFDNUQsTUFBTSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGtCQUFrQixFQUFFLEVBQUU7WUFDckUseUNBQXlDO1lBQ3pDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO2dCQUFFLE9BQU87WUFDbkQscUNBQXFDO1lBQ3JDLDBCQUEwQixDQUFDLGtCQUFrQixDQUFDLENBQUMsT0FBTyxDQUNwRCxDQUFDLHNCQUFzQixFQUFFLEVBQUU7Z0JBQ3pCLG9CQUFvQjtnQkFDcEIsc0JBQXNCLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2xDLCtCQUErQjtnQkFDL0Isc0JBQXNCLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hDLHNDQUFzQztnQkFDdEMsSUFBSSxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQztvQkFBRSxPQUFPO2dCQUN6RCxJQUNFLHNCQUFzQixDQUFDLE1BQU07b0JBQzdCLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQ3JDO29CQUNBLHNCQUFzQixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7aUJBQ3RDO2dCQUNELDREQUE0RDtnQkFDNUQsMEJBQTBCLENBQ3hCLGtCQUFrQixDQUNuQixHQUFHLDBCQUEwQixDQUFDLGtCQUFrQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQ2hFLE9BQU8sR0FBRyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUM7Z0JBQzdCLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUNGLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFDO0FBRUYsZUFBZSxjQUFjLENBQUMifQ==