// @shared

import __parseHtml from '../../../console/parseHtml';

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
  let tpl: string[] = [];

  tpl = tpl.concat(['', `<yellow>${interfaceClass.name}</yellow> help`, '']);

  if (interfaceClass.description) {
    tpl.push(interfaceClass.description);
    tpl.push('');
  }

  for (let propKey in properties) {
    const propertyObj = properties[propKey];

    const propStr: string[] = [];

    let titleStr = `${propertyObj.name} ${propertyObj.type}`;
    tpl.push('');
    propStr.push(titleStr);

    if (propertyObj.alias) {
      propStr.push(`Alias: ${propertyObj.alias}`);
    }
    if (propertyObj.description) {
      // propStr.push('');
      propStr.push(`${propertyObj.description}`);
    }
    if (propertyObj.default) {
      // propStr.push('');
      propStr.push(`<magenta>Default</magenta>: ${propertyObj.default}`);
    }

    tpl.push(
      propStr
        .join('\n')
        .split('\n')
        .map((line) => {
          return `│ ${line}`;
        })
        .join('\n')
    );
  }

  return __parseHtml(tpl.join('\n'));
}
