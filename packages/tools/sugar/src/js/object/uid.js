// @ts-nocheck
// @shared
import __encryptObject from '../crypt/object';
import __crypto from 'crypto';
/**
 * @name                            uid
 * @namespace           node.object
 * @type                            Function
 * @stable
 *
 * This function allows you to generate a uniqid based on the objects you pass as parameters.
 * The uid is hashed into a SHA256 32bits string but you can specify it using the "format" parameter described above
 *
 * @param       {Object}            object          The object you want use to generate the uniqid
 * @param       {String}            [format='sha256']    The uid format that you want. Here's the available values:
 * - sha256: return a SHA256 64 characters formated string
 * - full: return the full length uid. The length can vary depending on the objects passed
 * @param       {String}            [key='sugar.js.object.uid']     The key used to encrypt the object
 * @return      {String}                                The uniqid generate based on the objects passed
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      remove crypto dependency and replace it by node native one
 *
 * @example       js
 * import uid from '@coffeekraken/sugar/node/object/uid';
 * uid({ hello: 'world' }, { plop: 'coco' }); // => ijfw89uf98jhw9ef8whef87hw7e8q87wegfh78wgf87gw8fgw8e7fzghwz8efgw8fwzuheihgbweuzf
 *
 * @since     2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function uid(obj, settings = {}) {
    settings = Object.assign({ format: 'sha256', key: 'sugar.js.object.uid' }, settings);
    // init the uid
    let uid = '';
    // loop on each arguments
    uid = __encryptObject.encrypt(obj, settings.key);
    switch (settings.format.toLowerCase()) {
        case 'full':
            // return the uid
            return uid;
            break;
        case 'sha256':
        default:
            const hash = __crypto
                .createHash('sha256')
                .update(uid)
                .digest('hex')
                .toString();
            return hash;
            break;
    }
}
export default uid;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWlkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidWlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVYsT0FBTyxlQUFlLE1BQU0saUJBQWlCLENBQUM7QUFFOUMsT0FBTyxRQUFRLE1BQU0sUUFBUSxDQUFDO0FBRTlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxTQUFTLEdBQUcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDN0IsUUFBUSxtQkFDTixNQUFNLEVBQUUsUUFBUSxFQUNoQixHQUFHLEVBQUUscUJBQXFCLElBQ3ZCLFFBQVEsQ0FDWixDQUFDO0lBRUYsZUFBZTtJQUNmLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUViLHlCQUF5QjtJQUN6QixHQUFHLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWpELFFBQVEsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUNyQyxLQUFLLE1BQU07WUFDVCxpQkFBaUI7WUFDakIsT0FBTyxHQUFHLENBQUM7WUFDWCxNQUFNO1FBQ1IsS0FBSyxRQUFRLENBQUM7UUFDZDtZQUNFLE1BQU0sSUFBSSxHQUFHLFFBQVE7aUJBQ2xCLFVBQVUsQ0FBQyxRQUFRLENBQUM7aUJBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUM7aUJBQ1gsTUFBTSxDQUFDLEtBQUssQ0FBQztpQkFDYixRQUFRLEVBQUUsQ0FBQztZQUNkLE9BQU8sSUFBSSxDQUFDO1lBQ1osTUFBTTtLQUNUO0FBQ0gsQ0FBQztBQUNELGVBQWUsR0FBRyxDQUFDIn0=