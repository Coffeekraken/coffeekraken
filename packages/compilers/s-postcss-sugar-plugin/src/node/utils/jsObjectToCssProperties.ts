import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

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
}

export default function jsObjectToCssProperties(
  jsObject: any,
  settings?: IJsObjectToCssProperties
): string {
  const finalSettings = <IJsObjectToCssProperties>__deepMerge(
    {
      exclude: []
    },
    settings
  );

  const propsStack: string[] = [];
  Object.keys(jsObject).forEach((prop) => {
    if (finalSettings.exclude.indexOf(prop) !== -1) return;

    const value = jsObject[prop];

    if (!value) return;

    switch (prop) {
      case 'font-family':
        propsStack.push(`@sugar.font.family(${value});`);
        break;
      case 'font-size':
        propsStack.push(`@sugar.font.size(${value});`);
        break;
      case 'color':
        propsStack.push(`color: sugar.color(${value});`);
        break;
      case 'background-color':
        propsStack.push(`background-color: sugar.color(${value});`);
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
      default:
        propsStack.push(`${prop}: ${value};`);
        break;
    }
  });
  return propsStack.join('\n');
}
