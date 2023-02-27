/**
 * @name      getCssRulesFromStylesheet
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @status          wip
 *
 * Get all the CSSRules of the passed stylesheet
 *
 * @param       {CSSStyleSheet}     stylesheet      The stylesheet from which to get the CSSRules
 * @param   {Boolean}               [recursive=true]            Specify if you want to get rules from imported css or not
 * @return          {CSSRule[]}             Array of CSSRules
 *
 * @todo      refactore
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __getCssRulesFromStylesheet($1)
 *
 * @example  	js
 * import { __getCssRulesFromStylesheet } from '@coffeekraken/sugar/dom';
 * __getCssRulesFromStylesheet(myStylesheet);
 *
 * @see             https://github.com/marionebl/jogwheel/blob/master/source/library/get-css-rules.js
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __getCssRulesFromStylesheet(
    styleSheet: StyleSheet,
    recursive = true,
) {
    try {
        let rules = [];

        function getRules(sheet: StyleSheet) {
            let isAccessible = true;
            // make a try catch cause external stylesheets cannot be accessed
            try {
                // @ts-ignore
                rules = [...rules, ...[].slice.call(sheet.cssRules || [])];
            } catch (e) {
                isAccessible = false;
            }

            if (!recursive || !isAccessible) return;
            // @ts-ignore
            [].slice.call(sheet.cssRules || []).forEach((rule) => {
                // @ts-ignore
                // console.log(rule);
                if (rule.href && rule.href.match(/\.css$/)) {
                    // @ts-ignore
                    getRules(rule.styleSheet);
                }
            });
        }
        getRules(styleSheet);

        // @ts-ignore
        return rules;
    } catch (err) {
        console.warn(
            `Error while reading cssRules from StyleSheet "${
                styleSheet.href || 'local'
            }".`,
        );
        console.error(err);
        return [];
    }
}
