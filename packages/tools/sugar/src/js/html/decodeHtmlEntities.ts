// @ts-nocheck

/**
 * @name        decodeHtmlEntities
 * @namespace            js.string
 * @type      Function
 * @stable
 *
 * Decode an htmlentities encoded string
 *
 * @param 			{String} 			string 			The string to decode
 * @return 			{String} 							The decoded string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import decodeHtmlEntities from '@coffeekraken/sugar/js/string/decodeHtmlEntities';
 * decodeHtmlEntities('&#111;&#108;&#105;&#118;&#105;&#101;&#114;&#046;&#098;&#111;&#115;&#115;&#101;&#108;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;');
 * // return => olivier.bossel@gmail.com
 *
 * @since           1.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function decodeHtmlEntities(string) {
  const txt = document.createElement('textarea');
  txt.innerHTML = string;
  return txt.value;
}
export default decodeHtmlEntities;
