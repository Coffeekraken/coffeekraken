"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SClass_1 = __importDefault(require("../../class/SClass"));
class STemplateEngine extends SClass_1.default {
    /**
     * @name      constructor
     * @type      Function
     * @constructor
     *
     * Constructor
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings) {
        super(deepMerge_1.default({
            templateEngine: {}
        }, settings));
    }
}
exports.default = STemplateEngine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RlbXBsYXRlRW5naW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25vZGUvdGVtcGxhdGUvZW5naW5lcy9TVGVtcGxhdGVFbmdpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBR2QsdUVBQWlEO0FBRWpELGdFQUEwQztBQStEMUMsTUFBTSxlQUFnQixTQUFRLGdCQUFRO0lBQ3BDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBdUM7UUFDakQsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxjQUFjLEVBQUUsRUFBRTtTQUNuQixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxlQUFlLENBQUMifQ==