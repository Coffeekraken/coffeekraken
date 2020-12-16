// @ts-nocheck

import __copy from '../clipboard/copy';
import __isChildProcess from '../is/childProcess';
import __packageRoot from '../path/packageRoot';
import __SError from '../error/SError';
import __parseHtml from '../terminal/parseHtml';
import __keypress from 'keypress';
import __hotkey from '../keyboard/hotkey';
import __toString from '../string/toString';
import __parse from '../string/parse';
import __blessed from 'blessed';
import __color from '../color/color';
import __SIpc from '../ipc/SIpc';

/**
 * @name                    handleError
 * @namespace               sugar.node.error
 * @type                    Function
 * @wip
 *
 * This function take a thrown error and try to display it the best way possible.
 * Simply add the "uncaughtException" and the "unhandledRejection" listeners on the process object,
 * pass this function as the handler one and that's it...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import handleError from '@coffeekraken/sugar/node/error/handleError';
 * process.on('uncaughtException', handleError);
 * process.on('unhandledRejection', handleError);
 *
 * @since         2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const errorPanels = [];

function handleError() {
  if (process.env.NODE_ENV === 'test') return;

  if (__isChildProcess()) {
    process.on('uncaughtException', __handleChildProcessErrors);
    process.on('unhandledRejection', __handleChildProcessErrors);
  } else {
    process.on('uncaughtException', __handleMainProcessErrors);
    process.on('unhandledRejection', __handleMainProcessErrors);
    __hotkey('escape', {}).on('press', () => {
      if (!errorPanels.length) return;
      const $panel = errorPanels.pop();
      $panel.destroy();
    });
  }
}

function createErrorPanel(error) {
  if (!global.screen) return;
  const $bg = __blessed.box({
    width: '100%-10',
    height: '100%-6',
    top: 3,
    left: 5,
    style: {
      bg: __color('terminal.red').toString()
    },
    padding: {
      top: 1,
      left: 2,
      right: 2,
      bottom: 1
    }
  });

  const $box = __blessed.box({
    width: '100%-4',
    height: '100%-2',
    top: 0,
    left: 0,
    style: {
      fg: 'white',
      bg: __color('terminal.black').toString(),
      scrollbar: {
        bg: __color('terminal.primary').toString()
      }
    },
    scrollable: true,
    scrollbar: {
      ch: ' ',
      inverse: true
    },
    padding: {
      top: 1,
      left: 2,
      right: 2,
      bottom: 1
    },
    content: __toString(error)
  });

  $bg.append($box);
  global.screen.append($bg);

  errorPanels.push($bg);

  $bg.focus();
}

function __handleChildProcessErrors(error) {
  if (error.toString().includes(`Cannot read property 'itop' of null`)) return;
  if (error.instanceId) return;
  // // error = error.toString();
  if (!error) return;

  const errorStringArray = [error.stack];

  // __SIpc.trigger('error', errorStringArray.join('\n'));
  console.log(errorStringArray.join('\n'));

  // process.exit(1);
}

function __handleMainProcessErrors(error) {
  // @TODO     find a better solution to avoid blessed issues
  if (error.toString().includes(`Cannot read property 'itop' of null`)) return;
  if (error.instanceId) return;

  if (!global.screen) {
    throw error;
  }

  if (error instanceof Buffer) {
    error = error.toString();
  }

  if (typeof error === 'string') {
    const stringErrorReg = /\s?message:\s?((.|\n)*)\s?name:\s/gm;
    const stringErrorMatches = error.match(stringErrorReg);

    console.log(error);

    if (stringErrorMatches) {
      const errorString = __parse(
        stringErrorMatches[0]
          .replace(/\s?message:\s?/, '')
          .replace(/\s?name:\s?/, '')
          .trim()
          .replace(/,$/, '')
      );
      createErrorPanel(errorString);
      return;
    }
  } else if (typeof error === 'object' && error.name && error.message) {
    createErrorPanel(`${error.name}

    ${error.message}

    ${error.stack}
    `);
    return;
  } else {
    createErrorPanel(__toString(error));
    return;
  }
}
export = handleError;
