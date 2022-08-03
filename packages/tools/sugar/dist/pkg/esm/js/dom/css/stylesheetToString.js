/**
 * @name            stylesheetToString
 * @namespace       js.css
 * @type             Function
 * @platform          js
 * @status           stable
 *
 * This function take a StyleSheet instance and convert it to a simple string
 *
 * @todo        check online doc
 * @todo        tests
 *
 * @param       {StyleSheet|StyleSheet[]}        stalesheet      The StyleSheet instance to convert
 * @return      {String}                            The css string
 *
 * @example         js
 * import stylesheetToString from '@coffeekraken/sugar/js/dom/css/stylesheetToString';
 * stylesheetToString(document.stylesheets); // => body { ... }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGtCQUFrQjtBQUN0QyxhQUFhO0FBQ2IsVUFBdUM7SUFFdkMsSUFBSSxLQUFLLEdBQVUsRUFBRSxDQUFDO0lBRXRCLElBQUksQ0FBQyxDQUFDLFVBQVUsWUFBWSxjQUFjLENBQUMsRUFBRTtRQUN6QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7WUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzFEO1NBQU07UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2xDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7S0FDTjtJQUNELElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNiLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNwQixHQUFHLElBQUksS0FBSyxDQUFDLFFBQVE7WUFDakIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztpQkFDckIsR0FBRyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUUsV0FBQyxPQUFBLE1BQUEsSUFBSSxDQUFDLE9BQU8sbUNBQUksRUFBRSxDQUFBLEVBQUEsQ0FBQztpQkFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNqQixDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2IsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUMifQ==