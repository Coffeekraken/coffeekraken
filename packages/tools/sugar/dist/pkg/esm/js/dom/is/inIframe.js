// @ts-nocheck
/**
 * @name      inIframe
 * @namespace            js.dom.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Check if the page is loaded inside an iframe
 *
 * @return    {Boolean}    true if in iframe, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import inIframe from '@coffeekraken/sugar/js/dom/is/inIframe'
 * if (inIframe()) {
 *   // do something
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function inIframe() {
    try {
        return window.self !== window.top;
    }
    catch (e) {
        return true;
    }
}
export default inIframe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLFFBQVE7SUFDYixJQUFJO1FBQ0EsT0FBTyxNQUFNLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUM7S0FDckM7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7QUFDTCxDQUFDO0FBQ0QsZUFBZSxRQUFRLENBQUMifQ==