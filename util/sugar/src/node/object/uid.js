const __machineId = require('node-machine-id');
const __encryptObject = require('../crypt/object');
const __filter = require('./filter');
const __crypto = require('crypto');

/**
 * @name                            uid
 * @namespace                       sugar.node.object
 * @type                            Function
 * 
 * This function allows you to generate a uniqid based on the objects you pass as parameters.
 * The uid is hashed into a SHA256 32bits string but you can specify it using the "format" parameter described above
 * 
 * @param       {Object}            objects...          The objects you want use to generate the uniqid
 * @param       {String}            [format='sha256']    The uid format that you want. Here's the available values:
 * - sha256: return a SHA256 64 characters formated string
 * - full: return the full length uid. The length can vary depending on the objects passed
 * @return      {String}                                The uniqid generate based on the objects passed
 * 
 * @example       js
 * const uid = require('@coffeekraken/sugar/node/object/uid');
 * uid({ hello: 'world' }, { plop: 'coco' }); // => ijfw89uf98jhw9ef8whef87hw7e8q87wegfh78wgf87gw8fgw8e7fzghwz8efgw8fwzuheihgbweuzf
 * 
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function uid() {
  // init the uid
  let uid = '';

  // get the machineid
  const machineId = __machineId.machineIdSync();

  let format = 'sha256';
  const args = __filter(Object.assign(arguments), item => {
    if (typeof item === 'string') {
      format = item;
      return false;
    }
    return true;
  });

  // loop on each arguments
  Object.keys(args).forEach(idx => {
    uid += __encryptObject.encrypt(args[idx], machineId);
  });

  switch (format.toLowerCase()) {
    case 'full':
      // return the uid
      return uid;
      break;
    case 'sha256':
    default:
      let hash = __crypto.createHash('sha256').update(uid).digest('hex').toString();
      return hash;
      break;
  }

}