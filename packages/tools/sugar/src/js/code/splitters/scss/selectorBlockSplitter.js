// @ts-nocheck
// @shared
/**
 * @name                selectorBlockSplitter
 * @namespace           sugar.js.code.splitters.scss
 * @type                Object
 * @status              wip
 *
 * This represent the SCSS selectors splitter.
 * It will match all the selectors blocks like ".hello #world, p:before { ... }", etc...
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
    type: 'selector.block',
    prefix: /(^(?!.*@media)[\t ]*([a-zA-Z#.:*[][^{\/]*\s*)\s?){/m,
    prefixMatchIdx: 1,
    open: '{',
    close: '}'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3JCbG9ja1NwbGl0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VsZWN0b3JCbG9ja1NwbGl0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxlQUFlO0lBQ2IsSUFBSSxFQUFFLGdCQUFnQjtJQUN0QixNQUFNLEVBQUUscURBQXFEO0lBQzdELGNBQWMsRUFBRSxDQUFDO0lBQ2pCLElBQUksRUFBRSxHQUFHO0lBQ1QsS0FBSyxFQUFFLEdBQUc7Q0FDWCxDQUFDIn0=