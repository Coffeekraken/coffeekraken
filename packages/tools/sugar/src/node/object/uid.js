"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const object_1 = __importDefault(require("../crypt/object"));
const crypto_1 = __importDefault(require("crypto"));
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
    uid = object_1.default.encrypt(obj, settings.key);
    switch (settings.format.toLowerCase()) {
        case 'full':
            // return the uid
            return uid;
            break;
        case 'sha256':
        default:
            const hash = crypto_1.default
                .createHash('sha256')
                .update(uid)
                .digest('hex')
                .toString();
            return hash;
            break;
    }
}
module.exports = uid;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWlkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidWlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7OztBQUVWLDZEQUE4QztBQUU5QyxvREFBOEI7QUFFOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILFNBQVMsR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUM3QixRQUFRLG1CQUNOLE1BQU0sRUFBRSxRQUFRLEVBQ2hCLEdBQUcsRUFBRSxxQkFBcUIsSUFDdkIsUUFBUSxDQUNaLENBQUM7SUFFRixlQUFlO0lBQ2YsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBRWIseUJBQXlCO0lBQ3pCLEdBQUcsR0FBRyxnQkFBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWpELFFBQVEsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUNyQyxLQUFLLE1BQU07WUFDVCxpQkFBaUI7WUFDakIsT0FBTyxHQUFHLENBQUM7WUFDWCxNQUFNO1FBQ1IsS0FBSyxRQUFRLENBQUM7UUFDZDtZQUNFLE1BQU0sSUFBSSxHQUFHLGdCQUFRO2lCQUNsQixVQUFVLENBQUMsUUFBUSxDQUFDO2lCQUNwQixNQUFNLENBQUMsR0FBRyxDQUFDO2lCQUNYLE1BQU0sQ0FBQyxLQUFLLENBQUM7aUJBQ2IsUUFBUSxFQUFFLENBQUM7WUFDZCxPQUFPLElBQUksQ0FBQztZQUNaLE1BQU07S0FDVDtBQUNILENBQUM7QUFDRCxpQkFBUyxHQUFHLENBQUMifQ==