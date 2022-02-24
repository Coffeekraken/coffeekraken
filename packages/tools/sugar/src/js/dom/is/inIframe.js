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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5JZnJhbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbklmcmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBUyxRQUFRO0lBQ2IsSUFBSTtRQUNBLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDO0tBQ3JDO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixPQUFPLElBQUksQ0FBQztLQUNmO0FBQ0wsQ0FBQztBQUNELGVBQWUsUUFBUSxDQUFDIn0=