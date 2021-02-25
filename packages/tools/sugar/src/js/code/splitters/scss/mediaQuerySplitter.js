// @ts-nocheck
// @shared
/**
 * @name                mediaQuerySplitter
 * @namespace           sugar.js.code.splitters.scss
 * @type                Object
 * @status              wip
 *
 * This represent the SCSS media queries splitter.
 * It will match all the media queries blocks like "@media (...) { ... }", etc...
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
    type: 'mediaQuery',
    prefix: /@media\s?\([^{]*\)\s?/,
    open: '{',
    close: '}'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWFRdWVyeVNwbGl0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVkaWFRdWVyeVNwbGl0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxlQUFlO0lBQ2IsSUFBSSxFQUFFLFlBQVk7SUFDbEIsTUFBTSxFQUFFLHVCQUF1QjtJQUMvQixJQUFJLEVBQUUsR0FBRztJQUNULEtBQUssRUFBRSxHQUFHO0NBQ1gsQ0FBQyJ9