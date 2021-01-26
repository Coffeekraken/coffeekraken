import __parseHtml from '../../../console/parseHtml';
import __toString from '../../../string/toString';
import __countLine from '../../../string/countLine';

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
      return;
      '\n' +
        `${value} ${separator.repeat(
          process.stdout.columns - __countLine(value) - 1
        )}`;
    } else {
      return (
        '\n' +
        __parseHtml(
          `<${color}>${separator.repeat(process.stdout.columns)}</${color}>`
        )
      );
    }
  }
};
