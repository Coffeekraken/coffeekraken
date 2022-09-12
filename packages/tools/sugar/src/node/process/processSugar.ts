// @ts-nocheck

import { __handleErrors } from '@coffeekraken/sugar/error';
import { __exitCleanup } from '@coffeekraken/sugar/process';
import { __onProcessExit } from '@coffeekraken/sugar/process';

/**
 * @name                    index
 * @namespace           node
 *
 * This file is the "initialisation" one for the sugar node toolkit.
 * It's optional to include it but if you do, you will get these features "for free":
 * - Display errors
 * - Process exit cleanup
 *
 * @example         js
 * import { __processSugar } from '@coffeekraken/sugar/process';
 * __processSugar();
 * 
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __processSugar() {
    // handle the errors
    __handleErrors();

    // exit cleanup
    __onProcessExit(() => {
        return __exitCleanup;
    });
}
