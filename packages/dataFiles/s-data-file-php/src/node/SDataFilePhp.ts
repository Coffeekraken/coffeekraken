// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import __execPhp from '@coffeekraken/sugar/node/php/execPhp';
import __path from 'path';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';

/**
 * @name          SDataFilePhp
 * @namespace     node
 * @type          Class
 * @status              beta
 *
 * This class represent the php data file loader
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDataFilePhp {
    /**
     * @name          extensions
     * @type          String[]
     * @default         ['php']
     * @static
     *
     * This static property allow you to define the extensions that the data file loader
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static extensions = ['php'];

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
            const data = await __execPhp(
                __path.resolve(__packageRoot(__dirname()), 'src/php/data.php'),
                {
                    filePath,
                },
                {},
            );
            resolve(JSON.parse(data));
        });
    }
}
