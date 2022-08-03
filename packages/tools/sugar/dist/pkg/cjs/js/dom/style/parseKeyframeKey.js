"use strict";
/**
 * @name      parseKeyframeKey
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @status          wip
 *
 * Parses KeyFrameRule.keyText to an array of integers holding keyframe percentages
 *
 * @param 		 {string}		 keyText			 KeyFrameRule.keyText to parse
 * @return 			{array}          					Array of percentages for this KeyFrameRule
 *
 * @todo      refactore
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import __parseKeyframeKey from '@coffeekraken/sugar/js/dom/style/parseKeyframeKey';
 * __parseKeyframeKey('from');
 *
 * @see             https://github.com/marionebl/jogwheel/blob/master/source/library/get-css-rules.js
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
Object.defineProperty(exports, "__esModule", { value: true });
function parseKeyframeKey(keyText) {
    // Split multivalue key,
    return (keyText
        .split(',')
        // Trim any remaining whitespace
        .map((key) => key.trim())
        // "Understand" CSS keyText keywords
        .map((key) => key.replace('from', '0').replace('to', '100'))
        // Remove any math symbols
        .map((key) => key.replace('%', ''))
        // Parse to integer
        .map((key) => parseInt(key, 10)));
}
exports.default = parseKeyframeKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHOztBQUVILFNBQXdCLGdCQUFnQixDQUFDLE9BQWU7SUFDcEQsd0JBQXdCO0lBQ3hCLE9BQU8sQ0FDSCxPQUFPO1NBQ0YsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUNYLGdDQUFnQztTQUMvQixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixvQ0FBb0M7U0FDbkMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzVELDBCQUEwQjtTQUN6QixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25DLG1CQUFtQjtTQUNsQixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FDdkMsQ0FBQztBQUNOLENBQUM7QUFkRCxtQ0FjQyJ9