/**
 * @name        isFileAccepted
 * @namespace            js.dom.form
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Check if the passed file is accepted relative to the passed "accept" string.
 * The "accept" string does not supports the extension based accept check simply cause it will be
 * too big to maintain mimeType to extension map and will take too much weight for no reason.
 *
 * @param       {File}        file       The file to check
 * @param       {String|String[]}       accept      The "accept" string to use
 * @return      {Boolean}               true if accepted, false if not
 *
 * @snippet         __isFileAccepted($1, $2)
 * __isFileAccepted($1, $2, [
 *      'image/png',
 *      $3
 * ]);
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __isFileAccepted } from '@coffeekraken/sugar/dom'
 * __isFileAccepted(myFile, 'image/png');
 * __isFileAccepted(myFile, 'image/png, application/json');
 * __isFileAccepted(myFile, ['image/*','text/html'])
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isFileAccepted(
    file: File,
    accept: string | string[],
): boolean {
    if (!Array.isArray(accept)) {
        accept = accept.replace(/\s/gm, '').split(/,/);
    }

    const fileTypeCategory = file.type.split('/')[0],
        fileType = file.type.split('/')[1];

    for (let mimeType of accept) {
        // handle extension based accept
        if (mimeType.startsWith('.')) {
            throw new Error(
                `[isFileAccepted] The extension based check that you've passed "${mimeType}" is not supported. Make use of mime types like "text/html", "image/*", etc...`,
            );
        } else {
            // exact match
            if (mimeType === file.type) {
                return true;
            }
            // mimeType .../* check
            else if (
                mimeType.match(/\/\*$/) &&
                fileTypeCategory === mimeType.replace('/*', '')
            ) {
                return true;
            }
        }
    }

    return false;
}
