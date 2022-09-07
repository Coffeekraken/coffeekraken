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
export default function __stylesheetToString(
    // @ts-ignore
    stylesheet: StyleSheet | StyleSheetList,
): string {
    let stack: any[] = [];

    if (!(stylesheet instanceof StyleSheetList)) {
        if (!Array.isArray(stylesheet)) stack.push(stylesheet);
    } else {
        Object.keys(stylesheet).forEach((k) => {
            stack.push(stylesheet[k]);
        });
    }
    let str = ``;
    stack.forEach((style) => {
        str += style.cssRules
            ? Array.from(style.cssRules)
                  .map((rule: any) => rule.cssText ?? '')
                  .join('\n')
            : '';
    });
    return str;
}
