// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';

/**
 * @name          js
 * @namespace     node
 * @type          Function
 * @status              beta
 *
 * This function simply take the .data.js file path and return
 * the resulting object
 *
 * @param       {String}      filePath      The file path to take care
 * @return      {SPromise}                  An SPromise instance that will be resolved with the resulting object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDataHandlerJs {
    static extensions = ['js', 'json'];
    static handle(filePath) {
        return new __SPromise(async ({ resolve }) => {
            let data = (await import(filePath)).default;
            if (typeof data === 'function') data = await data();
            resolve(data);
        });
    }
}
