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
export = {
  type: 'mediaQuery',
  prefix: /@media\s?\([^{]*\)\s?/,
  open: '{',
  close: '}'
};
