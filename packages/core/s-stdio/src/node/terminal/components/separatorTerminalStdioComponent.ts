import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __countLine from '@coffeekraken/sugar/shared/string/countLine';

/**
 * @name        separatorTerminalStdioComponent
 * @namespace   sugar.node.stdio.terminal.components
 * @type        ISStdioComponent
 *
 * Terminal stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
  id: 'separator',
  render(logObj, settings = {}) {
    const value = logObj.value;
    const color = logObj.color || 'yellow';

    const separator = logObj.separator ? logObj.separator.slice(0, 1) : '-';
    if (value) {
      return `${value} ${separator.repeat(
        process.stdout.columns - __countLine(value) - 1
      )}`;
    } else {
      return __parseHtml(
        `<${color}>${separator.repeat(process.stdout.columns)}</${color}>`
      );
    }
  }
};
