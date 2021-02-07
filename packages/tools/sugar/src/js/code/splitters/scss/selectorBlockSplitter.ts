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
export = {
  type: 'selector.block',
  prefix: /(^(?!.*@media)[\t ]*([a-zA-Z#.:*[][^{\/]*\s*)\s?){/m,
  prefixMatchIdx: 1,
  open: '{',
  close: '}'
};
