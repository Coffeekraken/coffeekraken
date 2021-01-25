"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const sugar_1 = __importDefault(require("../config/sugar"));
/**
 * @name            classname
 * @namespace       sugar.node.css
 * @type            Function
 * @beta
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
module.exports = classname;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3NuYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2xhc3NuYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7O0FBRWQsNERBQTRDO0FBRTVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxTQUFTO0lBQzFCLE1BQU0sTUFBTSxHQUFHLGVBQWEsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ3hELElBQUksTUFBTTtRQUFFLE9BQU8sR0FBRyxNQUFNLElBQUksU0FBUyxFQUFFLENBQUM7SUFDNUMsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQUNELGlCQUFTLFNBQVMsQ0FBQyJ9