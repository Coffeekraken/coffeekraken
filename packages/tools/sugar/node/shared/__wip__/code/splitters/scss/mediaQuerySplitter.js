"use strict";
// @ts-nocheck
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = {
    type: 'mediaQuery',
    prefix: /@media\s?\([^{]*\)\s?/,
    open: '{',
    close: '}'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWFRdWVyeVNwbGl0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3NoYXJlZC9fX3dpcF9fL2NvZGUvc3BsaXR0ZXJzL3Njc3MvbWVkaWFRdWVyeVNwbGl0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7QUFFVjs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILGtCQUFlO0lBQ2IsSUFBSSxFQUFFLFlBQVk7SUFDbEIsTUFBTSxFQUFFLHVCQUF1QjtJQUMvQixJQUFJLEVBQUUsR0FBRztJQUNULEtBQUssRUFBRSxHQUFHO0NBQ1gsQ0FBQyJ9