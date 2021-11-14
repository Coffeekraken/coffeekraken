/**
 * @name                read
 * @namespace           js.clipboard
 * @type                Function
 * @platform          js
 * @async
 * @status              stable
 *
 * This function allows you to read the content of the clipboard
 *
 * @return      {Promise}                          A promise fullfilled when the content has been read correctly
 *
 * @example         js
 * import __read from '@coffeekraken/sugar/js/clipboard/read';
 * await __read();
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default async function read() {
    return navigator.clipboard.readText();
}
