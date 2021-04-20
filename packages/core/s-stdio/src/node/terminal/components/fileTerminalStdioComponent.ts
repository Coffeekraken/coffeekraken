import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';

/**
 * @name        fileTerminalStdioComponent
 * @namespace   sugar.node.stdio.terminal.components
 * @type        ISStdioComponent
 *
 * Terminal stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
  id: 'file',
  render(logObj, settings: any) {
    const value = logObj.value || logObj;
    const action = logObj.action;
    const file = logObj.file;
    const logStrArray: string[] = [];

    if (!file) {
      throw new Error(
        `You must specify a "<yellow>file</yellow>" property in order to use the "<cyan>file</cyan>" log type.`
      );
    }

    if (!action)
      throw new Error(
        `You must specify a "<yellow>action</yellow>" property in order to use the "<cyan>file</cyan>" log type. Here's the supported actions:\n- ${[
          'save',
          'delete',
          'update'
        ].join('\n- ')}`
      );

    let color, str;
    switch (action) {
      case 'save':
        color = 'yellow';
        str = `Saving file "<cyan>${file.relPath ?? file.path}</cyan>"`;
        if (logObj.to) {
          str += ` to "<magenta>${logObj.to}</magenta>"`;
        }
        logStrArray.push(str);
        break;
      case 'saved':
        color = 'green';
        str = `File "<cyan>${
          file.relPath ?? file.path
        }</cyan>" <green>saved successfully</green>`;
        if (logObj.to) {
          str += ` to "<magenta>${logObj.to}</magenta>"`;
        }
        logStrArray.push(str);
        break;
      case 'delete':
        color = 'yellow';
        logStrArray.push(`File "<cyan>${file.relPath ?? file.path}</cyan>"`);
        break;
      case 'deleted':
        color = 'red';
        logStrArray.push(
          `File "<cyan>${
            file.relPath ?? file.path
          }</cyan>" <red>deleted successfully</red>`
        );
        break;
      case 'update':
      case 'updated':
        color = 'yellow';
        logStrArray.push(`File "<cyan>${file.relPath ?? file.path}</cyan>"`);
        break;
    }

    let logStr = logStrArray.join('\n');
    if (settings.terminalStdio.actionPrefix) {
      logStr = `<${color}>[${logObj.action}]</${color}> ${logStr}`;
    }

    return __parseHtml(logStr);
  }
};
