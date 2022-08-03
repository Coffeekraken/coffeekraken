"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      stripTags
 * @namespace            js.dom.manipulate
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * Strip the tags of the passed text
 *
 * @param    {String}    html    the html to process
 * @return    {String}    The html without any tags
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import stripTags from '@coffeekraken/sugar/js/dom/stripTags'
 * stripTags('<h1>Hello World</h1>') // => Hello World
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function stripTags(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}
exports.default = stripTags;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBUyxTQUFTLENBQUMsSUFBWTtJQUMzQixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLE9BQU8sR0FBRyxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztBQUNsRCxDQUFDO0FBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=