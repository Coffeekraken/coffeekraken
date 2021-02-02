import __parseHtml from '../../../console/parseHtml';
import __toString from '../../../string/toString';
import __upperFirst from '../../../string/upperFirst';

/**
 * @name        timeTerminalStdioComponent
 * @namespace   sugar.node.stdio.terminal.components
 * @type        ISStdioComponent
 *
 * Terminal stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
  id: 'time',
  render(logObj, settings = {}) {
    const value = logObj.value || '';
    const color = logObj.color || 'yellow';

    const logStr = __parseHtml(
      `<bgBlack> <${color}>◷</${color}> </bgBlack><bg${__upperFirst(
        color
      )}> <black>${new Date().toLocaleTimeString(
        'en-US'
      )} </black></bg${__upperFirst(color)}> ${value}\n`
    );

    return logStr;
  }
};
