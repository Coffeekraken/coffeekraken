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
 * @example  	js
 * import { __getCssRulesFromStylesheet } from '@coffeekraken/sugar/dom';
 * __getCssRulesFromStylesheet(myStylesheet);
 *
 * @see             https://github.com/marionebl/jogwheel/blob/master/source/library/get-css-rules.js
 @since           2.0.0
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSwyQkFBMkIsQ0FDL0MsVUFBc0IsRUFDdEIsU0FBUyxHQUFHLElBQUk7SUFFaEIsSUFBSTtRQUNBLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUVmLFNBQVMsUUFBUSxDQUFDLEtBQWlCO1lBQy9CLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQztZQUN4QixpRUFBaUU7WUFDakUsSUFBSTtnQkFDQSxhQUFhO2dCQUNiLEtBQUssR0FBRyxDQUFDLEdBQUcsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzlEO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1IsWUFBWSxHQUFHLEtBQUssQ0FBQzthQUN4QjtZQUVELElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxZQUFZO2dCQUFFLE9BQU87WUFDeEMsYUFBYTtZQUNiLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ2pELGFBQWE7Z0JBQ2IscUJBQXFCO2dCQUNyQixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ3hDLGFBQWE7b0JBQ2IsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDN0I7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFDRCxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFckIsYUFBYTtRQUNiLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDVixPQUFPLENBQUMsSUFBSSxDQUNSLGlEQUNJLFVBQVUsQ0FBQyxJQUFJLElBQUksT0FDdkIsSUFBSSxDQUNQLENBQUM7UUFDRixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLE9BQU8sRUFBRSxDQUFDO0tBQ2I7QUFDTCxDQUFDIn0=