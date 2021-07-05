import __expandPleasantCssClassname from "./expandPleasantCssClassname";

/**
 * @name            expandPleasantCssClassnames
 * @namespace       shared.html
 * @type            Function
 * @platform        js
 * @platform        node
 * @platform        ts
 * @status          beta
 * 
 * This function allows you to convert "colon" classnames like "s-something:cool @desktop something"
 * to comprehensive classnames for css like "s-something s-something--cool something___desktop", etc...
 * 
 * @param     {String}          html          The HTML to process. It can be actually any string values like .vue file, etc...
 * @return    {String}                      The processed string with converted classnames
 * 
 * @example         js
 * import expandPleasantCssClassnames from '@coffeekraken/sugar/shared/html/expandPleasantCssClassnames';
 * expandPleasantCssClassnames('...');
 * 
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function expandPleasantCssClassnames(html:string): string {

    const reg = /class="[a-zA-Z0-9_\-:@\s]+"/gm;

    const matches = html.match(reg);

    if (!matches) return html;

    // @ts-ignore
    matches.forEach(match => {
      const classesStr = match.trim().replace('class="', '').replace('"', '');
      const newClassesStr = __expandPleasantCssClassname(classesStr);
      html = html.replace(match, `class="${newClassesStr}"`);

    });

    const escapedReg = /class=".*\\:.*/gm;
    const escapedMatches = html.match(escapedReg);

    if (escapedMatches && escapedMatches.length) {
      // @ts-ignore
      escapedMatches.forEach(match => {
        const newClass = match.replace('\\:', ':');
        html = html.replace(match, newClass);
      });
    }

    return html;

}

