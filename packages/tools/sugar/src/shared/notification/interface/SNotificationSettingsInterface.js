var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../config/sugar", "@coffeekraken/s-interface"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const sugar_1 = __importDefault(require("../../config/sugar"));
    const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
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
    class SNotificationSettingsInterface extends s_interface_1.default {
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
    exports.default = SNotificationSettingsInterface;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05vdGlmaWNhdGlvblNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU05vdGlmaWNhdGlvblNldHRpbmdzSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsK0RBQStDO0lBQy9DLDRFQUFxRDtJQUVyRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsTUFBTSw4QkFBK0IsU0FBUSxxQkFBWTs7SUFDaEQseUNBQVUsR0FBRztRQUNsQixRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsZUFBZTtZQUNyQixRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxlQUFhLENBQUMsdUJBQXVCLENBQUM7U0FDaEQ7UUFDRCxnQkFBZ0IsRUFBRTtZQUNoQixJQUFJLEVBQUUsUUFBUTtZQUNkLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFLGVBQWEsQ0FBQywrQkFBK0IsQ0FBQztTQUN4RDtRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxTQUFTO1lBQ2YsUUFBUSxFQUFFLElBQUk7WUFDZCxPQUFPLEVBQUUsZUFBYSxDQUFDLHFCQUFxQixDQUFDO1NBQzlDO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLFFBQVE7WUFDZCxRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxlQUFhLENBQUMsb0JBQW9CLENBQUM7U0FDN0M7S0FDRixDQUFDO0lBRUosa0JBQWUsOEJBQThCLENBQUMifQ==