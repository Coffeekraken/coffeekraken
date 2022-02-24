/**
 * @name            stripDocblocks
 * @namespace       shared.string
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function simply take a string and get rid of all docblocks
 *
 * @param       {String}            str         The string to process
 * @return      {String}                        The processed string
 *
 * @example         js
 * import __stripDocblocks from '@coffeekraken/sugar/shared/string/stripDocblocks';
 * __stripDocblocks('...');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function stripDocblocks(str: string): string {
    return str.replace(/(\/\*{2})([\s\S]+?)(\*\/)/gm, '');
}
