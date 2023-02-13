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
        const newClassesStr = (0, expandPleasantCssClassname_1.default)(classesStr);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOEZBQXdFO0FBRXhFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILFNBQXdCLDZCQUE2QixDQUFDLElBQVk7SUFDOUQsSUFBSSxHQUFHLEdBQUcsK0JBQStCLEVBQ3JDLGFBQWEsR0FBRyxJQUFJLENBQUM7SUFDekIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLEVBQUU7UUFDbEQsR0FBRyxHQUFHLGdDQUFnQyxDQUFDO0tBQzFDO1NBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLEVBQUU7UUFDbkQsR0FBRyxHQUFHLHVCQUF1QixDQUFDO1FBQzlCLGFBQWEsR0FBRyxLQUFLLENBQUM7S0FDekI7SUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWhDLElBQUksQ0FBQyxPQUFPO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFFMUIsYUFBYTtJQUNiLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUN0QixNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM5QyxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sYUFBYSxHQUFHLElBQUEsb0NBQTRCLEVBQUMsVUFBVSxDQUFDLENBQUM7UUFFL0QsSUFBSSxhQUFhLEVBQUU7WUFDZixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FDZixLQUFLLEVBQ0wsVUFBVSxhQUFhLENBQUMsSUFBSSxFQUFFLEdBQUcsUUFBUSxFQUFFLENBQzlDLENBQUM7U0FDTDthQUFNO1lBQ0gsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksYUFBYSxDQUFDLElBQUksRUFBRSxHQUFHLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDckU7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sVUFBVSxHQUFHLGtCQUFrQixDQUFDO0lBQ3RDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFOUMsSUFBSSxjQUFjLElBQUksY0FBYyxDQUFDLE1BQU0sRUFBRTtRQUN6QyxhQUFhO1FBQ2IsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzdCLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzNDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztLQUNOO0lBRUQsT0FBTyxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQzlCLENBQUM7QUExQ0QsZ0RBMENDIn0=