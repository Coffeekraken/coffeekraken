"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../../shared/object/deepMerge"));
const s_class_1 = __importDefault(require("../@coffeekraken/s-class"));
class STemplateEngine extends s_class_1.default {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RlbXBsYXRlRW5naW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1RlbXBsYXRlRW5naW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUdkLGlGQUEyRDtBQUUzRCx1RUFBZ0Q7QUErRGhELE1BQU0sZUFBZ0IsU0FBUSxpQkFBUTtJQUNwQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXVDO1FBQ2pELEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsY0FBYyxFQUFFLEVBQUU7U0FDbkIsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBRUQsa0JBQWUsZUFBZSxDQUFDIn0=