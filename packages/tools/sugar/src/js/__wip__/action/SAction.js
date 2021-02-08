// @ts-nocheck
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
        define(["require", "exports", "../object/deepMerge", "../promise/SPromise", "../object/flatten", "./typeMap"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var SPromise_1 = __importDefault(require("../promise/SPromise"));
    var flatten_1 = __importDefault(require("../object/flatten"));
    var typeMap_1 = __importDefault(require("./typeMap"));
    /**
     * @name 		                    SAction
     * @namespace           sugar.js.action
     * @type                        Class
     *
     * This class represent an action. An action is something that happened depending on
     * settings. It can be an "url" action that will change the user page, a "login" action
     * that will allow the user to log in his favorite services like "google", etc...
     * All this is wrapped into a nicely formated system that use the SPromise class
     * to let you know the state of the action, etc...
     *
     * @example 	js
     * import SAction from '@coffeekraken/sugar/js/action/SAction';
     * class MyCoolAction extends SAction {
     *    constructor(descriptorObj, settings = {}) {
     *      super(descriptorObj, settings);
     *    }
     * }
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var SAction = /** @class */ (function (_super) {
        __extends(SAction, _super);
        /**
         * @name                              constructor
         * @type                              Function
         *
         * Constructor
         *
         * @param           	{SActionConfig|Object} 		            request 	            	The request object used to make ajax call
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        function SAction(descriptorObj, settings) {
            if (settings === void 0) { settings = {}; }
            var _this = _super.call(this, function (resolve, reject, emit) { }) || this;
            /**
             * @name            _settings
             * @type            Object
             * @private
             *
             * Store this action instance settings
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _this._settings = {};
            /**
             * @name            _descriptorObj
             * @type            Object
             * @private
             *
             * Store this action instance settings
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            _this._descriptorObj = {};
            _this._settings = deepMerge_1.default({}, settings);
            _this._descriptorObj = descriptorObj;
            return _this;
        }
        /**
         * @name              on
         * @type              Function
         * @static
         *
         * This function allows you to subscribe to general SAction actions events by
         * prefixing it with the action class name like "SUrlAction.{event}", etc...
         *
         * @return      {Function}          A function that you can call to unregister to the event
         *
         * @since         2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SAction.on = function (event, callback) {
            SAction._promise.on(event, callback);
            return function () {
                SAction._promise.off(event, callback);
            };
        };
        /**
         * @name            run
         * @type            Function
         *
         * This method is meant to be overrided by your custom actions classes.
         * You still need to call it using the ```super.run()``` statement in order
         * to keep all the features like promises events, etc...
         *
         * @return      {SPromise}      An SPromise instance only for this particular run process. You can subscribe to the same "events" has on the class itself but these events are happening only for this run process.
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SAction.prototype.run = function () {
            var _this = this;
            var promise = new SPromise_1.default(function (_a) {
                var resolve = _a.resolve, reject = _a.reject, emit = _a.emit;
                SAction._promise.emit(_this.constructor.name + ".run", _this);
                emit("run", _this);
                _this.emit("run", _this);
            }, {
                id: SAction._promise.id + 'Run'
            });
            promise.complete = function () {
                SAction._promise.emit(_this.constructor.name + ".complete", _this);
                promise.emit('complete', _this);
                _this.emit("complete", _this);
            };
            return promise;
        };
        /**
         * @name          toJson
         * @type          Function
         *
         * This method is usefull to turn your action instance into a
         * proper JSON object to you can pass it through http request, etc...
         * You can then instanciate back your action by using the ```
         *
         * @since         2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SAction.prototype.toJson = function () {
            var types = flatten_1.default(typeMap_1.default);
            var type = null;
            for (var key in types) {
                if (types[key] === this.constructor) {
                    type = key.replace('.default', '');
                    break;
                }
            }
            if (!type)
                throw new Error("You try to convert your \"<primary>" + this.constructor.name + "</primary>\" instance to JSON but this Class is not registered into the \"<cyan>js.action.typeMap</cyan>\" mapping object. Please add it to it before continue...");
            return {
                type: type,
                descriptorObj: this._descriptorObj,
                settings: this._settings
            };
        };
        /**
         * @name              _promise
         * @type              SPromise
         * @static
         * @private
         *
         * Store the global SPromise instance used to dispatch global events
         *
         * @since         2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SAction._promise = new SPromise_1.default({
            id: 'SAction'
        });
        return SAction;
    }(SPromise_1.default));
    exports.default = SAction;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNBY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUdkLGtFQUE4QztJQUM5QyxpRUFBNkM7SUFFN0MsOERBQTBDO0lBRzFDLHNEQUFrQztJQUVsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FvQkc7SUFDSDtRQUFxQywyQkFBVTtRQTREN0M7Ozs7Ozs7Ozs7V0FVRztRQUNILGlCQUFZLGFBQWEsRUFBRSxRQUFhO1lBQWIseUJBQUEsRUFBQSxhQUFhO1lBQXhDLFlBQ0Usa0JBQU0sVUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksSUFBTSxDQUFDLENBQUMsU0FHckM7WUExRUQ7Ozs7Ozs7OztlQVNHO1lBQ0gsZUFBUyxHQUFHLEVBQUUsQ0FBQztZQUVmOzs7Ozs7Ozs7ZUFTRztZQUNILG9CQUFjLEdBQUcsRUFBRSxDQUFDO1lBa0RsQixLQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLEtBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDOztRQUN0QyxDQUFDO1FBbkNEOzs7Ozs7Ozs7Ozs7V0FZRztRQUNJLFVBQUUsR0FBVCxVQUFVLEtBQUssRUFBRSxRQUFRO1lBQ3ZCLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNyQyxPQUFPO2dCQUNMLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN4QyxDQUFDLENBQUM7UUFDSixDQUFDO1FBbUJEOzs7Ozs7Ozs7Ozs7V0FZRztRQUNILHFCQUFHLEdBQUg7WUFBQSxpQkFpQkM7WUFoQkMsSUFBTSxPQUFPLEdBQUcsSUFBSSxrQkFBVSxDQUM1QixVQUFDLEVBQXlCO29CQUF2QixPQUFPLGFBQUEsRUFBRSxNQUFNLFlBQUEsRUFBRSxJQUFJLFVBQUE7Z0JBQ3RCLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFJLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxTQUFNLEVBQUUsS0FBSSxDQUFDLENBQUM7Z0JBQzVELElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSSxDQUFDLENBQUM7Z0JBQ2xCLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUksQ0FBQyxDQUFDO1lBQ3pCLENBQUMsRUFDRDtnQkFDRSxFQUFFLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsS0FBSzthQUNoQyxDQUNGLENBQUM7WUFDRixPQUFPLENBQUMsUUFBUSxHQUFHO2dCQUNqQixPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBSSxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksY0FBVyxFQUFFLEtBQUksQ0FBQyxDQUFDO2dCQUNqRSxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxLQUFJLENBQUMsQ0FBQztnQkFDL0IsS0FBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSSxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDO1lBQ0YsT0FBTyxPQUFPLENBQUM7UUFDakIsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCx3QkFBTSxHQUFOO1lBQ0UsSUFBTSxLQUFLLEdBQUcsaUJBQVMsQ0FBQyxpQkFBUyxDQUFDLENBQUM7WUFDbkMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLEtBQUssSUFBTSxHQUFHLElBQUksS0FBSyxFQUFFO2dCQUN2QixJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFO29CQUNuQyxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ25DLE1BQU07aUJBQ1A7YUFDRjtZQUVELElBQUksQ0FBQyxJQUFJO2dCQUNQLE1BQU0sSUFBSSxLQUFLLENBQ2Isd0NBQXFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxzS0FBZ0ssQ0FDM04sQ0FBQztZQUVKLE9BQU87Z0JBQ0wsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjO2dCQUNsQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVM7YUFDekIsQ0FBQztRQUNKLENBQUM7UUFuSEQ7Ozs7Ozs7Ozs7V0FVRztRQUNJLGdCQUFRLEdBQUcsSUFBSSxrQkFBVSxDQUFDO1lBQy9CLEVBQUUsRUFBRSxTQUFTO1NBQ2QsQ0FBQyxDQUFDO1FBdUdMLGNBQUM7S0FBQSxBQTdJRCxDQUFxQyxrQkFBVSxHQTZJOUM7c0JBN0lvQixPQUFPIn0=