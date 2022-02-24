import __callsites from 'callsites';
import { fileURLToPath } from 'url';

/**
 * @name            dirname
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * Return the dirname the same as the __dirname cjs variable.
 * The only difference is that it's a function and you need to pass the "import" variable
 * from the filename in which you use this...
 *
 * @param       {Import}            import          The "import" variable from the file you use this function
 * @return      {String}                            The dirname path
 *
 * @example             js
 * import dirname from '@coffeekraken/sugar/node/fs/dirname';
 * dirname(import);
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function () {
    if (process.env.NODE_ENV === 'test') {
        // @ts-ignore
        return __callsites()[1].getFileName().split('/').slice(0, -1).join('/');
    }
    // @ts-ignore
    return fileURLToPath(__callsites()[1].getFileName())
        .split('/')
        .slice(0, -1)
        .join('/');
}
