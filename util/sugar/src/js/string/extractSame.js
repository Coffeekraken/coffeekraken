/**
 * @name              extractSame
 * @namespace           js.string
 * @type              Function
 *
 * This function return you what has been find the same in the two passed string.
 * It will return you either an array of same string parts or a simple string
 * representing the first same part found.
 *
 * @param         {String}            string1         The string 1 to compare
 * @param         {String}            string2         The string 2 to compare
 * @param         {Boolean}           [multiple=false]      Specify if you want to get back multiple same string if exists as an array
 *
 * @example       js
 * import extractSame from '@coffeekraken/sugar/js/string/extractSame';
 * extractSame('Hello world', 'Hello plop'); // => 'Hello '
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function extractSame(string1, string2, multiple = false) {
  // compare letter by letter
  const extractedArray = [''];
  const chars = string1.split('');
  const chars2 = string2.split('');
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const char2 = chars2[i];
    if (i > chars2.length - 1) break;
    if (char === char2) {
      extractedArray[extractedArray.length - 1] += char;
    } else if (multiple) {
      if (extractedArray[extractedArray.length - 1] !== '')
        extractedArray.push('');
    } else {
      break;
    }
  }
  return multiple ? extractedArray : extractedArray[0];
}
