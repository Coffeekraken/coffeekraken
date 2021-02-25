// @ts-nocheck
// @shared
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
export default {
    type: 'include.inline',
    prefix: /@include\s[a-zA-Z0-9-_\.]+/,
    suffix: /;/,
    open: '(',
    close: ')',
    exclude: [/@include Sugar\.setup\(.*\);/]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZUlubGluZVNwbGl0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5jbHVkZUlubGluZVNwbGl0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxlQUFlO0lBQ2IsSUFBSSxFQUFFLGdCQUFnQjtJQUN0QixNQUFNLEVBQUUsNEJBQTRCO0lBQ3BDLE1BQU0sRUFBRSxHQUFHO0lBQ1gsSUFBSSxFQUFFLEdBQUc7SUFDVCxLQUFLLEVBQUUsR0FBRztJQUNWLE9BQU8sRUFBRSxDQUFDLDhCQUE4QixDQUFDO0NBQzFDLENBQUMifQ==