// @ts-nocheck

import __copy from '../clipboard/copy';
import __isChildProcess from '../../shared/is/childProcess';
import __packageRoot from '../path/packageRoot';
import __SError from '../../shared/error/SError';
import __parseHtml from '../../shared/console/parseHtml';
import __keypress from 'keypress';
import __hotkey from '../keyboard/hotkey';
import __toString from '../../shared/string/toString';
import __parse from '../../shared/string/parse';
import __blessed from 'blessed';
import __color from '../../shared/color/color';
import __SIpc from '../ipc/SIpc';

/**
 * @name                    handleError
 * @namespace               sugar.node.error
 * @type                    Function
 * @status              wip
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
function handleError() {
  if (process.env.NODE_ENV === 'test') return;
  if (__isChildProcess()) {
    process.on('uncaughtException', __handleChildProcessErrors);
    process.on('unhandledRejection', __handleChildProcessErrors);
  } else {
    process.on('uncaughtException', __handleMainProcessErrors);
    process.on('unhandledRejection', __handleMainProcessErrors);
  }
}

function __handleChildProcessErrors(error) {
  if (error.toString().includes(`Cannot read property 'itop' of null`)) return;
  if (error.instanceId) return;
  if (!error) return;
  const errorStringArray = [error.stack];
  console.log(errorStringArray.join('\n'));
}

function __handleMainProcessErrors(error) {
  if (error.toString().includes(`Cannot read property 'itop' of null`)) return;
  if (error.instanceId) return;

  if (error instanceof Buffer) {
    error = error.toString();
  }

  if (!(error instanceof __SError)) {
    error = new __SError(error);
  }

  setTimeout(() => {
    if (typeof error === 'string') {
      const stringErrorReg = /\s?message:\s?((.|\n)*)\s?name:\s/gm;
      const stringErrorMatches = error.match(stringErrorReg);
      console.log(error);
    } else if (typeof error === 'object' && error.name && error.message) {
      console.log([error.name, error.message, error.stack].join('\n\n'));
    } else {
      console.log(__toString(error));
    }
    process.exit(1);
  }, 50);
}
export default handleError;
