"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                includeInlineSplitter
 * @namespace           sugar.js.code.splitters.scss
 * @type                Object
 *
 * This represent the SCSS "@include..." splitter.
 * It will match all the inline includes like "@include something('hello');", etc...
 * and split the code accordingly
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
exports.default = {
    type: 'include.inline',
    prefix: /@include\s[a-zA-Z0-9-_\.]+/,
    suffix: /;/,
    open: '(',
    close: ')',
    exclude: [/@include Sugar\.setup\(.*\);/]
};
