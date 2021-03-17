"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../../shared/interface/SInterface"));
/**
 * @name            SSugarAppModuleInterface
 * @namespace       sugar.node.app.sugar.interface
 * @type            Class
 * @extends         SInterface
 *
 * This interface represent the sugar app module instance requirements and defaults
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSugarAppModuleSettingsInterface extends SInterface_1.default {
}
SSugarAppModuleSettingsInterface.definition = {
    mainProcessId: {
        type: 'String',
        required: true,
        default: 'main'
    },
    processIdUsedForState: {
        type: 'String',
        default: undefined
    }
};
class SSugarAppModuleInterface extends SInterface_1.default {
}
exports.default = SSugarAppModuleInterface;
SSugarAppModuleInterface.definition = {
    '_settings.sugarAppModule': {
        interface: SSugarAppModuleSettingsInterface,
        type: 'Object',
        required: true
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwTW9kdWxlSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N1Z2FyQXBwTW9kdWxlSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseUZBQW1FO0FBRW5FOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLGdDQUFpQyxTQUFRLG9CQUFZOztBQUNsRCwyQ0FBVSxHQUFHO0lBQ2xCLGFBQWEsRUFBRTtRQUNiLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsTUFBTTtLQUNoQjtJQUNELHFCQUFxQixFQUFFO1FBQ3JCLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLFNBQVM7S0FDbkI7Q0FDRixDQUFDO0FBR0osTUFBcUIsd0JBQXlCLFNBQVEsb0JBQVk7O0FBQWxFLDJDQVFDO0FBUFEsbUNBQVUsR0FBRztJQUNsQiwwQkFBMEIsRUFBRTtRQUMxQixTQUFTLEVBQUUsZ0NBQWdDO1FBQzNDLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUMifQ==