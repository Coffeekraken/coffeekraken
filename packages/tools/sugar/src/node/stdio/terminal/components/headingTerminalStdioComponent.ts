import __parseHtml from '../../../console/parseHtml';
import __toString from '../../../string/toString';

/**
 * @name        headingTerminalStdioComponent
 * @namespace   sugar.node.stdio.terminal.components
 * @type        ISStdioComponent
 *
 * Terminal stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
  id: 'heading',
  render(logObj, settings = {}) {
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

    return __parseHtml(logStrArray.join('\n'));
  }
};
