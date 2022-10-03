// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import { __uniqid } from '@coffeekraken/sugar/string';
import __fs from 'fs';

/**
 * @name          SDataFileJs
 * @namespace     node
 * @type          Class
 * @status              beta
 *
 * This class represent the js/json data file loader
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDataHandlerJs {
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
    static extensions = ['js', 'json'];

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
        return new __SPromise(async ({ resolve }) => {
            let settings = {};
            if (filePath.match(/\.json$/)) {
                settings = { assert: { type: 'json' } };
            }

            let finalFilePath = filePath;
            if (filePath.match(/\.json$/)) {
                finalFilePath = filePath.replace(
                    '.json',
                    `.${__uniqid()}.json`,
                );
            } else {
                finalFilePath = filePath.replace('.js', `.${__uniqid()}.js`);
            }

            // make a copy of the file to avoid import caching
            __fs.copyFileSync(filePath, finalFilePath);

            // import the newly created file
            let data = (await import(finalFilePath, settings)).default;
            if (typeof data === 'function') data = await data();

            // delete the file
            __fs.unlinkSync(finalFilePath);

            resolve(data);
        });
    }
}
