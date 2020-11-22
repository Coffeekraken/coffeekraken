"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                includeBlockSplitter
 * @namespace           sugar.js.code.splitters.scss
 * @type                Object
 *
 * This represent the SCSS "@include... { ... }" block splitter.
 * It will match all the include blocks like "@include something('hello') { ... }", etc...
 * and split the code accordingly
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
