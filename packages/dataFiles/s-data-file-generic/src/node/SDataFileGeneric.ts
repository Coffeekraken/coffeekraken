// @ts-nocheck

import __SDataFileJs from '@coffeekraken/s-data-file-js';
import __SDataFilePhp from '@coffeekraken/s-data-file-php';
import {
    __checkPathWithMultipleExtensions,
    __extension
} from '@coffeekraken/sugar/fs';
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
export default class SDataFileGeneric {
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
     * @return      {Promise}                  An Promise instance that will be resolved with the resulting object
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static load(filePath) {
        return new Promise(async (resolve) => {
            const extension = __extension(filePath),
                filePathWithoutExtension = filePath
                    .replace(`.${extension}`, '')
                    .replace(/\.(data|spec)\.[a-zA-Z0-9]+$/, '');

            let dataFilePath = filePath;

            if (!dataFilePath?.match(/\.data\.[a-zA-Z0-9]+$/)) {
                dataFilePath = null;
            }

            if (dataFilePath && __fs.existsSync(dataFilePath)) {
                // direct data file reference
            } else {
                dataFilePath = __checkPathWithMultipleExtensions(
                    `${filePathWithoutExtension}`
                    SDataFileGeneric.extensions.map(p => `data.${p}`)
                );
            }

            // make sure the file is a .data.something...
            if (!dataFilePath?.match(/\.data\.[a-zA-Z0-9]+$/)) {
                dataFilePath = null;
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
