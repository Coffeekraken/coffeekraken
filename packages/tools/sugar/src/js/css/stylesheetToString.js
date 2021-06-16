/**
 * @name            stylesheetToString
 * @namespace       js.css
 * @type             Function
 * @platform        js
 * @status           stable
 *
 * This function take a StyleSheet instance and convert it to a simple string
 *
 * @todo        check online doc
 * @todo        tests
 *
 * @param       {StyleSheet|StyleSheet[]}        stalesheet      The StyleSheet instance to convert
 * @return      {String}                            The css string
 *
 * @example         js
 * import stylesheetToString from '@coffeekraken/sugar/js/css/stylesheetToString';
 * stylesheetToString(document.stylesheets); // => body { ... }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function stylesheetToString(
// @ts-ignore
stylesheet) {
    let stack = [];
    if (!(stylesheet instanceof StyleSheetList)) {
        if (!Array.isArray(stylesheet))
            stack.push(stylesheet);
    }
    else {
        Object.keys(stylesheet).forEach((k) => {
            stack.push(stylesheet[k]);
        });
    }
    let str = ``;
    stack.forEach((style) => {
        str += style.cssRules
            ? Array.from(style.cssRules)
                .map((rule) => { var _a; return (_a = rule.cssText) !== null && _a !== void 0 ? _a : ''; })
                .join('\n')
            : '';
    });
    return str;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVzaGVldFRvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3R5bGVzaGVldFRvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGtCQUFrQjtBQUN4QyxhQUFhO0FBQ2IsVUFBdUM7SUFFdkMsSUFBSSxLQUFLLEdBQVUsRUFBRSxDQUFDO0lBRXRCLElBQUksQ0FBQyxDQUFDLFVBQVUsWUFBWSxjQUFjLENBQUMsRUFBRTtRQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7WUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3hEO1NBQU07UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3BDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUNELElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNiLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUN0QixHQUFHLElBQUksS0FBSyxDQUFDLFFBQVE7WUFDbkIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztpQkFDdkIsR0FBRyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUUsV0FBQyxPQUFBLE1BQUEsSUFBSSxDQUFDLE9BQU8sbUNBQUksRUFBRSxDQUFBLEVBQUEsQ0FBQztpQkFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNmLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyJ9