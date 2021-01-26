import __parseHtml from '../../../console/parseHtml';
import __toString from '../../../string/toString';
import __SBlessedComponent from '../../../blessed/SBlessedComponent';

/**
 * @name        defaultBlessedStdioComponent
 * @namespace   sugar.node.stdio.blessed.components
 * @type        ISStdioComponent
 *
 * Blessed stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
  id: 'separator',
  render(logObj, settings: any) {
    const value = logObj.value || logObj;
    const logStr = __parseHtml(__toString(value));

    const character = logObj.character || '-';
    const color = logObj.color || 'yellow';

    const $component = new __SBlessedComponent({
      blessed: {
        width: '100%',
        height: 'shrink',
        style: {},
        content: __parseHtml(
          `\n<${color}>${character.repeat(process.stdout.columns)}</${color}>\n`
        )
      }
    });
    return $component;
  }
};
