"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("@coffeekraken/sugar/console");
const string_1 = require("@coffeekraken/sugar/string");
/**
 * @name                layout
 * @namespace           renderers.terminal
 * @type                Function
 * @platform          node
 * @status            beta
 * @private
 *
 * Return the layout you want for the "terminal" renderer.
 * You can use tokens like these:
 * - %type : Will be replaced with the "type" field rendered string
 * - %default : Same but for the "default" field
 * - etc...
 *
 * @param       {ISInterfaceRendererRenderPropertyObj}          propertyObj             The property object to render
 * @return              String                  The renderer template string
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ interfaceClass, properties }) {
    let tpl = [];
    tpl = tpl.concat([
        '',
        `<yellow>${interfaceClass.name}</yellow> interface help`,
        '',
    ]);
    if (interfaceClass.description) {
        tpl.push(interfaceClass.description);
        tpl.push('');
    }
    for (const propKey in properties) {
        const propertyObj = properties[propKey];
        const titleStr = `--${propertyObj.name} ${propertyObj.alias ? `(${propertyObj.alias})` : ''} ${propertyObj.type} ${propertyObj.default && (0, string_1.__countLineChar)(propertyObj.default) <= 20
            ? propertyObj.default
            : ''} ${propertyObj.description || ''}`;
        tpl.push(titleStr.replace(/\s{2,999}/gm, ' '));
        if (propertyObj.default && (0, string_1.__countLineChar)(propertyObj.default) > 20) {
            tpl.push(propertyObj.default);
        }
    }
    return (0, console_1.__parseHtml)(tpl.join('\n'));
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseURBQTBEO0FBQzFELHVEQUE2RDtBQUU3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILG1CQUF5QixFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUU7SUFDbkQsSUFBSSxHQUFHLEdBQWEsRUFBRSxDQUFDO0lBRXZCLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ2IsRUFBRTtRQUNGLFdBQVcsY0FBYyxDQUFDLElBQUksMEJBQTBCO1FBQ3hELEVBQUU7S0FDTCxDQUFDLENBQUM7SUFFSCxJQUFJLGNBQWMsQ0FBQyxXQUFXLEVBQUU7UUFDNUIsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNoQjtJQUVELEtBQUssTUFBTSxPQUFPLElBQUksVUFBVSxFQUFFO1FBQzlCLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxNQUFNLFFBQVEsR0FBRyxLQUFLLFdBQVcsQ0FBQyxJQUFJLElBQ2xDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUNuRCxJQUFJLFdBQVcsQ0FBQyxJQUFJLElBQ2hCLFdBQVcsQ0FBQyxPQUFPLElBQUksSUFBQSx3QkFBZSxFQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQzdELENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTztZQUNyQixDQUFDLENBQUMsRUFDVixJQUFJLFdBQVcsQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFLENBQUM7UUFDcEMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksV0FBVyxDQUFDLE9BQU8sSUFBSSxJQUFBLHdCQUFlLEVBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNsRSxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNqQztLQUNKO0lBRUQsT0FBTyxJQUFBLHFCQUFXLEVBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7QUE5QkQsNEJBOEJDIn0=