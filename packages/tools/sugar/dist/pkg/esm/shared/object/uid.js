// @ts-nocheck
import __crypto from 'crypto';
import __encryptObject from '../crypto/object';
/**
 * @name                            uid
 * @namespace           node.object
 * @type                            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function allows you to generate a uniqid based on the objects you pass as parameters.
 * The uid is hashed into a SHA256 32bits string but you can specify it using the "format" parameter described above
 *
 * @param       {Object}            object          The object you want use to generate the uniqid
 * @param       {String}            [format='sha256']    The uid format that you want. Here's the available values:
 * - sha256: return a SHA256 64 characters formated string
 * - full: return the full length uid. The length can vary depending on the objects passed
 * @param       {String}            [key='sugar.shared.object.uid']     The key used to encrypt the object
 * @return      {String}                                The uniqid generate based on the objects passed
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
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function uid(obj, settings = {}) {
    settings = Object.assign({ format: 'sha256', key: 'sugar.shared.object.uid' }, settings);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSxRQUFRLENBQUM7QUFDOUIsT0FBTyxlQUFlLE1BQU0sa0JBQWtCLENBQUM7QUFFL0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ0gsU0FBUyxHQUFHLENBQUMsR0FBRyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQzNCLFFBQVEsbUJBQ0osTUFBTSxFQUFFLFFBQVEsRUFDaEIsR0FBRyxFQUFFLHlCQUF5QixJQUMzQixRQUFRLENBQ2QsQ0FBQztJQUVGLGVBQWU7SUFDZixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFFYix5QkFBeUI7SUFDekIsR0FBRyxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVqRCxRQUFRLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDbkMsS0FBSyxNQUFNO1lBQ1AsaUJBQWlCO1lBQ2pCLE9BQU8sR0FBRyxDQUFDO1lBQ1gsTUFBTTtRQUNWLEtBQUssUUFBUSxDQUFDO1FBQ2Q7WUFDSSxNQUFNLElBQUksR0FBRyxRQUFRO2lCQUNoQixVQUFVLENBQUMsUUFBUSxDQUFDO2lCQUNwQixNQUFNLENBQUMsR0FBRyxDQUFDO2lCQUNYLE1BQU0sQ0FBQyxLQUFLLENBQUM7aUJBQ2IsUUFBUSxFQUFFLENBQUM7WUFDaEIsT0FBTyxJQUFJLENBQUM7WUFDWixNQUFNO0tBQ2I7QUFDTCxDQUFDO0FBQ0QsZUFBZSxHQUFHLENBQUMifQ==