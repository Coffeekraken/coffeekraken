// @ts-nocheck
/**
 * @name      wrapInner
 * @namespace            js.dom.manipulate
 * @type      Function
 * @platform      js
 * @status        beta
 *
 * Wrap the content of the passed `$parent` inside a the passed HTMLElement `$wrapper`
 *
 * @param    {HTMLElement}    $parent    The parent to wrap inner
 * @param    {HTMLElement}    $wrapper    The wrapper element
 * @return    {HTMLElement}             Return the parent element
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import wrapInner from '@coffeekraken/sugar/js/dom/wrapInner'
 * const $myWrapper = document.createElement('div')
 * // assuming
 * // <div class="container">
 * //   <span>Hello World</span>
 * // </div>
 * wrapInner(document.querySelector('.container'), $myWrapper)
 * // return
 * // <div class="container">
 * //   <div>
 * //     <span>Hello World</span>
 * //   </div>
 * // </div>
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel@gmail.com)
 */
function wrapInner($parent, $wrapper) {
    if (typeof $wrapper === 'string') {
        $wrapper = document.createElement($wrapper);
    }
    $parent.appendChild($wrapper);
    while ($parent.firstChild !== $wrapper) {
        $wrapper.appendChild($parent.firstChild);
    }
    return $parent;
}
export default wrapInner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcElubmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid3JhcElubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNILFNBQVMsU0FBUyxDQUFDLE9BQW9CLEVBQUUsUUFBcUI7SUFDNUQsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7UUFDaEMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDN0M7SUFDRCxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlCLE9BQU8sT0FBTyxDQUFDLFVBQVUsS0FBSyxRQUFRLEVBQUU7UUFDdEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDMUM7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBQ0QsZUFBZSxTQUFTLENBQUMifQ==