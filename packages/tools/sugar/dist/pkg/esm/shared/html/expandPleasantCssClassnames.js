import __expandPleasantCssClassname from './expandPleasantCssClassname.js';
/**
 * @name            expandPleasantCssClassnames
 * @namespace       shared.html
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function allows you to convert "colon" classnames like "s-something:cool @desktop something"
 * to comprehensive classnames for css like "s-something s-something-cool something_desktop", etc...
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sNEJBQTRCLE1BQU0saUNBQWlDLENBQUM7QUFFM0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxVQUFVLDZCQUE2QixDQUFDLElBQVk7SUFDOUQsSUFBSSxHQUFHLEdBQUcsK0JBQStCLEVBQ3JDLGFBQWEsR0FBRyxJQUFJLENBQUM7SUFDekIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLEVBQUU7UUFDbEQsR0FBRyxHQUFHLGdDQUFnQyxDQUFDO0tBQzFDO1NBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLEVBQUU7UUFDbkQsR0FBRyxHQUFHLHVCQUF1QixDQUFDO1FBQzlCLGFBQWEsR0FBRyxLQUFLLENBQUM7S0FDekI7SUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWhDLElBQUksQ0FBQyxPQUFPO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFFMUIsYUFBYTtJQUNiLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUN0QixNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM5QyxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sYUFBYSxHQUFHLDRCQUE0QixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRS9ELElBQUksYUFBYSxFQUFFO1lBQ2YsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQ2YsS0FBSyxFQUNMLFVBQVUsYUFBYSxDQUFDLElBQUksRUFBRSxHQUFHLFFBQVEsRUFBRSxDQUM5QyxDQUFDO1NBQ0w7YUFBTTtZQUNILElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQ3JFO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLFVBQVUsR0FBRyxrQkFBa0IsQ0FBQztJQUN0QyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRTlDLElBQUksY0FBYyxJQUFJLGNBQWMsQ0FBQyxNQUFNLEVBQUU7UUFDekMsYUFBYTtRQUNiLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM3QixNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMzQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7S0FDTjtJQUVELE9BQU8sV0FBVyxHQUFHLElBQUksQ0FBQztBQUM5QixDQUFDIn0=