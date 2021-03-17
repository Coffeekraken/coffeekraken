// @ts-nocheck

import __parseHtml from '../../../../shared/console/parseHtml';
import __toString from '../../../../shared/string/toString';
import __SBlessedComponent from '../../../blessed/SBlessedComponent';
import __upperFirst from '../../../../shared/string/upperFirst';

/**
 * @name        timeBlessedStdioComponent
 * @namespace   sugar.node.stdio.blessed.components
 * @type        ISStdioComponent
 *
 * Blessed stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
  id: 'time',
  render(logObj, settings: any) {
    const value = logObj.value || logObj;

    const color = logObj.color || 'yellow';

    const logStr = __parseHtml(
      `<bgBlack> <${color}>◷</${color}> </bgBlack><bg${__upperFirst(
        color
      )}> <black>${new Date().toLocaleTimeString(
        'en-US'
      )} </black></bg${__upperFirst(color)}>\n`
    );

    const $component = new __SBlessedComponent({
      blessed: {
        width: '100%',
        height: 2,
        style: {},
        content: logStr
      }
    });

    return $component;
  }
};
