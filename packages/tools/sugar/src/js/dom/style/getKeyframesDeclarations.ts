import { __getCssDeclarations } from '@coffeekraken/sugar/dom';

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
export default function getKeyframesDeclarations(
    animationName,
    rules,
): CSSKeyframeRule[] {
    const keyframesNames: string[] = [];
    return __getCssDeclarations('keyframes', rules, (rule) => {
        if (keyframesNames.includes(rule.name)) return false;
        keyframesNames.push(rule.name);
        return rule.name === animationName;
    });
}
