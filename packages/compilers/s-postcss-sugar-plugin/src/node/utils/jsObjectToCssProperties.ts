import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
import __knownCssProperties from 'known-css-properties';

/**
 * @name                jsObjectToCssProperties
 * @namespace           node.utils
 * @type                Function
 * @status              beta
 *
 * This function allows you to pass a javascript object that contain css properties
 * and it will returns the processed css string
 *
 * @param           {Object}        jsObject        An object to convert to css string
 * @return          {String}                            The processed css string
 *
 * @example         js
 * import jsObjectToCssProperties from '@coffeekraken/s-postcss-sugar-plugin';
 * jsObjectToCssProperties({
 *      color: 'primary',
 *      margin: '10px'
 * }); // => color: #f0f0f0; margin: 10px;
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export interface IJsObjectToCssProperties {
    exclude: string[];
    only: string[];
}

export default function jsObjectToCssProperties(jsObject: any, settings?: Partial<IJsObjectToCssProperties>): string {
    const finalSettings = <IJsObjectToCssProperties>__deepMerge(
        {
            exclude: [],
            only: [],
        },
        settings,
    );

    const propsStack: string[] = [];
    Object.keys(jsObject).forEach((prop) => {
        if (finalSettings.exclude.indexOf(prop) !== -1) return;
        if (finalSettings.exclude.indexOf(__dashCase(prop)) !== -1) return;

        const originalProp = prop;
        prop = __dashCase(prop).trim();

        if (finalSettings.exclude.length && finalSettings.exclude.indexOf(prop) !== -1) return;
        if (finalSettings.only.length && finalSettings.only.indexOf(prop) === -1) return;

        const value = jsObject[originalProp];
        if (!value) return;

        let color, modifier;

        switch (prop) {
            case 'font-family':
                propsStack.push(`@sugar.font.family(${value});`);
                break;
            case 'font-size':
                propsStack.push(`@sugar.font.size(${value});`);
                break;
            case 'color':
                color = value;
                modifier = '';
                if (Array.isArray(value)) {
                    color = value[0];
                    modifier = value[1];
                }
                propsStack.push(`color: sugar.color(${color}, ${modifier});`);
                break;
            case 'background-color':
                color = value;
                modifier = '';
                if (Array.isArray(value)) {
                    color = value[0];
                    modifier = value[1];
                }
                propsStack.push(`background-color: sugar.color(${color}, ${modifier});`);
                break;
            case 'border-radius':
            case 'border-top-left-radius':
            case 'border-top-right-radius':
            case 'border-bottom-right-radius':
            case 'border-bottom-left-radius':
                propsStack.push(`border-radius: sugar.border.radius(${value});`);
                break;
            case 'border-width':
                propsStack.push(`border-width: sugar.border.width(${value});`);
                break;
            case 'margin':
            case 'margin-top':
            case 'margin-bottom':
            case 'margin-left':
            case 'margin-right':
                propsStack.push(`${prop}: sugar.margin(${value});`);
                break;
            case 'padding':
            case 'padding-top':
            case 'padding-bottom':
            case 'padding-left':
            case 'padding-right':
                propsStack.push(`${prop}: sugar.padding(${value});`);
                break;
            case 'depth':
                propsStack.push(`@sugar.depth(${value});`);
                break;
            case 'default-color':
                propsStack.push(`@sugar.color.remap(ui, ${value});`);
                break;
            case 'rhythm-vertical':
                propsStack.push(`
          @sugar.rhythm.vertical {
            ${jsObjectToCssProperties(jsObject[':rhythmVertical'])}
          }
        `);
                break;
            default:
                const props = __knownCssProperties.all;
                if (props.indexOf(prop) === -1) return;

                propsStack.push(`${prop}: ${value};`);
                break;
        }
    });
    return propsStack.join('\n');
}
