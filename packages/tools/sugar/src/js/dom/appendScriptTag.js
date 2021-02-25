// @ts-nocheck
import scriptLoaded from './scriptLoaded';
/**
 * @name        appendScriptTag
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwZW5kU2NyaXB0VGFnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwZW5kU2NyaXB0VGFnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSxnQkFBZ0IsQ0FBQztBQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsU0FBUyxlQUFlLENBQUMsR0FBRyxFQUFFLE9BQU8sR0FBRyxRQUFRLENBQUMsSUFBSTtJQUNuRCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pELE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2xCLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0IsT0FBTyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUNELGVBQWUsZUFBZSxDQUFDIn0=