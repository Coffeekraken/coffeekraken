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
 @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isFileAccepted(file, accept) {
    if (!Array.isArray(accept)) {
        accept = accept.replace(/\s/gm, '').split(/,/);
    }
    const fileTypeCategory = file.type.split('/')[0], fileType = file.type.split('/')[1];
    for (let mimeType of accept) {
        // handle extension based accept
        if (mimeType.startsWith('.')) {
            throw new Error(`[isFileAccepted] The extension based check that you've passed "${mimeType}" is not supported. Make use of mime types like "text/html", "image/*", etc...`);
        }
        else {
            // exact match
            if (mimeType === file.type) {
                return true;
            }
            // mimeType .../* check
            else if (mimeType.match(/\/\*$/) &&
                fileTypeCategory === mimeType.replace('/*', '')) {
                return true;
            }
        }
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGdCQUFnQixDQUNwQyxJQUFVLEVBQ1YsTUFBeUI7SUFFekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDeEIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNsRDtJQUVELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzVDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV2QyxLQUFLLElBQUksUUFBUSxJQUFJLE1BQU0sRUFBRTtRQUN6QixnQ0FBZ0M7UUFDaEMsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzFCLE1BQU0sSUFBSSxLQUFLLENBQ1gsa0VBQWtFLFFBQVEsZ0ZBQWdGLENBQzdKLENBQUM7U0FDTDthQUFNO1lBQ0gsY0FBYztZQUNkLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ3hCLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFDRCx1QkFBdUI7aUJBQ2xCLElBQ0QsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7Z0JBQ3ZCLGdCQUFnQixLQUFLLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUNqRDtnQkFDRSxPQUFPLElBQUksQ0FBQzthQUNmO1NBQ0o7S0FDSjtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUMifQ==