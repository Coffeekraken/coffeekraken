"use strict";
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseHtml_1 = __importDefault(require("../../../console/parseHtml"));
const countLine_1 = __importDefault(require("../../../string/countLine"));
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
    for (let propKey in properties) {
        const propertyObj = properties[propKey];
        let titleStr = `--${propertyObj.name} ${propertyObj.alias ? `(${propertyObj.alias})` : ''} ${propertyObj.type} ${propertyObj.default && countLine_1.default(propertyObj.default) <= 20
            ? propertyObj.default
            : ''} ${propertyObj.description || ''}`;
        tpl.push(titleStr.replace(/\s{2,999}/gm, ' '));
        if (propertyObj.default && countLine_1.default(propertyObj.default) > 20) {
            tpl.push(propertyObj.default);
        }
    }
    return parseHtml_1.default(tpl.join('\n'));
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2hhcmVkL2ludGVyZmFjZS9yZW5kZXJlcnMvdGVybWluYWwvdGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFVBQVU7Ozs7O0FBRVYsMkVBQXFEO0FBQ3JELDBFQUFvRDtBQUVwRDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILG1CQUF5QixFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUU7SUFDckQsSUFBSSxHQUFHLEdBQWEsRUFBRSxDQUFDO0lBRXZCLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ2YsRUFBRTtRQUNGLFdBQVcsY0FBYyxDQUFDLElBQUksMEJBQTBCO1FBQ3hELEVBQUU7S0FDSCxDQUFDLENBQUM7SUFFSCxJQUFJLGNBQWMsQ0FBQyxXQUFXLEVBQUU7UUFDOUIsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNkO0lBRUQsS0FBSyxJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUU7UUFDOUIsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLElBQUksUUFBUSxHQUFHLEtBQUssV0FBVyxDQUFDLElBQUksSUFDbEMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxXQUFXLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQ2pELElBQUksV0FBVyxDQUFDLElBQUksSUFDbEIsV0FBVyxDQUFDLE9BQU8sSUFBSSxtQkFBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQzNELENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTztZQUNyQixDQUFDLENBQUMsRUFDTixJQUFJLFdBQVcsQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFLENBQUM7UUFDcEMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksV0FBVyxDQUFDLE9BQU8sSUFBSSxtQkFBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDaEUsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDL0I7S0FDRjtJQUVELE9BQU8sbUJBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDckMsQ0FBQztBQTlCRCw0QkE4QkMifQ==