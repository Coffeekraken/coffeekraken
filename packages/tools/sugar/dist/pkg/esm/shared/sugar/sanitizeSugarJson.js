/**
 * @name            sanitizeSugarJson
 * @namespace            node.sugar
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function allows you to sanitize a sugarJson JSON to be sure you'll get
 * the same structure everytime
 *
 * @param       {JSON}          sugarJson           The sugar.json JSON to sanitize
 * @return      {JSON}                              Sanitizes sugarJson
 *
 * @example         js
 * import sanitizeSugarJson from '@coffeekraken/sugar/node/sugar/sanitizeSugarJson';
 * sanitizeSugarJson({
 *      extends: 'something',
 *      // ...
 * }); // => { extends: ['something'], ... }
 *
 * @since       2.0.0
 * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsaUJBQWlCLENBQUMsU0FBYztJQUNwRCxrQkFBa0I7SUFDbEIsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBRXpDLFVBQVU7SUFDVixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU87UUFBRSxTQUFTLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztTQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQ3RDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFNUMsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQyJ9