// @ts-nocheck

import __parseHtml from '../../shared/console/parseHtml';
import __SError from '../../shared/error/SError';
import __isChildProcess from '../../node/is/childProcess';
import __toString from '../../shared/string/toString';

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
  console.log(__parseHtml(errorStringArray.join('\n')));
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
      console.log(__parseHtml(error));
    } else if (typeof error === 'object' && error.name && error.message) {
      console.log(
        __parseHtml([error.name, error.message, error.stack].join('\n\n'))
      );
    } else {
      console.log(__parseHtml(__toString(error)));
    }
    process.exit(1);
  }, 50);
}
export default handleError;
