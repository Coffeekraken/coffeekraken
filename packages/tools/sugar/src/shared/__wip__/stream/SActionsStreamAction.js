// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../object/deepMerge", "@coffeekraken/s-promise"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const deepMerge_1 = __importDefault(require("../object/deepMerge"));
    const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
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
    class SActionStreamAction extends s_promise_1.default {
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
            super(deepMerge_1.default({
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
            this._currentPromise = new s_promise_1.default({
                id: this._settings.id + 'Run'
            });
            s_promise_1.default.map(this._currentPromise, this);
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
    exports.default = SActionStreamAction;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FjdGlvbnNTdHJlYW1BY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQWN0aW9uc1N0cmVhbUFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsb0VBQThDO0lBQzlDLHdFQUFpRDtJQUlqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCRztJQUNILE1BQXFCLG1CQUFvQixTQUFRLG1CQUFVO1FBcUN6RDs7Ozs7Ozs7V0FRRztRQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7WUFDdkIsZ0JBQWdCO1lBQ2hCLEtBQUssQ0FDSCxtQkFBVyxDQUNUO2dCQUNFLElBQUksRUFBRSxJQUFJO2dCQUNWLEVBQUUsRUFBRSxzQkFBc0I7Z0JBQzFCLEtBQUssRUFBRSxJQUFJO2FBQ1osRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1lBeERKOzs7Ozs7Ozs7ZUFTRztZQUNILHFCQUFnQixHQUFHLElBQUksQ0FBQztZQUV4Qjs7Ozs7Ozs7O2VBU0c7WUFDSCxvQkFBZSxHQUFHLElBQUksQ0FBQztZQUV2Qjs7Ozs7Ozs7O2VBU0c7WUFDSCx5QkFBb0IsR0FBRyxFQUFFLENBQUM7WUF1QnhCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzVELENBQUM7UUFFRCxJQUFJLFFBQVE7WUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQztRQUVELElBQUksRUFBRTtZQUNKLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7UUFDM0IsQ0FBQztRQUNELElBQUksSUFBSTtZQUNOLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDN0IsQ0FBQztRQUVEOzs7Ozs7Ozs7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