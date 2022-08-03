"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getCssDeclarations_1 = __importDefault(require("./getCssDeclarations"));
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
function getKeyframesDeclarations(animationName, rules) {
    const keyframesNames = [];
    return (0, getCssDeclarations_1.default)('keyframes', rules, (rule) => {
        if (keyframesNames.includes(rule.name))
            return false;
        keyframesNames.push(rule.name);
        return rule.name === animationName;
    });
}
exports.default = getKeyframesDeclarations;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOEVBQXdEO0FBRXhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBd0Isd0JBQXdCLENBQzVDLGFBQWEsRUFDYixLQUFLO0lBRUwsTUFBTSxjQUFjLEdBQWEsRUFBRSxDQUFDO0lBQ3BDLE9BQU8sSUFBQSw0QkFBb0IsRUFBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDckQsSUFBSSxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUNyRCxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssYUFBYSxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVZELDJDQVVDIn0=