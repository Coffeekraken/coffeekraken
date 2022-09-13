"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expandPleasantCssClassname_1 = __importDefault(require("./expandPleasantCssClassname"));
/**
 * @name            expandPleasantCssClassnames
 * @namespace       shared.html
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function allows you to convert "colon" classnames like "s-something:cool @desktop something"
 * to comprehensive classnames for css like "s-something s-something--cool something___desktop", etc...
 *
 * @param     {String}          html          The HTML to process. It can be actually any string values like .vue file, etc...
 * @return    {String}                      The processed string with converted classnames
 *
 * @example         js
 * import { __expandPleasantCssClassnames } from '@coffeekraken/sugar/html';
 * __expandPleasantCssClassnames('...');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __expandPleasantCssClassnames(html) {
    const reg = /class="[a-zA-Z0-9_\-:@\s]+"/gm;
    const matches = html.match(reg);
    if (!matches)
        return html;
    // @ts-ignore
    matches.forEach((match) => {
        const classesStr = match.trim().replace('class="', '').replace('"', '');
        const newClassesStr = (0, expandPleasantCssClassname_1.default)(classesStr);
        html = html.replace(match, `class="${newClassesStr}"`);
    });
    const escapedReg = /class=".*\\:.*/gm;
    const escapedMatches = html.match(escapedReg);
    if (escapedMatches && escapedMatches.length) {
        // @ts-ignore
        escapedMatches.forEach((match) => {
            const newClass = match.replace('\\:', ':');
            html = html.replace(match, newClass);
        });
    }
    return html;
}
exports.default = __expandPleasantCssClassnames;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOEZBQXdFO0FBRXhFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILFNBQXdCLDZCQUE2QixDQUFDLElBQVk7SUFDOUQsTUFBTSxHQUFHLEdBQUcsK0JBQStCLENBQUM7SUFFNUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVoQyxJQUFJLENBQUMsT0FBTztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBRTFCLGFBQWE7SUFDYixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDdEIsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN4RSxNQUFNLGFBQWEsR0FBRyxJQUFBLG9DQUE0QixFQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9ELElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxVQUFVLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDM0QsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLFVBQVUsR0FBRyxrQkFBa0IsQ0FBQztJQUN0QyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRTlDLElBQUksY0FBYyxJQUFJLGNBQWMsQ0FBQyxNQUFNLEVBQUU7UUFDekMsYUFBYTtRQUNiLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM3QixNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMzQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7S0FDTjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUExQkQsZ0RBMEJDIn0=