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
        define(["require", "exports", "../SAction", "../../is/browser", "../../object/toQueryString"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SAction_1 = __importDefault(require("../SAction"));
    var browser_1 = __importDefault(require("../../is/browser"));
    var toQueryString_1 = __importDefault(require("../../object/toQueryString"));
    /**
     * @name              SUrlAction
     * @namespace         sugar.js.action.browser
     * @type              Class
     *
     * This class represent an URL action that let you change the user page
     * with multiple settings like if you want the url to be opened in a popup,
     * after a timeout, etc...
     *
     * @todo        Better documentation
     * @todo        tests
     *
     * @param       {Object}        descriptorObj       The action descriptor object
     * - target (_self) {String}: Specify how you want to go to the url. Can be ```_self```, ```_blank``` or ```_popup```
     * - url (null) {String}: Specify the url where you want to send the user
     * - name (null) {String}: Specify the name of the new window. Same as the ```window.open``` name parameter
     * - specs ({}) {Object}: Specify the window specs that you want if your target is ```_blank``` or ```_popup```. Accept all the parameters that the ```window.open``` specs parameter accept in object format
     * - timeout (0) {Number}: Specify a timeout between the time you call the ```run``` method, and the time the user is actually redirected
     * @param       {Object}        [settings={}]       An object of settings to configure your action. See the ```SAction``` class documentation for more info
     *
     * @example       js
     * import SUrlAction from '@coffeekraken/sugar/js/action/browser/SUrlAction';
     * const myAction = new SUrlAction({
     *    url: 'https://google.com',
     *    target: '_popup'
     * });
     * myAction.run();
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var SUrlAction = /** @class */ (function (_super) {
        __extends(SUrlAction, _super);
        /**
         * @name          constructor
         * @type          Function
         * @constructor
         *
         * Constructor
         *
         * @since     2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        function SUrlAction(descriptorObj, settings) {
            if (settings === void 0) { settings = {}; }
            return _super.call(this, descriptorObj, settings) || this;
        }
        /**
         * @name            run
         * @type            Function
         * @override
         *
         * Process to the action execution.
         *
         * @return      {SPromise}      An SPromise instance on which you can subscribe for this particular run execution process events
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SUrlAction.prototype.run = function () {
            var _this = this;
            var promise = _super.prototype.run.call(this);
            if (!browser_1.default())
                throw new Error("SUrlAction: This action is meant to be used in a browser environment which seems to not be the case...");
            setTimeout(function () {
                // switch on the target
                switch (_this._descriptorObj.target) {
                    case '_blank':
                    case '_popup':
                        var specs = _this._descriptorObj.specs || {};
                        var specsString = toQueryString_1.default(specs)
                            .slice(1)
                            .split('&')
                            .join(',');
                        window.open(_this._descriptorObj.url, _this._descriptorObj.name || '_blank', specsString || _this._descriptorObj.target === '_popup'
                            ? 'width=1000,height=1000'
                            : '', _this._descriptorObj.replace || false);
                        break;
                    case '_self':
                    default:
                        document.location = _this._descriptorObj.url;
                        break;
                }
                // complete
                promise.complete();
            }, this._descriptorObj.timeout || 0);
            return promise;
        };
        return SUrlAction;
    }(SAction_1.default));
    exports.default = SUrlAction;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1VybEFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNVcmxBY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHVEQUFtQztJQUNuQyw2REFBMkM7SUFDM0MsNkVBQXlEO0lBRXpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E4Qkc7SUFDSDtRQUF3Qyw4QkFBUztRQUMvQzs7Ozs7Ozs7O1dBU0c7UUFDSCxvQkFBWSxhQUFhLEVBQUUsUUFBYTtZQUFiLHlCQUFBLEVBQUEsYUFBYTttQkFDdEMsa0JBQU0sYUFBYSxFQUFFLFFBQVEsQ0FBQztRQUNoQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCx3QkFBRyxHQUFIO1lBQUEsaUJBc0NDO1lBckNDLElBQU0sT0FBTyxHQUFHLGlCQUFNLEdBQUcsV0FBRSxDQUFDO1lBRTVCLElBQUksQ0FBQyxpQkFBVyxFQUFFO2dCQUNoQixNQUFNLElBQUksS0FBSyxDQUNiLHdHQUF3RyxDQUN6RyxDQUFDO1lBRUosVUFBVSxDQUFDO2dCQUNULHVCQUF1QjtnQkFDdkIsUUFBUSxLQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRTtvQkFDbEMsS0FBSyxRQUFRLENBQUM7b0JBQ2QsS0FBSyxRQUFRO3dCQUNYLElBQU0sS0FBSyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQzt3QkFDOUMsSUFBSSxXQUFXLEdBQUcsdUJBQWUsQ0FBQyxLQUFLLENBQUM7NkJBQ3JDLEtBQUssQ0FBQyxDQUFDLENBQUM7NkJBQ1IsS0FBSyxDQUFDLEdBQUcsQ0FBQzs2QkFDVixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ2IsTUFBTSxDQUFDLElBQUksQ0FDVCxLQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFDdkIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLElBQUksUUFBUSxFQUNwQyxXQUFXLElBQUksS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEtBQUssUUFBUTs0QkFDcEQsQ0FBQyxDQUFDLHdCQUF3Qjs0QkFDMUIsQ0FBQyxDQUFDLEVBQUUsRUFDTixLQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQ3JDLENBQUM7d0JBQ0YsTUFBTTtvQkFDUixLQUFLLE9BQU8sQ0FBQztvQkFDYjt3QkFDRSxRQUFRLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDO3dCQUM1QyxNQUFNO2lCQUNUO2dCQUVELFdBQVc7Z0JBQ1gsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3JCLENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQztZQUVyQyxPQUFPLE9BQU8sQ0FBQztRQUNqQixDQUFDO1FBQ0gsaUJBQUM7SUFBRCxDQUFDLEFBbEVELENBQXdDLGlCQUFTLEdBa0VoRCJ9