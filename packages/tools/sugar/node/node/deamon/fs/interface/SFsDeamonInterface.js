"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../class/SInterface"));
const SDeamonInterface_1 = __importDefault(require("../../interface/SDeamonInterface"));
/**
 * @name                SFsDeamonInterface
 * @namespace           sugar.node.deamon.fs.interface
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an element that is capable of "watching" some events/actions, and respond
 * to it by launching function, or whatever you want.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFsDeamonInterface extends SInterface_1.default {
}
exports.default = SFsDeamonInterface;
SFsDeamonInterface.implementsArray = [SDeamonInterface_1.default];
SFsDeamonInterface.definition = {
    watch: {
        type: 'String',
        alias: 'i',
        description: 'Specify what to watch using a glob pattern',
        required: true,
        level: 1
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZzRGVhbW9uSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL25vZGUvZGVhbW9uL2ZzL2ludGVyZmFjZS9TRnNEZWFtb25JbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsMkVBQXFEO0FBQ3JELHdGQUFrRTtBQUVsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFxQixrQkFBbUIsU0FBUSxvQkFBWTs7QUFBNUQscUNBWUM7QUFYUSxrQ0FBZSxHQUFHLENBQUMsMEJBQWtCLENBQUMsQ0FBQztBQUV2Qyw2QkFBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQUUsNENBQTRDO1FBQ3pELFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLENBQUM7S0FDVDtDQUNGLENBQUMifQ==