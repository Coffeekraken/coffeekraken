"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expandPleasantCssClassname_js_1 = __importDefault(require("./expandPleasantCssClassname.js"));
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
 * @snippet         __expandPleasantCssClassnames($1)
 *
 * @example         js
 * import { __expandPleasantCssClassnames } from '@coffeekraken/sugar/html';
 * __expandPleasantCssClassnames('...');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __expandPleasantCssClassnames(html) {
    let reg = /class="[a-zA-Z0-9_\-:@\s]+"/gm, needClassAttr = true;
    if (html.trim().match(/class="[a-zA-Z0-9_\-:@\s]+$/)) {
        reg = /class="[a-zA-Z0-9_\-:@\s]+"?/gm;
    }
    else if (html.trim().match(/^[a-zA-Z0-9_\-:@\s]+$/)) {
        reg = /[a-zA-Z0-9_\-:@\s]+/gm;
        needClassAttr = false;
    }
    const matches = html.match(reg);
    if (!matches)
        return html;
    // @ts-ignore
    matches.forEach((match) => {
        const endQuote = match.match(/"$/) ? '"' : '';
        const classesStr = match.trim().replace('class="', '').replace('"', '');
        const newClassesStr = (0, expandPleasantCssClassname_js_1.default)(classesStr);
        if (needClassAttr) {
            html = html.replace(match, `class="${newClassesStr.trim()}${endQuote}`);
        }
        else {
            html = html.replace(match, ` ${newClassesStr.trim()}${endQuote}`);
        }
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
    return 'expanded ' + html;
}
exports.default = __expandPleasantCssClassnames;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0dBQTJFO0FBRTNFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUgsU0FBd0IsNkJBQTZCLENBQUMsSUFBWTtJQUM5RCxJQUFJLEdBQUcsR0FBRywrQkFBK0IsRUFDckMsYUFBYSxHQUFHLElBQUksQ0FBQztJQUN6QixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsRUFBRTtRQUNsRCxHQUFHLEdBQUcsZ0NBQWdDLENBQUM7S0FDMUM7U0FBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsRUFBRTtRQUNuRCxHQUFHLEdBQUcsdUJBQXVCLENBQUM7UUFDOUIsYUFBYSxHQUFHLEtBQUssQ0FBQztLQUN6QjtJQUVELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFaEMsSUFBSSxDQUFDLE9BQU87UUFBRSxPQUFPLElBQUksQ0FBQztJQUUxQixhQUFhO0lBQ2IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ3RCLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzlDLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDeEUsTUFBTSxhQUFhLEdBQUcsSUFBQSx1Q0FBNEIsRUFBQyxVQUFVLENBQUMsQ0FBQztRQUUvRCxJQUFJLGFBQWEsRUFBRTtZQUNmLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUNmLEtBQUssRUFDTCxVQUFVLGFBQWEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxRQUFRLEVBQUUsQ0FDOUMsQ0FBQztTQUNMO2FBQU07WUFDSCxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFLEdBQUcsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUNyRTtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxVQUFVLEdBQUcsa0JBQWtCLENBQUM7SUFDdEMsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUU5QyxJQUFJLGNBQWMsSUFBSSxjQUFjLENBQUMsTUFBTSxFQUFFO1FBQ3pDLGFBQWE7UUFDYixjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDN0IsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDM0MsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0tBQ047SUFFRCxPQUFPLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFDOUIsQ0FBQztBQTFDRCxnREEwQ0MifQ==