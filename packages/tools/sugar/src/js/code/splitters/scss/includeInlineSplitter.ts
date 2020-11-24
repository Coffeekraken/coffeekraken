// @ts-nocheck

/**
 * @name                includeInlineSplitter
 * @namespace           sugar.js.code.splitters.scss
 * @type                Object
 * @wip
 *
 * This represent the SCSS "@include..." splitter.
 * It will match all the inline includes like "@include something('hello');", etc...
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
  type: 'include.inline',
  prefix: /@include\s[a-zA-Z0-9-_\.]+/,
  suffix: /;/,
  open: '(',
  close: ')',
  exclude: [/@include Sugar\.setup\(.*\);/]
};
