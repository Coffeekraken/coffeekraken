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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05vdGlmaWNhdGlvblNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NoYXJlZC9ub3RpZmljYXRpb24vaW50ZXJmYWNlL1NOb3RpZmljYXRpb25TZXR0aW5nc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFVixxRUFBdUQ7SUFDdkQsNEVBQXVEO0lBRXZEOzs7Ozs7Ozs7O09BVUc7SUFDSDtRQUE2QyxrREFBWTtRQUF6RDs7UUF1QkEsQ0FBQztRQXRCUSx5Q0FBVSxHQUFHO1lBQ2xCLFFBQVEsRUFBRTtnQkFDUixJQUFJLEVBQUUsZUFBZTtnQkFDckIsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLGVBQWEsQ0FBQyx1QkFBdUIsQ0FBQzthQUNoRDtZQUNELGdCQUFnQixFQUFFO2dCQUNoQixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsZUFBYSxDQUFDLCtCQUErQixDQUFDO2FBQ3hEO1lBQ0QsTUFBTSxFQUFFO2dCQUNOLElBQUksRUFBRSxTQUFTO2dCQUNmLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxlQUFhLENBQUMscUJBQXFCLENBQUM7YUFDOUM7WUFDRCxLQUFLLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLGVBQWEsQ0FBQyxvQkFBb0IsQ0FBQzthQUM3QztTQUNGLENBQUM7UUFDSixxQ0FBQztLQUFBLEFBdkJELENBQTZDLHFCQUFZLEdBdUJ4RDtJQUNELGtCQUFlLDhCQUE4QixDQUFDIn0=