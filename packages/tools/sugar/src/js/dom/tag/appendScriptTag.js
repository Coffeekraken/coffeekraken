// @ts-nocheck
import scriptLoaded from '../scriptLoaded';
/**
 * @name        appendScriptTag
 * @namespace            js.dom.tag
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Append a script tag either to the head or the body
 *
 * @param    {String}    src    The script src to load
 * @return    {Promise}    A promise resolved with the script tag when it has fully loaded
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import appendScriptTag from '@coffeekraken/sugar/js/dom/appendScriptTag'
 * appendScriptTag('dist/js/app.js')
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function appendScriptTag(src, $parent = document.body) {
    const $script = document.createElement('script');
    $script.src = src;
    $parent.appendChild($script);
    return scriptLoaded($script);
}
export default appendScriptTag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwZW5kU2NyaXB0VGFnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwZW5kU2NyaXB0VGFnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSxpQkFBaUIsQ0FBQztBQUUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsZUFBZSxDQUNwQixHQUFXLEVBQ1gsVUFBdUIsUUFBUSxDQUFDLElBQUk7SUFFcEMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqRCxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNsQixPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdCLE9BQU8sWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2pDLENBQUM7QUFDRCxlQUFlLGVBQWUsQ0FBQyJ9