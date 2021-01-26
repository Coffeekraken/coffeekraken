// @ts-nocheck

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
  id: 'warning',
  render(logObj, settings: any) {
    const value = logObj.value || logObj;
    const logStr = __toString(value);

    const $line = new __SBlessedComponent({
      blessed: {
        top: 0,
        left: 0,
        width: 1,
        height: 'shrink',
        style: {
          bg: 'yellow'
        }
      }
    });

    const $text = new __SBlessedComponent({
      blessed: {
        top: 0,
        left: 3,
        width: '100%-3',
        height: 'shrink',
        scrollable: false,
        content: __parseHtml(`<yellow>Warning:</yellow>\n${logStr}`)
      }
    });

    const $component = new __SBlessedComponent({
      blessed: {
        width: '100%',
        height: 0,
        style: {}
      }
    });

    $component.append($line);
    $component.append($text);

    return $component;
  }
};
