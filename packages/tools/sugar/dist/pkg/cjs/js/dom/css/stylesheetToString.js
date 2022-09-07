"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            stylesheetToString
 * @namespace       js.css
 * @type             Function
 * @platform          js
 * @status           stable
 *
 * This function take a StyleSheet instance and convert it to a simple string
 *
 * @todo        tests
 *
 * @param       {StyleSheet|StyleSheetList}        stalesheet      The StyleSheet instance to convert
 * @return      {String}                            The css string
 *
 * @example         js
 * import { __stylesheetToString } from '@coffeekraken/sugar/dom';
 * __stylesheetToString(document.stylesheets); // => body { ... }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __stylesheetToString(
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
exports.default = __stylesheetToString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsU0FBd0Isb0JBQW9CO0FBQ3hDLGFBQWE7QUFDYixVQUF1QztJQUV2QyxJQUFJLEtBQUssR0FBVSxFQUFFLENBQUM7SUFFdEIsSUFBSSxDQUFDLENBQUMsVUFBVSxZQUFZLGNBQWMsQ0FBQyxFQUFFO1FBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztZQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDMUQ7U0FBTTtRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztLQUNOO0lBQ0QsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ3BCLEdBQUcsSUFBSSxLQUFLLENBQUMsUUFBUTtZQUNqQixDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO2lCQUNyQixHQUFHLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRSxXQUFDLE9BQUEsTUFBQSxJQUFJLENBQUMsT0FBTyxtQ0FBSSxFQUFFLENBQUEsRUFBQSxDQUFDO2lCQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDYixDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQXRCRCx1Q0FzQkMifQ==