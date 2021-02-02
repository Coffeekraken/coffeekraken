import __parseHtml from '../../../console/parseHtml';
import __toString from '../../../string/toString';
import __SFile from '../../../fs/SFile';

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
    if (!(file instanceof __SFile)) {
      throw new Error(
        `The "<yellow>file</yellow>" property must be an instance of the "<cyan>SFile</cyan>" class`
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
        str = `<yellow>[save]</yellow> Saving file "<cyan>${file.relPath}</cyan>"`;
        if (logObj.to) {
          str += ` to "<magenta>${logObj.to}</magenta>"`;
        }
        logStrArray.push(str);
        break;
      case 'saved':
        color = 'green';
        str = `<green>[save]</green> File "<cyan>${file.relPath}</cyan>" <green>saved successfully</green>`;
        if (logObj.to) {
          str += ` to "<magenta>${logObj.to}</magenta>"`;
        }
        logStrArray.push(str);
        break;
      case 'delete':
        color = 'yellow';
        logStrArray.push(
          `<yellow>[delete]]</yellow> File "<cyan>${file.relPath}</cyan>"`
        );
        break;
      case 'deleted':
        color = 'red';
        logStrArray.push(
          `<green>[delete]</green> File "<cyan>${file.relPath}</cyan>" <red>deleted successfully</red>`
        );
        break;
      case 'update':
      case 'updated':
        color = 'yellow';
        logStrArray.push(
          `<yellow>[update]</yellow File "<cyan>${file.relPath}</cyan>"`
        );
        break;
    }

    let logStr = logStrArray.join('\n');
    if (settings.terminalStdio.actionPrefix) {
      logStr = `<${color}>[${logObj.action}]</${color}> ${logStr}`;
    }

    return __parseHtml(logStr);
  }
};
