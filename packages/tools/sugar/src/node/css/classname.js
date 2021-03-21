"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("../../shared/config/sugar"));
/**
 * @name            classname
 * @namespace       sugar.node.css
 * @type            Function
 * @status              beta
 *
 * This function take a classname you want to generate and returns you the prefixed (if prefix exists in config.classes) classname
 *
 * @param       {String}            classname               The classname to generate
 * @return      {String}                                    The correctly preffixed classname
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import classname from '@coffeekraken/sugar/node/css/classname';
 * classname('coco'); // => s-coco
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function classname(classname) {
    const prefix = sugar_1.default('classes.generate.prefix');
    if (prefix)
        return `${prefix}-${classname}`;
    return classname;
}
exports.default = classname;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3NuYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2xhc3NuYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHNFQUFzRDtBQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsU0FBUyxTQUFTLENBQUMsU0FBUztJQUMxQixNQUFNLE1BQU0sR0FBRyxlQUFhLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUN4RCxJQUFJLE1BQU07UUFBRSxPQUFPLEdBQUcsTUFBTSxJQUFJLFNBQVMsRUFBRSxDQUFDO0lBQzVDLE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFDRCxrQkFBZSxTQUFTLENBQUMifQ==