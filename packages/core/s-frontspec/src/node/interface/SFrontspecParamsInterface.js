"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SFrontspecParamsInterface
 * @namespace           node.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed to build the docMap.json file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFrontspecParamsInterface extends s_interface_1.default {
}
SFrontspecParamsInterface.definition = {
    cache: {
        type: 'Boolean',
        default: s_sugar_config_1.default('frontspec.cache')
    },
    env: {
        type: 'String',
        default: s_sugar_config_1.default('env.env')
    },
    clearCache: {
        type: 'Boolean',
        default: false
    }
};
exports.default = SFrontspecParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3BlY1BhcmFtc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNGcm9udHNwZWNQYXJhbXNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsa0ZBQXlEO0FBQ3pELDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0seUJBQTBCLFNBQVEscUJBQVk7O0FBQzNDLG9DQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsd0JBQWEsQ0FBQyxpQkFBaUIsQ0FBQztLQUMxQztJQUNELEdBQUcsRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLHdCQUFhLENBQUMsU0FBUyxDQUFDO0tBQ2xDO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztLQUNmO0NBQ0YsQ0FBQztBQUVKLGtCQUFlLHlCQUF5QixDQUFDIn0=