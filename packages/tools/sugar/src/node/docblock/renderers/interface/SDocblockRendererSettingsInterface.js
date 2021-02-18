"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("../../../config/sugar"));
const SInterface_1 = __importDefault(require("../../../interface/SInterface"));
const path_1 = __importDefault(require("path"));
/**
 * @name            SDocblockRendererSettingsInterface
 * @namespace       sugar.node.docblock.renderers.interface
 * @type            Class
 * @extends         SInterface
 * @status          beta
 *
 * Represent the SDocblockRenderer settings
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SDocblockRendererSettingsInterface extends SInterface_1.default {
}
exports.default = SDocblockRendererSettingsInterface;
SDocblockRendererSettingsInterface.definition = {
    scope: {
        type: 'String',
        default: sugar_1.default('docblock.scope')
    },
    rootDir: {
        type: 'String',
        default: `${path_1.default.resolve(__dirname, '..')}`
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrUmVuZGVyZXJTZXR0aW5nc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNEb2NibG9ja1JlbmRlcmVyU2V0dGluZ3NJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrRUFBa0Q7QUFDbEQsK0VBQXlEO0FBQ3pELGdEQUEwQjtBQUUxQjs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQXFCLGtDQUFtQyxTQUFRLG9CQUFZOztBQUE1RSxxREFXQztBQVZRLDZDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsZUFBYSxDQUFDLGdCQUFnQixDQUFDO0tBQ3pDO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsR0FBRyxjQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBRTtLQUM5QztDQUNGLENBQUMifQ==