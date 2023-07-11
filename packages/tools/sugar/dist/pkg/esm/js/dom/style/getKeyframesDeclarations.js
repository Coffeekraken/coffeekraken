import __getCssDeclarations from './getCssDeclarations.js';
/**
 * @name      getKeyframesDeclarations
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @status          wip
 *
 * Get all the keyframes declarations from the passed rules
 *
 * @param       {string}            animationName        CSS animationName to search KeyFrameRule declarations for
 * @param       {array}              rules               Array of CSSRules to search
 * @return      {CSSKeyframeRule}              Array of matching KeyFrameRules
 *
 * @todo      refactore
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __getKeyframesDeclarations($1)
 *
 * @example  	js
 * import { __getKeyframesDeclarations } from '@coffeekraken/sugar/dom';
 * __getKeyframesDeclarations('myCoolAnimation', [myCoolCssRules]);
 *
 * @see             https://github.com/marionebl/jogwheel/blob/master/source/library/get-keyframe-declarations.js
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function getKeyframesDeclarations(animationName, rules) {
    const keyframesNames = [];
    return __getCssDeclarations('keyframes', rules, (rule) => {
        if (keyframesNames.includes(rule.name))
            return false;
        keyframesNames.push(rule.name);
        return rule.name === animationName;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sb0JBQW9CLE1BQU0seUJBQXlCLENBQUM7QUFFM0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsd0JBQXdCLENBQzVDLGFBQWEsRUFDYixLQUFLO0lBRUwsTUFBTSxjQUFjLEdBQWEsRUFBRSxDQUFDO0lBQ3BDLE9BQU8sb0JBQW9CLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3JELElBQUksY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDckQsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLGFBQWEsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==