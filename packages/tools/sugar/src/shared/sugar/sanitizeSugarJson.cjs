"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            sanitizeSugarJson
 * @namespace            node.sugar
 * @type            Function
 *
 * This function allows you to sanitize a sugarJson JSON to be sure you'll get
 * the same structure everytime
 *
 * @param       {JSON}          sugarJson           The sugar.json JSON to sanitize
 * @return      {JSON}                              Sanitizes sugarJson
 *
 * @example         js
 * import sanitizeSugarJson from '@coffeekraken/sugar/node/sugar/sanitizeSugarJson';
 * sanitizeSugarJson({
 *      extends: 'something',
 *      // ...
 * }); // => { extends: ['something'], ... }
 *
 * @since       2.0.0
 * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function sanitizeSugarJson(sugarJson) {
    // break reference
    sugarJson = Object.assign({}, sugarJson);
    // extends
    if (!sugarJson.extends)
        sugarJson.extends = [];
    else if (!Array.isArray(sugarJson.extends))
        sugarJson.extends = [sugarJson.extends];
    return sugarJson;
}
exports.default = sanitizeSugarJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FuaXRpemVTdWdhckpzb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvc2hhcmVkL3N1Z2FyL3Nhbml0aXplU3VnYXJKc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsU0FBd0IsaUJBQWlCLENBQUMsU0FBYztJQUN0RCxrQkFBa0I7SUFDbEIsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBRXpDLFVBQVU7SUFDVixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU87UUFBRSxTQUFTLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztTQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQ3hDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFMUMsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQVZELG9DQVVDIn0=