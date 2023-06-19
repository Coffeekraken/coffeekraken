// @ts-nocheck

import __parseHtml from '../../shared/console/parseHtml';
import __isChildProcess from '../../shared/is/isChildProcess';
import __toString from '../../shared/string/toString';

/**
 * @name                    handleErrors
 * @namespace            node.error
 * @type                    Function
 * @platform        node
 * @status          wip
 *
 * This function take a thrown error and try to display it the best way possible.
 * Simply add the "uncaughtException" and the "unhandledRejection" listeners on the process object,
 * pass this function as the handler one and that's it...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __handleErrors()
 *
 * @example           js
 * import { __handleErrors } from '@coffeekraken/sugar/error';
 * __handleErrors();
 *
 * @since         2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __handleErrors() {
    if (process.env.NODE_ENV === 'test') return;
    if (__isChildProcess()) {
        process.on('uncaughtException', __handleChildProcessErrors);
        process.on('unhandledRejection', __handleChildProcessErrors);
    } else {
        process.on('uncaughtException', __handleMainProcessErrors);
        process.on('unhandledRejection', __handleMainProcessErrors);
    }

    // process.on('uncaughtException', (err) => {
    //   console.log(`Uncaught Exception: ${err.message}`);
    //   process.exit(1);
    // });

    // process.on('unhandledRejection', (err, promise) => {
    //   console.log('Unhandled rejection at ', promise, `reason: ${err.message}`);
    //   process.exit(1);
    // });
}

function __handleChildProcessErrors(error) {
    if (error.toString().includes(`Cannot read property 'itop' of null`))
        return;
    if (error.instanceId) return;
    if (!error) return;
    const errorStringArray = [error.stack];
    console.log(__parseHtml(errorStringArray.join('\n')));
}

function __handleMainProcessErrors(error) {
    if (error.toString?.().includes(`Cannot read property 'itop' of null`))
        return;
    if (error.instanceId) return;

    if (error instanceof Buffer) {
        error = error.toString?.();
    }

    setTimeout(() => {
        if (typeof error === 'string') {
            console.log(__parseHtml(error));
        } else if (typeof error === 'object' && error.name && error.message) {
            console.log(
                __parseHtml(
                    [error.name, error.message, error.stack].join('\n\n'),
                ),
            );
        } else {
            console.log(__parseHtml(__toString(error)));
        }
        process.exit(1);
    }, 50);
}
