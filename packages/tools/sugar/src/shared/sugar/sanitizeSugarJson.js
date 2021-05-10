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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FuaXRpemVTdWdhckpzb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYW5pdGl6ZVN1Z2FySnNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGlCQUFpQixDQUFDLFNBQWM7SUFDdEQsa0JBQWtCO0lBQ2xCLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUV6QyxVQUFVO0lBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPO1FBQUUsU0FBUyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7U0FDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztRQUN4QyxTQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTFDLE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMifQ==