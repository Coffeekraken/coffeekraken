/**
 * @name                selectorBlockSplitter
 * @namespace           sugar.js.code.splitters.scss
 * @type                Object
 *
 * This represent the SCSS selectors splitter.
 * It will match all the selectors blocks like ".hello #world, p:before { ... }", etc...
 * and split the code accordingly
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
  type: 'selector.block',
  prefix: /(^(?!.*@media)[\t ]*([a-zA-Z#.:*[][^{\/]*\s*)\s?){/m,
  prefixMatchIdx: 1,
  open: '{',
  close: '}'
};
