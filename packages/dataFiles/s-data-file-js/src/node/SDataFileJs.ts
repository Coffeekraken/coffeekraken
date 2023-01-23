// @ts-nocheck

import { __readJsonSync } from '@coffeekraken/sugar/fs';
import { __uniqid } from '@coffeekraken/sugar/string';

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
        return new Promise(async (resolve) => {
            // import the newly created file
            let data = {};
            if (filePath.match(/\.json$/)) {
                data = __readJsonSync(filePath);
            } else {
                data = (await import(`${filePath}?${__uniqid()}`)).default;
            }
            if (typeof data === 'function') data = await data();
            resolve(data);
        });
    }
}
