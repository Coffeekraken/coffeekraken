import { __parseHtml } from '@coffeekraken/sugar/console';
import __countLine from '@coffeekraken/sugar/shared/string/countLine';
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
export default function ({ interfaceClass, properties }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUV0RTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFO0lBQ25ELElBQUksR0FBRyxHQUFhLEVBQUUsQ0FBQztJQUV2QixHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUNiLEVBQUU7UUFDRixXQUFXLGNBQWMsQ0FBQyxJQUFJLDBCQUEwQjtRQUN4RCxFQUFFO0tBQ0wsQ0FBQyxDQUFDO0lBRUgsSUFBSSxjQUFjLENBQUMsV0FBVyxFQUFFO1FBQzVCLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDaEI7SUFFRCxLQUFLLE1BQU0sT0FBTyxJQUFJLFVBQVUsRUFBRTtRQUM5QixNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEMsTUFBTSxRQUFRLEdBQUcsS0FBSyxXQUFXLENBQUMsSUFBSSxJQUNsQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDbkQsSUFBSSxXQUFXLENBQUMsSUFBSSxJQUNoQixXQUFXLENBQUMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUN6RCxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU87WUFDckIsQ0FBQyxDQUFDLEVBQ1YsSUFBSSxXQUFXLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ3BDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLFdBQVcsQ0FBQyxPQUFPLElBQUksV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDOUQsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDakM7S0FDSjtJQUVELE9BQU8sV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUN2QyxDQUFDIn0=