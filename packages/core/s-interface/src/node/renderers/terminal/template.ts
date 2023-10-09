import { __parseHtml } from '@coffeekraken/sugar/console';
import { __countLineChars } from '@coffeekraken/sugar/string';

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
    let tpl: string[] = [];

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
        const titleStr = `--${propertyObj.name} ${
            propertyObj.alias ? `(${propertyObj.alias})` : ''
        } ${propertyObj.type} ${
            propertyObj.default && __countLineChars(propertyObj.default) <= 20
                ? propertyObj.default
                : ''
        } ${propertyObj.description || ''}`;
        tpl.push(titleStr.replace(/\s{2,999}/gm, ' '));
        if (propertyObj.default && __countLineChars(propertyObj.default) > 20) {
            tpl.push(propertyObj.default);
        }
    }

    return __parseHtml(tpl.join('\n'));
}
