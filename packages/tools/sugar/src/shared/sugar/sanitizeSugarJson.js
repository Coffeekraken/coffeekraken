/**
 * @name            sanitizeSugarJson
 * @namespace            node.sugar
 * @type            Function
 * @platform          js
 * @platform          ts
 * @platform          node
 * @status        beta
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
export default function sanitizeSugarJson(sugarJson) {
    // break reference
    sugarJson = Object.assign({}, sugarJson);
    // extends
    if (!sugarJson.extends)
        sugarJson.extends = [];
    else if (!Array.isArray(sugarJson.extends))
        sugarJson.extends = [sugarJson.extends];
    return sugarJson;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FuaXRpemVTdWdhckpzb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYW5pdGl6ZVN1Z2FySnNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxpQkFBaUIsQ0FBQyxTQUFjO0lBQ3RELGtCQUFrQjtJQUNsQixTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFFekMsVUFBVTtJQUNWLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTztRQUFFLFNBQVMsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1NBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7UUFDeEMsU0FBUyxDQUFDLE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUUxQyxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDIn0=