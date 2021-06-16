// @ts-nocheck
/**
 * @name      hover
 * @namespace            js.dom.is
 * @type      Function
 * @platform        js
 * @status        beta
 *
 * Check if the mouse is hover the passed HTMLElement
 *
 * @param    {HTMLElement}    $elm    The HTMLElement to check
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import hover from '@coffeekraken/sugar/js/dom/is/hover'
 * const $myElm = document.querySelector('.my-elm')
 * if (hover($myElm)) {
 *   // do something
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function hover($elm) {
    return $elm.parentElement.querySelector(':hover') === $elm;
}
export default hover;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG92ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob3Zlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQVMsS0FBSyxDQUFDLElBQWlCO0lBQzlCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxDQUFDO0FBQzdELENBQUM7QUFDRCxlQUFlLEtBQUssQ0FBQyJ9