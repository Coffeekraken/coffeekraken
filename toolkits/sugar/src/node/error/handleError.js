const __isChildProcess = require('../is/childProcess');
const __packageRoot = require('../path/packageRoot');
const __SError = require('../error/SError');
const __parseHtml = require('../terminal/parseHtml');
const __keypress = require('keypress');
const __hotkey = require('../keyboard/hotkey');
const __toString = require('../string/toString');
const __parse = require('../string/parse');
const __blessed = require('blessed');
const __color = require('../color/color');

/**
 * @name                    handleError
 * @namespace               node.error
 * @type                    Function
 *
 * This function take a thrown error and try to display it the best way possible.
 * Simply add the "uncaughtException" and the "unhandledRejection" listeners on the process object,
 * pass this function as the handler one and that's it...
 *
 * @example           js
 * const handleError = require('@coffeekraken/sugar/node/error/handleError');
 * process.on('uncaughtException', handleError);
 * process.on('unhandledRejection', handleError);
 *
 * @since         2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const errorPanels = [];
module.exports = function handleError() {
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
};

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
  error = error.toString();
  console.error(error);
}

function __handleMainProcessErrors(error) {
  // @TODO     find a better solution to avoid blessed issues
  if (error.toString().includes(`Cannot read property 'itop' of null`)) return;

  if (!global.screen) {
    throw error;
  }

  if (error instanceof Buffer) {
    error = error.toString();
  }

  if (typeof error === 'string') {
    const stringErrorReg = /\s?message:\s?((.|\n)*)\s?name:\s/gm;
    const stringErrorMatches = error.match(stringErrorReg);

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
    `);
    return;
  } else {
    createErrorPanel(__toString(error));
    return;
  }
}
