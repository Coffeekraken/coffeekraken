import __parseHtml from '../../../console/parseHtml';
import __toString from '../../../string/toString';
import __SBlessedComponent from '../../../blessed/SBlessedComponent';

/**
 * @name        headingBlessedStdioComponent
 * @namespace   sugar.node.stdio.blessed.components
 * @type        ISStdioComponent
 *
 * Blessed stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
  id: 'heading',
  render(logObj, settings: any) {
    const value = __toString(logObj.value || logObj);
    const color = logObj.color || 'yellow';

    const character = logObj.character ? logObj.character.slice(0, 1) : '-';

    const logStrArray: string[] = [];
    logStrArray.push(
      `<${color}>${character.repeat(process.stdout.columns)}</${color}>`
    );
    logStrArray.push(value);
    logStrArray.push(
      `<${color}>${character.repeat(process.stdout.columns)}</${color}>`
    );

    const logStr = __parseHtml(logStrArray.join('\n'));

    const $component = new __SBlessedComponent({
      blessed: {
        width: '100%',
        height: 'shrink',
        style: {},
        content: logStr
      }
    });
    return $component;
  }
};
