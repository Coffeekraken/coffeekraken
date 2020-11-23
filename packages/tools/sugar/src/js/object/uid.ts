import __encryptObject from '../crypt/object';
import __filter from '../object/filter';
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
export default function uid(obj, settings = {}) {
  settings = {
    format: 'sha256',
    key: 'sugar.js.object.uid',
    ...settings
  };

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
