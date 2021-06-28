import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __toString from '@coffeekraken/sugar/shared/string/toString';

/**
 * @name        warningTerminalStdioComponent
 * @namespace   sugar.node.stdio.terminal.components
 * @type        ISStdioComponent
 *
 * Terminal stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
  id: 'warning',
  render(logObj, settings: any) {
    const value = logObj.value || logObj;

    let logStr = __toString(value) ?? '';
    if (settings.terminalStdio.actionPrefix) {
      logStr = `<yellow>Warning:</yellow>\n${logStr}`;
    }

    const lines = logStr.split('\n').map((l) => {
      return __parseHtml(`<yellow>│</yellow> ${l}`);
    });

    return `\n${lines.join('\n')}\n`;
  }
};
