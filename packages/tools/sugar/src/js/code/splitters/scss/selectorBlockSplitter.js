// @ts-nocheck
// @shared
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3JCbG9ja1NwbGl0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VsZWN0b3JCbG9ja1NwbGl0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7SUFFVjs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNILGtCQUFlO1FBQ2IsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixNQUFNLEVBQUUscURBQXFEO1FBQzdELGNBQWMsRUFBRSxDQUFDO1FBQ2pCLElBQUksRUFBRSxHQUFHO1FBQ1QsS0FBSyxFQUFFLEdBQUc7S0FDWCxDQUFDIn0=