// @ts-nocheck

import __SDataFileJs from '@coffeekraken/s-data-file-js';
import __SDataFilePhp from '@coffeekraken/s-data-file-php';
import __SPromise from '@coffeekraken/s-promise';
import __checkPathWithMultipleExtensions from '@coffeekraken/sugar/node/fs/checkPathWithMultipleExtensions';
import __extension from '@coffeekraken/sugar/node/fs/extension';
import __fs from 'fs';

/**
 * @name          SDataFileGeneric
 * @namespace     node
 * @type          Class
 * @status              beta
 *
 * This class represent the generic data file loader.
 * It actually regroup all the other data file loader into one single for convinience.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDataHandlerGeneric {
    /**
     * @name          extensions
     * @type          String[]
     * @default         ['js', 'json']
     * @static
     *
     * This static property allow you to define the extensions that the data file loader
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static extensions = ['php', 'js', 'json'];

    /**
     * @name          load
     * @type          Function
     * @static
     *
     * This static method allows you to actually load a data file
     *
     * @param       {String}      filePath      The file path to take care
     * @return      {SPromise}                  An SPromise instance that will be resolved with the resulting object
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static load(filePath) {
        return new __SPromise(async ({ resolve, reject }) => {
            const extension = __extension(filePath),
                filePathWithoutExtension = filePath.replace(
                    `.${extension}`,
                    '',
                );

            let dataFilePath = filePath;
            if (
                !__fs.existsSync(dataFilePath) ||
                !SDataHandlerGeneric.extensions.includes(extension)
            ) {
                dataFilePath = __checkPathWithMultipleExtensions(
                    `${filePathWithoutExtension}.data.${extension}`,
                    SDataHandlerGeneric.extensions,
                );
            }

            if (!dataFilePath) {
                return resolve({});
            }

            switch (__extension(dataFilePath)) {
                case 'php':
                    return resolve(await __SDataFilePhp.load(dataFilePath));
                    break;
                case 'js':
                case 'json':
                    return resolve(await __SDataFileJs.load(dataFilePath));
                    break;
            }

            resolve({});
        });
    }
}
