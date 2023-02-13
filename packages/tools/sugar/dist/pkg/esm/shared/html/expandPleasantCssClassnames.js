import __expandPleasantCssClassname from './expandPleasantCssClassname';
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
export default function __expandPleasantCssClassnames(html) {
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
        const newClassesStr = __expandPleasantCssClassname(classesStr);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sNEJBQTRCLE1BQU0sOEJBQThCLENBQUM7QUFFeEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsTUFBTSxDQUFDLE9BQU8sVUFBVSw2QkFBNkIsQ0FBQyxJQUFZO0lBQzlELElBQUksR0FBRyxHQUFHLCtCQUErQixFQUNyQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxFQUFFO1FBQ2xELEdBQUcsR0FBRyxnQ0FBZ0MsQ0FBQztLQUMxQztTQUFNLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFO1FBQ25ELEdBQUcsR0FBRyx1QkFBdUIsQ0FBQztRQUM5QixhQUFhLEdBQUcsS0FBSyxDQUFDO0tBQ3pCO0lBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVoQyxJQUFJLENBQUMsT0FBTztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBRTFCLGFBQWE7SUFDYixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDdEIsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDOUMsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN4RSxNQUFNLGFBQWEsR0FBRyw0QkFBNEIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUUvRCxJQUFJLGFBQWEsRUFBRTtZQUNmLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUNmLEtBQUssRUFDTCxVQUFVLGFBQWEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxRQUFRLEVBQUUsQ0FDOUMsQ0FBQztTQUNMO2FBQU07WUFDSCxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFLEdBQUcsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUNyRTtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxVQUFVLEdBQUcsa0JBQWtCLENBQUM7SUFDdEMsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUU5QyxJQUFJLGNBQWMsSUFBSSxjQUFjLENBQUMsTUFBTSxFQUFFO1FBQ3pDLGFBQWE7UUFDYixjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDN0IsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDM0MsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0tBQ047SUFFRCxPQUFPLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFDOUIsQ0FBQyJ9