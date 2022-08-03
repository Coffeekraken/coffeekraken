"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const object_1 = __importDefault(require("../crypt/object"));
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
exports.default = uid;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9EQUE4QjtBQUM5Qiw2REFBOEM7QUFFOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ0gsU0FBUyxHQUFHLENBQUMsR0FBRyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQzNCLFFBQVEsbUJBQ0osTUFBTSxFQUFFLFFBQVEsRUFDaEIsR0FBRyxFQUFFLHlCQUF5QixJQUMzQixRQUFRLENBQ2QsQ0FBQztJQUVGLGVBQWU7SUFDZixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFFYix5QkFBeUI7SUFDekIsR0FBRyxHQUFHLGdCQUFlLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFakQsUUFBUSxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFFO1FBQ25DLEtBQUssTUFBTTtZQUNQLGlCQUFpQjtZQUNqQixPQUFPLEdBQUcsQ0FBQztZQUNYLE1BQU07UUFDVixLQUFLLFFBQVEsQ0FBQztRQUNkO1lBQ0ksTUFBTSxJQUFJLEdBQUcsZ0JBQVE7aUJBQ2hCLFVBQVUsQ0FBQyxRQUFRLENBQUM7aUJBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUM7aUJBQ1gsTUFBTSxDQUFDLEtBQUssQ0FBQztpQkFDYixRQUFRLEVBQUUsQ0FBQztZQUNoQixPQUFPLElBQUksQ0FBQztZQUNaLE1BQU07S0FDYjtBQUNMLENBQUM7QUFDRCxrQkFBZSxHQUFHLENBQUMifQ==