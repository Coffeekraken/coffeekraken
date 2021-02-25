// @ts-nocheck
// @shared
/**
 * @name                mixinBlockSplitter
 * @namespace           sugar.js.code.splitters.scss
 * @type                Object
 * @status              wip
 *
 * This represent the SCSS mixin splitter.
 * It will match all the mixin blocks like "@mixin something(...) { ... }", etc...
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
    type: 'mixin.block',
    prefix: /@mixin\s[a-zA-Z0-9-_\.]+\([^{]*\)/,
    open: '{',
    close: '}'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4aW5CbG9ja1NwbGl0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWl4aW5CbG9ja1NwbGl0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxlQUFlO0lBQ2IsSUFBSSxFQUFFLGFBQWE7SUFDbkIsTUFBTSxFQUFFLG1DQUFtQztJQUMzQyxJQUFJLEVBQUUsR0FBRztJQUNULEtBQUssRUFBRSxHQUFHO0NBQ1gsQ0FBQyJ9