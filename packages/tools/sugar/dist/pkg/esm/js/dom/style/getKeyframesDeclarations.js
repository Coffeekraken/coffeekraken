import __getCssDeclarations from './getCssDeclarations';
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
 * @example  	js
 * import __getKeyframesDeclarations from '@coffeekraken/sugar/js/dom/style/getKeyframesDeclarations';
 * __getKeyframesDeclarations('myCoolAnimation', [myCoolCssRules]);
 *
 * @see             https://github.com/marionebl/jogwheel/blob/master/source/library/get-keyframe-declarations.js
 * @since         1.0.0
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sb0JBQW9CLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLHdCQUF3QixDQUM1QyxhQUFhLEVBQ2IsS0FBSztJQUVMLE1BQU0sY0FBYyxHQUFhLEVBQUUsQ0FBQztJQUNwQyxPQUFPLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNyRCxJQUFJLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3JELGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxhQUFhLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDIn0=