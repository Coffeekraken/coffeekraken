"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                mediaQuerySplitter
 * @namespace           sugar.js.code.splitters.scss
 * @type                Object
 *
 * This represent the SCSS media queries splitter.
 * It will match all the media queries blocks like "@media (...) { ... }", etc...
 * and split the code accordingly
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
