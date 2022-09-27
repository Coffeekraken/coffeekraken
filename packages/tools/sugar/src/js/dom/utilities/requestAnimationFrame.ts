// @ts-nocheck

/**
 * @name      requestAnimationFrame
 * @namespace            js.dom.utils
 * @type      Function
 * @platform       js
 * @status      beta
 *
 * Proxy for the window.requestAnimationFrame function
 *
 * @param       {Function}      cb          The function to call when it's time to update your animation for the next repaint
 * @return      {Integer}                   A long integer value, the request id, that uniquely identifies the entry in the callback list
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * @import { __requestAnimationFrame } from '@coffeekraken/sugar/dom';
 * __requestAnimationFrame(function() {
 *    // do something...
 * });
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

let requestAnimationFrame;
try {
    requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame;
} catch (e) {}

export default requestAnimationFrame;
