// @ts-nocheck

/**
 * @name        replaceChunks
 * @namespace            shared.string
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Replace the passed "chunks" with the result of the passed replacer function.
 * The replacer function take as argument the token value
 *
 * @param    {String}    string    The string to process
 * @param     {String[]}        chunks      The chunks to replace
 * @param       {Function}          replacer        The replacer function that need to return a string with which you want to replace the token
 * @return      {String}                        The new string with replaced chunks
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __replaceChunks($1, [$2], $3)
 * _replaceChunks($1, [$2], (token) => {
 *      return $3;
 * });
 *
 * @example    js
 * import { __replaceChunks } from '@coffeekraken/sugar/string'
 * __replaceChunks('hello world', ['or'], (token) => {
 *      return `<span>${token}</span>;
 * }) // Hello w<span>or</span>ld
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __replaceChunks(
    string: string,
    chunks: string[],
    replacer: Function,
): string {
    const reg = new RegExp(chunks.join('|'), 'gi');
    return string.replace(reg, (str) => {
        return replacer(str);
    });
}
