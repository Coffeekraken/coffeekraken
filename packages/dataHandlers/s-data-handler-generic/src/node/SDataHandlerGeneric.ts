// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import __SDataHandlerJs from '@coffeekraken/s-data-handler-js';
import __extension from '@coffeekraken/sugar/node/fs/extension';
import __checkPathWithMultipleExtensions from '@coffeekraken/sugar/node/fs/checkPathWithMultipleExtensions';

/**
 * @name          SDataHandlerGeneric
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
export default class SDataHandlerGeneric {
    static extensions = ['js', 'json'];
    static handle(filePath) {
        return new __SPromise(async ({ resolve, reject }) => {
            const extension = __extension(filePath),
                filePathWithoutExtension = filePath.replace(
                    `.${extension}`,
                    '',
                );

            const dataFilePath = __checkPathWithMultipleExtensions(
                `${filePathWithoutExtension}.data.${extension}`,
                SDataHandlerGeneric.extensions,
            );

            switch (__extension(dataFilePath)) {
                case 'js':
                case 'json':
                    const res = await __SDataHandlerJs.handle(dataFilePath);
                    return resolve(res);
                    break;
            }

            resolve({});
        });
    }
}
