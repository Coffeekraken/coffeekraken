"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseHtml_1 = __importDefault(require("@coffeekraken/sugar/shared/console/parseHtml"));
const countLine_1 = __importDefault(require("@coffeekraken/sugar/shared/string/countLine"));
/**
 * @name                layout
 * @namespace           sugar.js.interface.renderers.terminal
 * @type                Function
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
        ''
    ]);
    if (interfaceClass.description) {
        tpl.push(interfaceClass.description);
        tpl.push('');
    }
    for (const propKey in properties) {
        const propertyObj = properties[propKey];
        const titleStr = `--${propertyObj.name} ${propertyObj.alias ? `(${propertyObj.alias})` : ''} ${propertyObj.type} ${propertyObj.default && (0, countLine_1.default)(propertyObj.default) <= 20
            ? propertyObj.default
            : ''} ${propertyObj.description || ''}`;
        tpl.push(titleStr.replace(/\s{2,999}/gm, ' '));
        if (propertyObj.default && (0, countLine_1.default)(propertyObj.default) > 20) {
            tpl.push(propertyObj.default);
        }
    }
    return (0, parseHtml_1.default)(tpl.join('\n'));
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkZBQXVFO0FBQ3ZFLDRGQUFzRTtBQUV0RTs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILG1CQUF5QixFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUU7SUFDckQsSUFBSSxHQUFHLEdBQWEsRUFBRSxDQUFDO0lBRXZCLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ2YsRUFBRTtRQUNGLFdBQVcsY0FBYyxDQUFDLElBQUksMEJBQTBCO1FBQ3hELEVBQUU7S0FDSCxDQUFDLENBQUM7SUFFSCxJQUFJLGNBQWMsQ0FBQyxXQUFXLEVBQUU7UUFDOUIsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNkO0lBRUQsS0FBSyxNQUFNLE9BQU8sSUFBSSxVQUFVLEVBQUU7UUFDaEMsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sUUFBUSxHQUFHLEtBQUssV0FBVyxDQUFDLElBQUksSUFDcEMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxXQUFXLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQ2pELElBQUksV0FBVyxDQUFDLElBQUksSUFDbEIsV0FBVyxDQUFDLE9BQU8sSUFBSSxJQUFBLG1CQUFXLEVBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDM0QsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPO1lBQ3JCLENBQUMsQ0FBQyxFQUNOLElBQUksV0FBVyxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUNwQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxXQUFXLENBQUMsT0FBTyxJQUFJLElBQUEsbUJBQVcsRUFBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2hFLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQy9CO0tBQ0Y7SUFFRCxPQUFPLElBQUEsbUJBQVcsRUFBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDckMsQ0FBQztBQTlCRCw0QkE4QkMifQ==