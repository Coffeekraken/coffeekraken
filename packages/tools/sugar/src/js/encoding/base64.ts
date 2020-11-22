/**
 * @name                    base64
 * @namespace           sugar.js.encoding
 * @type                    Object
 *
 * This return an object containing the "encode" and "decode" function that you can use
 * to encode/decode base64 Strings.
 *
 * @example           js
 * import base64 from '@coffeekraken/sugar/js/encoding/base64';
 * base64.encode('Hello world');
 * base64.decode('SGVsbG8gV29ybGQh');
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
  /**
   * @name        encode
   * @type        Function
   *
   * Encode in base 64
   *
   * @param       {String}       string        The string to encode
   * @return      {String}                       The encoded string
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  encode: function (string) {
    return btoa(string);
  },

  /**
   * @name        decode
   * @type        Function
   *
   * Decode the passed string
   *
   * @param       {String}      string         The string to decode
   * @return      {String}                      The decoded string
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  decode: function (string) {
    return atob(string);
  }
};
