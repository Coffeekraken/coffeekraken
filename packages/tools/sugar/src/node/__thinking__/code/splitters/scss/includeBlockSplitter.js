"use strict";
// @ts-nocheck
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                includeBlockSplitter
 * @namespace           sugar.js.code.splitters.scss
 * @type                Object
 * @status              wip
 *
 * This represent the SCSS "@include... { ... }" block splitter.
 * It will match all the include blocks like "@include something('hello') { ... }", etc...
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
    type: 'include.block',
    prefix: /@include\s[a-zA-Z0-9-_\.]+\([^{]*\)/,
    open: '{',
    close: '}'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZUJsb2NrU3BsaXR0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmNsdWRlQmxvY2tTcGxpdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7O0FBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxrQkFBZTtJQUNiLElBQUksRUFBRSxlQUFlO0lBQ3JCLE1BQU0sRUFBRSxxQ0FBcUM7SUFDN0MsSUFBSSxFQUFFLEdBQUc7SUFDVCxLQUFLLEVBQUUsR0FBRztDQUNYLENBQUMifQ==