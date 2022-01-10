import __expandPleasantCssClassname from './expandPleasantCssClassname';

/**
 * @name            extractCssClassesNames
 * @namespace       shared.html
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function allows you to extract all the classes names from a passed html string.
 * You can use it with other things than html but depending on the complexity of your string, it may not
 * work as expected...
 *
 * @param     {String}          html          The HTML to process.
 * @return    {String[]}                      The finded css classes names
 *
 * @setting         {Boolean}       [expandPleasantCssClassname=true]       Specify if you want to expand the pleasant css classes names like "s-typo:p" to "s-typo--p"
 * 
 * @example         js
 * import extractCssClassesNames from '@coffeekraken/sugar/shared/html/extractCssClassesNames';
 * extractCssClassesNames('...');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IExtractCssClassesNamesSettings {
    expandPleasantCssClassname?: boolean;
    includeIds?: boolean;
}

export default function extractCssClassesNames(html: string, settings?: Partial<IExtractCssClassesNamesSettings>): string[] {
    const finalSettings: IExtractCssClassesNamesSettings = {
        expandPleasantCssClassname: true,
        includeIds: false,
        ...settings ?? {}
    }

    let reg = /class="[a-zA-Z0-9_\-:@\s]+"/gm;
    if (finalSettings.includeIds) {
        reg = /(class|id)="[a-zA-Z0-9_\-:@\s]+"/gm;
    }

    const matches = html.match(reg);
    if (!matches) return [];

    let classesNames: string[] = [];

    // @ts-ignore
    matches.forEach((match) => {
        let classesStr = match.trim().replace('class="', '').replace('id="', '').replace('"', '');

        if (settings?.expandPleasantCssClassname) {
            classesStr = __expandPleasantCssClassname(classesStr);
        }

        classesNames = [...classesNames, ...classesStr.split(' ')].map(l => l.trim());


    });

    return classesNames;
}
