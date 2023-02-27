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
 * @snippet         __expandPleasantCssClassnames($1)
 * 
 * @example         js
 * import { __expandPleasantCssClassnames } from '@coffeekraken/sugar/html';
 * __expandPleasantCssClassnames('...');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function __expandPleasantCssClassnames(html: string): string {
    let reg = /class="[a-zA-Z0-9_\-:@\s]+"/gm,
        needClassAttr = true;
    if (html.trim().match(/class="[a-zA-Z0-9_\-:@\s]+$/)) {
        reg = /class="[a-zA-Z0-9_\-:@\s]+"?/gm;
    } else if (html.trim().match(/^[a-zA-Z0-9_\-:@\s]+$/)) {
        reg = /[a-zA-Z0-9_\-:@\s]+/gm;
        needClassAttr = false;
    }

    const matches = html.match(reg);

    if (!matches) return html;

    // @ts-ignore
    matches.forEach((match) => {
        const endQuote = match.match(/"$/) ? '"' : '';
        const classesStr = match.trim().replace('class="', '').replace('"', '');
        const newClassesStr = __expandPleasantCssClassname(classesStr);

        if (needClassAttr) {
            html = html.replace(
                match,
                `class="${newClassesStr.trim()}${endQuote}`,
            );
        } else {
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
