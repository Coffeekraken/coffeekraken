import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';

export default function (env) {
    if (env.platform !== 'node') return;

    return {
        // /**
        //  * @name              dirs
        //  * @namespace         config.core.sugarJson
        //  * @type              String|Array<String>
        //  * @default           []
        //  *
        //  * Set the directories where to search for sugar.json files
        //  *
        //  * @since             2.0.0
        //  * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        //  */
        // dirs: [__packageRoot(__dirname()), __packageRoot()],
        // /**
        //  * @name              imports
        //  * @namespace         config.core.sugarJson
        //  * @type              String|Array<String>
        //  * @default           all
        //  *
        //  * Specify what you want to import. Can be "all" or an Array of NPM packages names
        //  *
        //  * @since             2.0.0
        //  * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        //  */
        // imports: 'all',
        // /**
        //  * @name              exclude
        //  * @namespace         config.core.sugarJson
        //  * @type              String|Array<String>
        //  * @default           []
        //  *
        //  * Specify some NPM packages you want to exclude by adding his name into this array
        //  *
        //  * @since             2.0.0
        //  * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        //  */
        // exclude: [],
    };
}
