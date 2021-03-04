// @ts-nocheck
// @shared
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../object/deepMerge", "../promise/SPromise"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var SPromise_1 = __importDefault(require("../promise/SPromise"));
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
    var SActionStreamAction = /** @class */ (function (_super) {
        __extends(SActionStreamAction, _super);
        /**
         * @name            constructor
         * @type            Function
         * @constructor
         *
         * Constructor
         *
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        function SActionStreamAction(settings) {
            if (settings === void 0) { settings = {}; }
            var _this = 
            // init SPromise
            _super.call(this, deepMerge_1.default({
                name: null,
                id: "SActionsStreamAction",
                cache: true
            }, settings)) || this;
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
            _this._skipNextActions = null;
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
            _this._currentPromise = null;
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
            _this._registeredCallbacks = [];
            if (!_this._settings.id)
                _this._settings.id = _this.constructor.name.toLowerCase();
            return _this;
        }
        Object.defineProperty(SActionStreamAction.prototype, "settings", {
            get: function () {
                return this._settings;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SActionStreamAction.prototype, "id", {
            get: function () {
                return this._settings.id;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SActionStreamAction.prototype, "name", {
            get: function () {
                return this._settings.name;
            },
            enumerable: false,
            configurable: true
        });
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
        SActionStreamAction.prototype.checkStreamObject = function (streamObj) {
            if (!this.constructor.interface)
                return true;
            // validate the streamObj depending on the static definition property
            if (this.constructor.interface) {
                streamObj = this.constructor.interface.applyAndComplete(streamObj);
            }
        };
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
        SActionStreamAction.prototype.skipNextActions = function (what) {
            if (what === void 0) { what = true; }
            this._skipNextActions = what;
        };
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
        SActionStreamAction.prototype.registerCallback = function (callback, when, action) {
            if (when === void 0) { when = 'after'; }
            if (action === void 0) { action = null; }
            this._registeredCallbacks.push({
                callback: callback,
                when: when,
                action: action
            });
        };
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
        SActionStreamAction.prototype.run = function (streamObj, promiseFn) {
            this.checkStreamObject(streamObj);
            this._currentPromise = new SPromise_1.default({
                id: this._settings.id + 'Run'
            });
            SPromise_1.default.map(this._currentPromise, this);
            promiseFn(this._currentPromise.resolve.bind(this._currentPromise), this._currentPromise.reject.bind(this._currentPromise), this._currentPromise.emit.bind(this._currentPromise), this._currentPromise.cancel.bind(this._currentPromise));
            return this._currentPromise;
        };
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
        SActionStreamAction.prototype.error = function (message) {
            // this.emit('error', {
            //   value: `<red>✚</red> ${message}`
            // });
            // if (!this._currentPromise) return;
            // this._currentPromise.emit('log', {
            //   value: `<red>✚</red> ${message}`
            // });
        };
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
        SActionStreamAction.prototype.warn = function (message) {
            this.emit('log', {
                value: "<yellow>\u26A0</yellow> " + message
            });
            if (!this._currentPromise)
                return;
            this._currentPromise.emit('log', {
                value: "<yellow>\u26A0</yellow> " + message
            });
        };
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
        SActionStreamAction.prototype.log = function (obj) {
            var _this = this;
            setTimeout(function () {
                if (typeof obj === 'string') {
                    _this.emit('log', {
                        value: obj
                    });
                    if (!_this._currentPromise)
                        return;
                    _this._currentPromise.emit('log', {
                        value: obj
                    });
                }
                else {
                    _this.emit('log', obj);
                    if (!_this._currentPromise)
                        return;
                    _this._currentPromise.emit('log', obj);
                }
            });
        };
        return SActionStreamAction;
    }(SPromise_1.default));
    exports.default = SActionStreamAction;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FjdGlvbnNTdHJlYW1BY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQWN0aW9uc1N0cmVhbUFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVWLGtFQUE4QztJQUM5QyxpRUFBNkM7SUFJN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Qkc7SUFDSDtRQUFpRCx1Q0FBVTtRQXFDekQ7Ozs7Ozs7O1dBUUc7UUFDSCw2QkFBWSxRQUFhO1lBQWIseUJBQUEsRUFBQSxhQUFhO1lBQXpCO1lBQ0UsZ0JBQWdCO1lBQ2hCLGtCQUNFLG1CQUFXLENBQ1Q7Z0JBQ0UsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsRUFBRSxFQUFFLHNCQUFzQjtnQkFDMUIsS0FBSyxFQUFFLElBQUk7YUFDWixFQUNELFFBQVEsQ0FDVCxDQUNGLFNBR0Y7WUEzREQ7Ozs7Ozs7OztlQVNHO1lBQ0gsc0JBQWdCLEdBQUcsSUFBSSxDQUFDO1lBRXhCOzs7Ozs7Ozs7ZUFTRztZQUNILHFCQUFlLEdBQUcsSUFBSSxDQUFDO1lBRXZCOzs7Ozs7Ozs7ZUFTRztZQUNILDBCQUFvQixHQUFHLEVBQUUsQ0FBQztZQXVCeEIsSUFBSSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDcEIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7O1FBQzVELENBQUM7UUFFRCxzQkFBSSx5Q0FBUTtpQkFBWjtnQkFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDeEIsQ0FBQzs7O1dBQUE7UUFFRCxzQkFBSSxtQ0FBRTtpQkFBTjtnQkFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1lBQzNCLENBQUM7OztXQUFBO1FBQ0Qsc0JBQUkscUNBQUk7aUJBQVI7Z0JBQ0UsT0FB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