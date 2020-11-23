"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = __importDefault(require("../crypt/object"));
const filter_1 = __importDefault(require("../object/filter"));
const crypto_1 = __importDefault(require("crypto"));
/**
 * @name                            uid
 * @namespace           node.object
 * @type                            Function
 *
 * This function allows you to generate a uniqid based on the objects you pass as parameters.
 * The uid is hashed into a SHA256 32bits string but you can specify it using the "format" parameter described above
 *
 * @param       {Object}            objects...          The objects you want use to generate the uniqid
 * @param       {String}            [format='sha256']    The uid format that you want. Here's the available values:
 * - sha256: return a SHA256 64 characters formated string
 * - full: return the full length uid. The length can vary depending on the objects passed
 * @param       {String}            [key='sugar.js.object.uid']     The key used to encrypt the object
 * @return      {String}                                The uniqid generate based on the objects passed
 *
 * @example       js
 * import uid from '@coffeekraken/sugar/node/object/uid';
 * uid({ hello: 'world' }, { plop: 'coco' }); // => ijfw89uf98jhw9ef8whef87hw7e8q87wegfh78wgf87gw8fgw8e7fzghwz8efgw8fwzuheihgbweuzf
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function uid() {
    // init the uid
    let uid = '';
    let format = 'sha256';
    let key = 'sugar.js.object.uid';
    const args = filter_1.default(Object.assign(arguments), (item) => {
        if (typeof item === 'string') {
            if (['sha256', 'full'].indexOf(item) !== -1) {
                format = item;
            }
            else {
                key = item;
            }
            return false;
        }
        return true;
    });
    // loop on each arguments
    Object.keys(args).forEach((idx) => {
        uid += object_1.default.encrypt(args[idx], key);
    });
    switch (format.toLowerCase()) {
        case 'full':
            // return the uid
            return uid;
            break;
        case 'sha256':
        default:
            let hash = crypto_1.default
                .createHash('sha256')
                .update(uid)
                .digest('hex')
                .toString();
            return hash;
            break;
    }
}
exports.default = uid;
