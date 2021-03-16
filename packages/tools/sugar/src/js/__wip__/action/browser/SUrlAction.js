// @ts-nocheck
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1VybEFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNVcmxBY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsdURBQW1DO0lBQ25DLDZEQUEyQztJQUMzQyw2RUFBeUQ7SUFFekQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQThCRztJQUNIO1FBQXdDLDhCQUFTO1FBQy9DOzs7Ozs7Ozs7V0FTRztRQUNILG9CQUFZLGFBQWEsRUFBRSxRQUFhO1lBQWIseUJBQUEsRUFBQSxhQUFhO21CQUN0QyxrQkFBTSxhQUFhLEVBQUUsUUFBUSxDQUFDO1FBQ2hDLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7V0FXRztRQUNILHdCQUFHLEdBQUg7WUFBQSxpQkFzQ0M7WUFyQ0MsSUFBTSxPQUFPLEdBQUcsaUJBQU0sR0FBRyxXQUFFLENBQUM7WUFFNUIsSUFBSSxDQUFDLGlCQUFXLEVBQUU7Z0JBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQ2Isd0dBQXdHLENBQ3pHLENBQUM7WUFFSixVQUFVLENBQUM7Z0JBQ1QsdUJBQXVCO2dCQUN2QixRQUFRLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFO29CQUNsQyxLQUFLLFFBQVEsQ0FBQztvQkFDZCxLQUFLLFFBQVE7d0JBQ1gsSUFBTSxLQUFLLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO3dCQUM5QyxJQUFJLFdBQVcsR0FBRyx1QkFBZSxDQUFDLEtBQUssQ0FBQzs2QkFDckMsS0FBSyxDQUFDLENBQUMsQ0FBQzs2QkFDUixLQUFLLENBQUMsR0FBRyxDQUFDOzZCQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDYixNQUFNLENBQUMsSUFBSSxDQUNULEtBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUN2QixLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksSUFBSSxRQUFRLEVBQ3BDLFdBQVcsSUFBSSxLQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sS0FBSyxRQUFROzRCQUNwRCxDQUFDLENBQUMsd0JBQXdCOzRCQUMxQixDQUFDLENBQUMsRUFBRSxFQUNOLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FDckMsQ0FBQzt3QkFDRixNQUFNO29CQUNSLEtBQUssT0FBTyxDQUFDO29CQUNiO3dCQUNFLFFBQVEsQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7d0JBQzVDLE1BQU07aUJBQ1Q7Z0JBRUQsV0FBVztnQkFDWCxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDckIsQ0FBQyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBRXJDLE9BQU8sT0FBTyxDQUFDO1FBQ2pCLENBQUM7UUFDSCxpQkFBQztJQUFELENBQUMsQUFsRUQsQ0FBd0MsaUJBQVMsR0FrRWhEIn0=