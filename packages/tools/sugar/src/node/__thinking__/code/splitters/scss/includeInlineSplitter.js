"use strict";
// @ts-nocheck
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                includeInlineSplitter
 * @namespace           sugar.js.code.splitters.scss
 * @type                Object
 * @status              wip
 *
 * This represent the SCSS "@include..." splitter.
 * It will match all the inline includes like "@include something('hello');", etc...
 * and split the code accordingly
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
exports.default = {
    type: 'include.inline',
    prefix: /@include\s[a-zA-Z0-9-_\.]+/,
    suffix: /;/,
    open: '(',
    close: ')',
    exclude: [/@include Sugar\.setup\(.*\);/]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZUlubGluZVNwbGl0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5jbHVkZUlubGluZVNwbGl0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7QUFFVjs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILGtCQUFlO0lBQ2IsSUFBSSxFQUFFLGdCQUFnQjtJQUN0QixNQUFNLEVBQUUsNEJBQTRCO0lBQ3BDLE1BQU0sRUFBRSxHQUFHO0lBQ1gsSUFBSSxFQUFFLEdBQUc7SUFDVCxLQUFLLEVBQUUsR0FBRztJQUNWLE9BQU8sRUFBRSxDQUFDLDhCQUE4QixDQUFDO0NBQzFDLENBQUMifQ==