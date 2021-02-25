// @ts-nocheck
// @shared
import __deepMerge from '../object/deepMerge';
import __SPromise from '../promise/SPromise';
/**
 * @name          SActionStreamAction
 * @namespace           sugar.js.stream
 * @type          Class
 * @extends       SPromise
 * @status              beta
 *
 * This class represent the base of a actions stream action.
 * An action stream action represent an action that you can register in the SActionsStream instance and
 * prodive you some usefull features like "emit" some events, set/get data from the streamObj, defining some required streamObj properties
 * to work with, etc...
 *
 * @param       {Object}        actions         An object of actions to execute one after the other. The object has to be formatted like ```{ actionName: actionFunction }```
 * @param       {Object}        [settings={}]   A settings object to configure your instance:
 * - name (null) {String}: A simple name for your stream that will be used in the logs
 * - order (null) {Array}: An array of action names that specify the order you want to execute them. If not specified, take the actions object properties order.
 * - actions ({}) {Object}: An object formated like ```{ actionName: settings }``` that contain specific settings for each actions and that will be passed as a second parameter to each actions.
 * - cache (true) {Boolean}: Specify if this action is aware of the cache or not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SActionStreamAction extends __SPromise {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        // init SPromise
        super(__deepMerge({
            name: null,
            id: `SActionsStreamAction`,
            cache: true
        }, settings));
        /**
         * @name            _skipNextActions
         * @type            Number|Array<String>
         * @private
         *
         * Store the next actions you want to skip
         *
         * @since           2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._skipNextActions = null;
        /**
         * @name            _currentPromise
         * @type            SPromise
         * @private
         *
         * Store the current SPromise instance of the current running action instance
         *
         * @since         2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._currentPromise = null;
        /**
         * @name            _registeredCallbacks
         * @type            Array<Object>
         * @private
         *
         * Store the registered callbaks
         *
         * @since           2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._registeredCallbacks = [];
        if (!this._settings.id)
            this._settings.id = this.constructor.name.toLowerCase();
    }
    get settings() {
        return this._settings;
    }
    get id() {
        return this._settings.id;
    }
    get name() {
        return this._settings.name;
    }
    /**
     * @name          checkStreamObject
     * @type          Function
     * @async
     *
     * This method take the streamObj object passed to the "run" method and check it depending on the definition
     * specified in the static definition property.
     *
     * @param       {Object}        streamObj         The streamObj to check
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    checkStreamObject(streamObj) {
        if (!this.constructor.interface)
            return true;
        // validate the streamObj depending on the static definition property
        if (this.constructor.interface) {
            streamObj = this.constructor.interface.applyAndComplete(streamObj);
        }
    }
    /**
     * @name          skipNextActions
     * @type          Function
     *
     * This method allows you to tell the SActionStream class that you want to skip
     * the next actions. If you don't specify anything, it means that you want to skip
     * ALL the next actions. You can pass a number that mean that you want to skip x next action(s),
     * or an array with the actions names that you want to skip.
     *
     * @param       {Number|Array<String>|Boolean}        [what=true]        Specify what you want to skip. Can be a number or an array of actions names to skip
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    skipNextActions(what = true) {
        this._skipNextActions = what;
    }
    /**
     * @name          registerCallback
     * @type          Function
     *
     * This method allows you to register some callbacks during the stream action process.
     * You can specify when you want to register this callback like "before" or "after", and specify if
     * it's before/after the entire stream process or a particular action.
     *
     * @param       {Function}        callback          The callback function to call
     * @param       {String}          [when='after']    When you want to call this callback. Can be "before" or "after"
     * @param       {String}          [action=null]     Specify the reference action. If not set, that's mean that the entire stream process is the reference
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    registerCallback(callback, when = 'after', action = null) {
        this._registeredCallbacks.push({
            callback,
            when,
            action
        });
    }
    /**
     * @name          run
     * @type          Function
     * @async
     *
     * This method is the one that has to be overrided.
     * It will be called to run the actions on want on the streamObj passed as parameter
     * and MUST return a Promise instance that you need to resolve at the end of your processed
     * and pass it the updated streamObject.
     *
     * @param       {Object}        streamObj         The streamObj to work with
     * @param       {Object}        [settings=this._settings]     A settings object specific to this action. It will be equal to the passed instance settings and deeply merged with the settings object you have setted in the "actions.{actionName}" oject of the SActionsStream instance
     * @return      {Promise}                         A simple promise that you have to resolve at the end of your process with the updates streamObj
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    run(streamObj, promiseFn) {
        this.checkStreamObject(streamObj);
        this._currentPromise = new __SPromise({
            id: this._settings.id + 'Run'
        });
        __SPromise.map(this._currentPromise, this);
        promiseFn(this._currentPromise.resolve.bind(this._currentPromise), this._currentPromise.reject.bind(this._currentPromise), this._currentPromise.emit.bind(this._currentPromise), this._currentPromise.cancel.bind(this._currentPromise));
        return this._currentPromise;
    }
    /**
     * @name          error
     * @type          Function
     *
     * This method allows you to error a message that will be catched by the parent manager class
     *
     * @param       {String}        message           The message you want to error
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    error(message) {
        // this.emit('error', {
        //   value: `<red>✚</red> ${message}`
        // });
        // if (!this._currentPromise) return;
        // this._currentPromise.emit('log', {
        //   value: `<red>✚</red> ${message}`
        // });
    }
    /**
     * @name          warn
     * @type          Function
     *
     * This method allows you to warn a message that will be catched by the parent manager class
     *
     * @param       {String}        message           The message you want to warn
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    warn(message) {
        this.emit('log', {
            value: `<yellow>⚠</yellow> ${message}`
        });
        if (!this._currentPromise)
            return;
        this._currentPromise.emit('log', {
            value: `<yellow>⚠</yellow> ${message}`
        });
    }
    /**
     * @name          log
     * @type          Function
     *
     * This method allows you to log a message that will be catched by the parent manager class
     *
     * @param       {String}        message           The message you want to log
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    log(obj) {
        setTimeout(() => {
            if (typeof obj === 'string') {
                this.emit('log', {
                    value: obj
                });
                if (!this._currentPromise)
                    return;
                this._currentPromise.emit('log', {
                    value: obj
                });
            }
            else {
                this.emit('log', obj);
                if (!this._currentPromise)
                    return;
                this._currentPromise.emit('log', obj);
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FjdGlvbnNTdHJlYW1BY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQWN0aW9uc1N0cmVhbUFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTtBQUVWLE9BQU8sV0FBVyxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sVUFBVSxNQUFNLHFCQUFxQixDQUFDO0FBSTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxtQkFBb0IsU0FBUSxVQUFVO0lBcUN6RDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDdkIsZ0JBQWdCO1FBQ2hCLEtBQUssQ0FDSCxXQUFXLENBQ1Q7WUFDRSxJQUFJLEVBQUUsSUFBSTtZQUNWLEVBQUUsRUFBRSxzQkFBc0I7WUFDMUIsS0FBSyxFQUFFLElBQUk7U0FDWixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUF4REo7Ozs7Ozs7OztXQVNHO1FBQ0gscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBRXhCOzs7Ozs7Ozs7V0FTRztRQUNILG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBRXZCOzs7Ozs7Ozs7V0FTRztRQUNILHlCQUFvQixHQUFHLEVBQUUsQ0FBQztRQXVCeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM1RCxDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLEVBQUU7UUFDSixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMs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