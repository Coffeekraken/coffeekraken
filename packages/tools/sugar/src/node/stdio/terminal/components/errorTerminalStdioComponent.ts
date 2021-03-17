import __parseHtml from '../../../../shared/console/parseHtml';
import __toString from '../../../../shared/string/toString';

/**
 * @name        errorTerminalStdioComponent
 * @namespace   sugar.node.stdio.terminal.components
 * @type        ISStdioComponent
 *
 * Terminal stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
  id: 'error',
  render(logObj, settings: any) {
    const value = logObj.value || logObj;

    let logStr = __toString(value);
    if (settings.terminalStdio.actionPrefix) {
      logStr = `<red>Error:</red>\n${logStr}`;
    }

    const lines = logStr.split('\n').map((l) => {
      return __parseHtml(`<red>│</red> ${l}`);
    });

    return `\n${lines.join('\n')}\n`;
  }
};
