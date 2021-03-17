// @shared
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
        define(["require", "exports", "../../../node/config/sugar", "../../interface/_SInterface"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var sugar_1 = __importDefault(require("../../../node/config/sugar"));
    var _SInterface_1 = __importDefault(require("../../interface/_SInterface"));
    /**
     * @name            SNotificationSettingsInterface
     * @namespace       sugar.js.notification.interface
     * @type            Class
     * @extends         SInterface
     *
     * Interface that describe the settings object you can pass to the SNofication constructor
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var SNotificationSettingsInterface = /** @class */ (function (_super) {
        __extends(SNotificationSettingsInterface, _super);
        function SNotificationSettingsInterface() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SNotificationSettingsInterface.definition = {
            adapters: {
                type: 'Array<String>',
                required: true,
                default: sugar_1.default('notification.adapters')
            },
            adaptersSettings: {
                type: 'Object',
                required: true,
                default: sugar_1.default('notification.adaptersSettings')
            },
            enable: {
                type: 'Boolean',
                required: true,
                default: sugar_1.default('notification.enable')
            },
            types: {
                type: 'Object',
                required: true,
                default: sugar_1.default('notification.types')
            }
        };
        return SNotificationSettingsInterface;
    }(_SInterface_1.default));
    exports.default = SNotificationSettingsInterface;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05vdGlmaWNhdGlvblNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc2hhcmVkL25vdGlmaWNhdGlvbi9pbnRlcmZhY2UvU05vdGlmaWNhdGlvblNldHRpbmdzSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVWLHFFQUF1RDtJQUN2RCw0RUFBdUQ7SUFFdkQ7Ozs7Ozs7Ozs7T0FVRztJQUNIO1FBQTZDLGtEQUFZO1FBQXpEOztRQXVCQSxDQUFDO1FBdEJRLHlDQUFVLEdBQUc7WUFDbEIsUUFBUSxFQUFFO2dCQUNSLElBQUksRUFBRSxlQUFlO2dCQUNyQixRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsZUFBYSxDQUFDLHVCQUF1QixDQUFDO2FBQ2hEO1lBQ0QsZ0JBQWdCLEVBQUU7Z0JBQ2hCLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxlQUFhLENBQUMsK0JBQStCLENBQUM7YUFDeEQ7WUFDRCxNQUFNLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLGVBQWEsQ0FBQyxxQkFBcUIsQ0FBQzthQUM5QztZQUNELEtBQUssRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsZUFBYSxDQUFDLG9CQUFvQixDQUFDO2FBQzdDO1NBQ0YsQ0FBQztRQUNKLHFDQUFDO0tBQUEsQUF2QkQsQ0FBNkMscUJBQVksR0F1QnhEO0lBQ0Qsa0JBQWUsOEJBQThCLENBQUMifQ==