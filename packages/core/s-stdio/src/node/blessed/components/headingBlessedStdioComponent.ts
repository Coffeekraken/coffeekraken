// @ts-nocheck

import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __toString from '@coffeekraken/sugar/shared/string/toString';
import __SBlessedComponent from '@coffeekraken/sugar/node/blessed/SBlessedComponent';

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

    const $component = new __SBlessedComponent({
      blessed: {
        width: '100%',
        height: 'shrink',
        style: {}
      }
    });

    $component.on('update', () => {
      const width = $component.parent?.innerWidth || process.stdout.columns;
      $component.width = width;

      const separator = `<${color}>${character.repeat(width)}</${color}>`;
      const logStr = __parseHtml([separator, value, separator].join('\n'));
      $component.setContent(logStr);
      $component.height = $component.realHeight;
    });

    return $component;
  }
};
