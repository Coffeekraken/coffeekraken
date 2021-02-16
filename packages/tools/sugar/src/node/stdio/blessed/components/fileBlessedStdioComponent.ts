// @ts-nocheck

import __parseHtml from '../../../console/parseHtml';
import __toString from '../../../string/toString';
import __SBlessedComponent from '../../../blessed/SBlessedComponent';
import __SFile from '../../../fs/SFile';

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

    let color;

    switch (action) {
      case 'save':
        color = 'yellow';
        logStrArray.push(
          `<yellow>[save]</yellow> File "<cyan>${file.relPath}</cyan>"`
        );
        break;
      case 'saved':
        color = 'green';
        let str = `<green>[save]</green> File "<cyan>${file.relPath}</cyan>" <green>saved successfully</green>`;
        if (logObj.to) {
          str += ` to "<magenta>${logObj.to}</magenta>"`;
        }
        logStrArray.push(str);
        break;
      case 'delete':
        color = 'yellow';
        logStrArray.push(
          `<yellow>[delete]</yellow> File "<cyan>${file.relPath}</cyan>"`
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
          `<yellow>[update]</yellow> File "<cyan>${file.relPath}</cyan>"`
        );
        break;
    }

    let logStr = logStrArray.join('\n');
    if (settings.blessedStdio.actionPrefix) {
      logStr = `<${color}>[${logObj.action}]</${color}> ${logStr}`;
    }

    logStr = __parseHtml(logStr);

    const $component = new __SBlessedComponent({
      blessed: {
        width: '100%',
        height: 0,
        style: {}
      }
    });
    $component.on('update', () => {
      $component.setContent(logStr);
      $component.height = $component.realHeight;
    });
    return $component;
  }
};
