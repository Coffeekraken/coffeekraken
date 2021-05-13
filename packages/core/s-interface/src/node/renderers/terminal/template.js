import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __countLine from '@coffeekraken/sugar/shared/string/countLine';
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
export default function ({ interfaceClass, properties }) {
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
        const titleStr = `--${propertyObj.name} ${propertyObj.alias ? `(${propertyObj.alias})` : ''} ${propertyObj.type} ${propertyObj.default && __countLine(propertyObj.default) <= 20
            ? propertyObj.default
            : ''} ${propertyObj.description || ''}`;
        tpl.push(titleStr.replace(/\s{2,999}/gm, ' '));
        if (propertyObj.default && __countLine(propertyObj.default) > 20) {
            tpl.push(propertyObj.default);
        }
    }
    return __parseHtml(tpl.join('\n'));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSw4Q0FBOEMsQ0FBQztBQUN2RSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUV0RTs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFO0lBQ3JELElBQUksR0FBRyxHQUFhLEVBQUUsQ0FBQztJQUV2QixHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUNmLEVBQUU7UUFDRixXQUFXLGNBQWMsQ0FBQyxJQUFJLDBCQUEwQjtRQUN4RCxFQUFFO0tBQ0gsQ0FBQyxDQUFDO0lBRUgsSUFBSSxjQUFjLENBQUMsV0FBVyxFQUFFO1FBQzlCLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDZDtJQUVELEtBQUssTUFBTSxPQUFPLElBQUksVUFBVSxFQUFFO1FBQ2hDLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxNQUFNLFFBQVEsR0FBRyxLQUFLLFdBQVcsQ0FBQyxJQUFJLElBQ3BDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUNqRCxJQUFJLFdBQVcsQ0FBQyxJQUFJLElBQ2xCLFdBQVcsQ0FBQyxPQUFPLElBQUksV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQzNELENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTztZQUNyQixDQUFDLENBQUMsRUFDTixJQUFJLFdBQVcsQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFLENBQUM7UUFDcEMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksV0FBVyxDQUFDLE9BQU8sSUFBSSxXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNoRSxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMvQjtLQUNGO0lBRUQsT0FBTyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLENBQUMifQ==