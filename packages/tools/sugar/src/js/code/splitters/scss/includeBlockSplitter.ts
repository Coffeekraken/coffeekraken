// @ts-nocheck
// @shared

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
export = {
  type: 'include.block',
  prefix: /@include\s[a-zA-Z0-9-_\.]+\([^{]*\)/,
  open: '{',
  close: '}'
};
