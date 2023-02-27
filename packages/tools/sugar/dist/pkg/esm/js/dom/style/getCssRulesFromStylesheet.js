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
export default function __getCssRulesFromStylesheet(styleSheet, recursive = true) {
    try {
        let rules = [];
        function getRules(sheet) {
            let isAccessible = true;
            // make a try catch cause external stylesheets cannot be accessed
            try {
                // @ts-ignore
                rules = [...rules, ...[].slice.call(sheet.cssRules || [])];
            }
            catch (e) {
                isAccessible = false;
            }
            if (!recursive || !isAccessible)
                return;
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
    }
    catch (err) {
        console.warn(`Error while reading cssRules from StyleSheet "${styleSheet.href || 'local'}".`);
        console.error(err);
        return [];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLDJCQUEyQixDQUMvQyxVQUFzQixFQUN0QixTQUFTLEdBQUcsSUFBSTtJQUVoQixJQUFJO1FBQ0EsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBRWYsU0FBUyxRQUFRLENBQUMsS0FBaUI7WUFDL0IsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLGlFQUFpRTtZQUNqRSxJQUFJO2dCQUNBLGFBQWE7Z0JBQ2IsS0FBSyxHQUFHLENBQUMsR0FBRyxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDOUQ7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDUixZQUFZLEdBQUcsS0FBSyxDQUFDO2FBQ3hCO1lBRUQsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLFlBQVk7Z0JBQUUsT0FBTztZQUN4QyxhQUFhO1lBQ2IsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDakQsYUFBYTtnQkFDYixxQkFBcUI7Z0JBQ3JCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDeEMsYUFBYTtvQkFDYixRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUM3QjtZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNELFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVyQixhQUFhO1FBQ2IsT0FBTyxLQUFLLENBQUM7S0FDaEI7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNWLE9BQU8sQ0FBQyxJQUFJLENBQ1IsaURBQ0ksVUFBVSxDQUFDLElBQUksSUFBSSxPQUN2QixJQUFJLENBQ1AsQ0FBQztRQUNGLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsT0FBTyxFQUFFLENBQUM7S0FDYjtBQUNMLENBQUMifQ==