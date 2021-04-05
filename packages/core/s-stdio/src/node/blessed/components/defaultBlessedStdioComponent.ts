// @ts-nocheck

import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __toString from '@coffeekraken/sugar/shared/string/toString';
import __SBlessedComponent from '@coffeekraken/sugar/node/blessed/SBlessedComponent';

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
  id: 'default',
  render(logObj, settings: any) {
    const value = logObj.value || logObj;
    const logStr = __parseHtml(__toString(value)).trim();

    const $component = new __SBlessedComponent({
      blessed: {
        width: '100%',
        height: 0
      }
    });
    $component.on('update', () => {
      $component.setContent(logStr);
      $component.height = $component.realHeight;
    });
    return $component;
  }
};
