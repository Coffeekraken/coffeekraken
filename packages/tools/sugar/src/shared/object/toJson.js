"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMap_1 = __importDefault(require("./deepMap"));
const set_1 = __importDefault(require("./set"));
/**
 * @name                toJson
 * @namespace           sugar.shared.object
 * @type                Function
 *
 * Convert class instances to plain JSON object
 *
 * @param       {Any}           object      The object to convert
 * @return      {Any}                       The converted object
 *
 * @example         js
 * import toJson from '@coffeekraken/sugar/shared/object/toJson';
 * class MyClass {
 *      hello = 'world';
 *      something() {}
 * }
 * toJson(new MyClass()); // => { hello: 'world' }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function toJson(object) {
    const newObj = {};
    deepMap_1.default(object, ({ value, path }) => {
        set_1.default(newObj, path, value);
        return value;
    }, {
        privateProps: false,
        classInstances: true
    });
    return newObj;
}
exports.default = toJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9Kc29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidG9Kc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQWtDO0FBQ2xDLGdEQUEwQjtBQUUxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxTQUF3QixNQUFNLENBQUMsTUFBVztJQUN4QyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDbEIsaUJBQVMsQ0FDUCxNQUFNLEVBQ04sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ2xCLGFBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNCLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQyxFQUNEO1FBQ0UsWUFBWSxFQUFFLEtBQUs7UUFDbkIsY0FBYyxFQUFFLElBQUk7S0FDckIsQ0FDRixDQUFDO0lBQ0YsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQWRELHlCQWNDIn0=