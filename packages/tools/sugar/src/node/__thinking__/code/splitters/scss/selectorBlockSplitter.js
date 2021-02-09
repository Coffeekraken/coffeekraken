"use strict";
// @ts-nocheck
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = {
    type: 'selector.block',
    prefix: /(^(?!.*@media)[\t ]*([a-zA-Z#.:*[][^{\/]*\s*)\s?){/m,
    prefixMatchIdx: 1,
    open: '{',
    close: '}'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3JCbG9ja1NwbGl0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VsZWN0b3JCbG9ja1NwbGl0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7QUFFVjs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILGtCQUFlO0lBQ2IsSUFBSSxFQUFFLGdCQUFnQjtJQUN0QixNQUFNLEVBQUUscURBQXFEO0lBQzdELGNBQWMsRUFBRSxDQUFDO0lBQ2pCLElBQUksRUFBRSxHQUFHO0lBQ1QsS0FBSyxFQUFFLEdBQUc7Q0FDWCxDQUFDIn0=